import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, NgZone, ChangeDetectorRef} from '@angular/core';
import {IChartBarsSettings, IChartData} from '../chart.interface';
import {BaseXYAxisComponent} from '../common/chart/base-axes-chart.component';
import {PlatformService} from '../common/chart/base-chart.component';
import {ILegendOptions, IDomain} from '../common/common.interface';
import {scaleBand, scaleLinear} from 'd3-scale';

@Component({
	selector: 'ngx-charts-bar-horizontal',
	template: `<ngx-charts-chart
		[dim]="dim" [chart]="chart" [data]="data"
		[legendOptions]="legendOptions"
		[activeEntries]="activeEntries"
		(legendLabelClick)="onClick($event)"
		(legendLabelActivate)="onActivate($event)"
		(legendLabelDeactivate)="onDeactivate($event)">
	<svg:g [attr.transform]="transform" class="bar-chart chart">
		<svg:g ngx-charts-x-axis
			   *ngIf="chart.xAxis.show"
			   [xScale]="xScale"
			   [dims]="viewDim"
			   [showGridLines]="chart.showGridLines"
			   [showLabel]="chart.xAxis.showLabel"
			   [defaultHeight]="chart.xAxis.defaultHeight"
			   [labelText]="chart.xAxis.label"
			   [tickFormatting]="chart.xAxis.tickFormatting"
			   [minInterval]="chart.xAxis.minInterval"
			   (dimensionsChanged)="updateXAxisHeight($event)">
		</svg:g>
		<svg:g ngx-charts-y-axis
			   *ngIf="chart.yAxis.show"
			   [yScale]="yScale"
			   [dims]="viewDim"
			   [defaultWidth]="chart.yAxis.defaultWidth"
			   [autoSize]="chart.yAxis.autoSize"
			   [showLabel]="chart.yAxis.showLabel"
			   [labelText]="chart.yAxis.label"
			   [trimLabelLength]="chart.yAxis.maxLength"
			   [tickFormatting]="chart.yAxis.tickFormatting"
			   [minInterval]="chart.yAxis.minInterval"
			   (dimensionsChanged)="updateYAxisWidth($event)">
		</svg:g>
		<svg:g ngx-charts-series-horizontal
			   [type]="chart.chartType||'standard'"
			   [xScale]="xScale"
			   [yScale]="yScale"
			   [colors]="colors"
			   [series]="data"
			   [dims]="viewDim"
			   [gradient]="chart.gradient"
			   [activeEntries]="activeEntries"
			   [valueFormatting]="chart.valueFormatting"
			   (select)="onClick($event)"
			   (activate)="onActivate($event)"
			   (deactivate)="onDeactivate($event)"
		/>
	</svg:g>
</ngx-charts-chart>
`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarHorizontalComponent extends BaseXYAxisComponent {
	@Input() chart: IChartBarsSettings;
	@Input() data: Array<IChartData>;
	@Input() activeEntries: any[];
	@Output() select: EventEmitter<any>;
	@Output() activate: EventEmitter<any>;
	@Output() deactivate: EventEmitter<any>;

	constructor(protected chartElement: ElementRef, protected zone: NgZone, protected cd: ChangeDetectorRef, protected platform: PlatformService) {
		super(chartElement, zone, cd, platform);
	}

	getXScale() {
		let scale = scaleLinear()
			.range([0, this.viewDim.width])
			.domain(this.xDomain.map(item => {
				return <number>item;
			}));
		return scale;
	}

	getYScale() {
		const spacing = 0.2;
		let scale = scaleBand()
			.rangeRound([this.viewDim.height, 0])
			.paddingInner(spacing)
			.domain(this.yDomain.map(item => {
				return <string>item;
			}));
		return scale;
	}

	getXDomain(): IDomain {
		const values = this.data.map(d => d.value);
		const min = Math.min(0, ...values);
		const max = Math.max(...values);
		return [min, max];
	}

	getYDomain(): IDomain {
		return this.data.map(d => d.name);
	}

	getLegendOptions(): ILegendOptions {
		if (this.chart.schemeType === 'ordinal') {
			return {
				scaleType: this.chart.schemeType,
				colors: this.colors,
				domain: this.yDomain
			};
		} else {
			return {
				scaleType: this.chart.schemeType,
				colors: this.colors.scale,
				domain: this.xDomain
			};
		}
	}

	getColorDomain(): IDomain {
		return (this.chart.schemeType === 'ordinal') ? this.yDomain : this.xDomain;
	}
}
