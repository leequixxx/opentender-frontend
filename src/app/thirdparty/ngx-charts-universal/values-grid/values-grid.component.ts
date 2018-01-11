import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {calculateViewDimensions, ViewDimensions} from '../utils/view-dimensions.helper';
import {gridLayout} from '../utils/grid.helper';
import {formatLabel, splitLabel} from '../utils/label.helper';
import {IChartData, IChartPieSeriesSettings} from '../chart.interface';
import {getTooltipLabeledText} from '../common/tooltip/tooltip.helper';
import {min} from 'd3-array';
import {BaseChartComponent} from '../common/chart/base-chart.component';
import {ColorHelper} from '../utils/color.helper';
import {IDomain} from '../common/common.interface';

@Component({
	selector: 'ngx-charts-values-grid',
	template: `
		<ngx-charts-chart [dim]="dim" [chart]="chart" [data]="data">
			<svg:g [attr.transform]="transform" class="values-grid chart">
				<svg:g *ngFor="let series of series"
					   class="pie-grid-item"
					   [attr.transform]="series.transform"
					   ngx-tooltip
					   [tooltipPlacement]="'top'"
					   [tooltipType]="'tooltip'"
					   [tooltipTitle]="getTooltipText(series.label, formatLabelNumber(series.value))">
					<svg:rect style="stroke: none; fill: #fff; opacity:0" [attr.x]="-series.outerRadius" [attr.y]="-series.outerRadius" [attr.height]="series.outerRadius*2" [attr.width]="series.outerRadius*2"/>
					<svg:g ngx-charts-pie-grid-series
						   [data]="series.data"
						   [innerRadius]="series.innerRadius"
						   [outerRadius]="series.outerRadius"
						   (select)="onClick($event)"
					/>
					<svg:text
							class="label value-label"
							dy="-0.5em"
							[attr.x]="series.labelLeft"
							[attr.y]="series.labelTop"
							[style.font-size.pt]="series.fontSize"
							text-anchor="middle">{{formatLabelNumber(series.value)}}
					</svg:text>
					<svg:text *ngIf="chart.labels"
							  class="label"
							  dy="1.23em"
							  x="0"
							  [attr.y]="series.outerRadius"
							  text-anchor="middle">
						<svg:tspan *ngFor="let text of series.labels; let i = index" x="0" [attr.y]="(i*textHeight)+series.outerRadius">{{text}}</svg:tspan>
					</svg:text>
				</svg:g>
			</svg:g>
		</ngx-charts-chart>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['values-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ValuesGridComponent extends BaseChartComponent {
	@Input() data: Array<IChartData>;
	@Input() chart: IChartPieSeriesSettings;
	@Input() activeEntries: any[];
	@Output() select: EventEmitter<any>;
	@Output() activate: EventEmitter<any>;
	@Output() deactivate: EventEmitter<any>;

	colors: ColorHelper;
	domain: IDomain;
	viewDim: ViewDimensions;
	transform: string;
	margin = [10, 10, 10, 10];
	layout_data: any[] = [];
	series: any[] = [];
	getTooltipText = getTooltipLabeledText;
	textHeight = 26;

	onClick(data): void {
		this.select.emit(data);
	}

	setColors(): void {
		this.colors = ColorHelper.fromColorSet(this.chart.colorScheme, this.getColorDomain());
	}

	getDomain(): IDomain {
		return this.data.map(d => d.name);
	}

	getColorDomain(): IDomain {
		return this.getDomain();
	}

	update(): void {
		super.update();

		this.zone.run(() => {
			this.viewDim = calculateViewDimensions({
				width: this.dim.width,
				height: this.dim.height,
				margins: this.margin
			});

			this.layout_data = [];
			this.series = [];

			if (this.data) {
				this.domain = this.getDomain();

				this.layout_data = gridLayout(this.viewDim, this.data, 150);
				this.transform = `translate(${this.margin[3]} , ${this.margin[0]})`;

				this.setColors();
				this.series = this.getSeries();
			}
		});
	}

	formatLabelNumber(value: number): string {
		return this.chart && this.chart.valueFormatting ? this.chart.valueFormatting(value) : value.toLocaleString();
	}

	getSeries(): any[] {
		console.log(this.layout_data);
		return this.layout_data.map((d) => {
			const baselineLabelHeight = this.chart.labels ? 20 : 0;
			const padding = 10;
			const label = formatLabel(d.data.name);
			const value = d.data.value;
			let radius = (min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
			if (this.chart.maxRadius > 0) {
				radius = Math.min(radius, this.chart.maxRadius);
			}
			const innerRadius = radius * 0.9;
			const xPos = d.x + (d.width - padding) / 2;
			const yPos = d.y + (d.height - baselineLabelHeight) / 2;
			const fontSize = Math.max(Math.min(24, radius / 2), 8);
			const labelTop = (fontSize * 1.1);
			const labelLeft = innerRadius < 10 ? (radius * 3) : 0;
			d.data.color = d.data.color || this.colors.getColor(d.data.value);
			return {
				transform: `translate(${xPos}, ${yPos})`,
				innerRadius,
				outerRadius: radius,
				label,
				labels: labelLeft ? [label] : splitLabel(label),
				total: this.chart.maxValue,
				value,
				fontSize,
				labelTop,
				labelLeft,
				data: [d, {
					data: {
						other: true,
						value: this.chart.maxValue - value,
						color: 'rgba(100,100,100,0.2)',
						name: d.data.name
					}
				}]
			};
		});
	}

}
