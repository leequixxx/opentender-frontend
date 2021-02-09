import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IChartRadar} from '../../../thirdparty/ngx-charts-universal/chart.interface';
import {ISeriesProvider, IStatsIndicators} from '../../../app.interfaces';
import {Utils} from '../../../model/utils';
import {IndicatorService} from '../../../services/indicator.service';
import {Colors} from '../../../model/colors';
import {I18NService} from '../../i18n/services/i18n.service';

@Component({
	selector: 'graph[indicator-structure]',
	template: `
		<div class="graph-title">
			{{title}}
		</div>
		<ngx-charts-radar-pie-chart
				class="chart-container"
				[chart]="graph.chart"
				[data]="graph.data"
				[weights_data]="graph.weights_data"
				(select)="graph.select($event)">
		</ngx-charts-radar-pie-chart>
		<graph-footer [sender]="this" ></graph-footer>`
})
export class GraphIndicatorStructureComponent implements OnChanges, ISeriesProvider {
	@Input()
	data: IStatsIndicators;
	@Input()
	weights: { [name: string]: number };
	@Input()
	title: string = '';
	@Input()
	glossary: string;
	@Output()
	onSelect = new EventEmitter();

	indicators_pie: IChartRadar = {
		chart: {
			view: {
				def: {width: 762, height: 360},
				min: {height: 360},
				max: {height: 360}
			},
			labels: true,
			maxValue: 100,
			valueFormatting: (value: number) => {
				return this.i18n.formatValue(value);
			},
			colorScheme: Colors.colorSchemes.linear_red_green
		},
		select: (event) => {
			this.onSelect.emit(event);
		},
		data: null,
		weights_data: null
	};
	graph: IChartRadar = this.indicators_pie;

	constructor(private indicators: IndicatorService, private i18n: I18NService) {
		this.indicators_pie.chart.i18n = this.i18n.ChartsTranslations;
	}

	getSeriesInfo() {
		return {data: this.graph.data, header: {value: 'Score', name: 'Name'}, filename: this.title + '-scores'};
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.indicators_pie.data = null;
		this.indicators_pie.weights_data = null;
		if (this.data) {
			this.indicators_pie.data = Object.keys(this.data).map(key => {
				return {info: this.indicators.getIndicatorInfo(key), value: this.data[key], id: key};
			}).filter((item) => {
				return item.info.id;
			}).sort((a, b) => {
				return (a.info ? a.info.order : -1) - (a.info ? b.info.order : -1);
			}).map(indicator => {
				return {name: indicator.info ? indicator.info.name : indicator.id, value: indicator.value, id: indicator.id};
			});
		}
		if (this.weights) {
			let list = Object.keys(this.weights).map(key => {
				return {
					id: key,
					name: key,
					value: this.weights[key]
				};
			});
			if (list.length > 0) {
				this.indicators_pie.weights_data = list;
			}
		}
	}

}
