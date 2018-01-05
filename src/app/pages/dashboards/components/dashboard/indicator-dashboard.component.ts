import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {I18NService} from '../../../../modules/i18n/services/i18n.service';
import {Utils} from '../../../../model/utils';
import {NotifyService} from '../../../../services/notify.service';
import {
	ISearchCommandFilter, IStats, IStatsPcCpvs, IStatsIndicators, IStatsCompanies, IStatsAuthorities, IStatsPcPricesLotsInYears,
	IIndicatorInfo, ISubIndicatorInfo, ISearchCommand, IStatsInYears, IStatsCpvs, ISearchCommandWeights, ISearchResultTender
} from '../../../../app.interfaces';
import {IChartData} from '../../../../thirdparty/ngx-charts-universal/chart.interface';
import {PlatformService} from '../../../../services/platform.service';

@Component({
	moduleId: __filename,
	selector: 'indicator-dashboard',
	templateUrl: 'indicator-dashboard.component.html',
	styleUrls: ['indicator-dashboard.component.scss']
})
export class DashboardsIndicatorComponent implements OnChanges {
	@Input()
	indicator: IIndicatorInfo;
	@Input()
	columnIds = ['id', 'title', 'buyers.name', 'lots.bids.bidders.name'];

	private icon: string = '';
	private searchPrefix: string = '';
	private searchScore: [number, number] = [0, 50];
	public filterWeights: ISearchCommandWeights = null;
	public showDialog = false;
	public title: string = '';
	public subindicators: ISubIndicatorInfo[] = [];
	public weights: Array<{ value: number; indicator: ISubIndicatorInfo; }> = [];
	public selected: ISubIndicatorInfo = null;
	public search_cmd: ISearchCommand;
	public indicatorTitle: string;
	public loading: number = 0;
	public viz: {
		top_companies: { data: { absolute: IStatsCompanies, volume: IStatsCompanies }, title?: string };
		top_authorities: { data: { absolute: IStatsAuthorities, volume: IStatsAuthorities }, title?: string };
		score_in_years: { data: IStatsInYears, title?: string };
		score_in_sectors: { data: IStatsCpvs, title?: string };
		lots_in_years: { data: IStatsPcPricesLotsInYears, title?: string };
		cpvs_codes: { data: IStatsPcCpvs, title?: string };
		terms_indicators_score: { data: IStatsIndicators, title?: string };
		score: { data: Array<IChartData>, title?: string };
		years: { data: Array<number>, title?: string };
	} = {
		top_companies: {data: null},
		top_authorities: {data: null},
		score_in_years: {data: null},
		score_in_sectors: {data: null},
		lots_in_years: {data: null},
		cpvs_codes: {data: null},
		score: {data: null},
		terms_indicators_score: {data: null},
		years: {data: null}
	};
	public filter: {
		years?: { startValue: number, endValue: number };
	} = {};

	constructor(private api: ApiService, private i18n: I18NService, private notify: NotifyService, private platform: PlatformService) {
		this.viz.top_authorities.title = i18n.get('Main Buyers in Score Range');
		this.viz.top_companies.title = i18n.get('Main Suppliers in Score Range');
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.title = this.indicator.plural;
		this.icon = this.indicator.icon;
		this.subindicators = this.indicator.subindicators;
		this.displayIndicatorTitles();
	}

	ngOnInit(): void {
		this.visualize();
		this.search();
	}

	ngOnDestroy() {
	}

	selectChange(event) {
		this.displayIndicator();
	}

	selectIndicatorChange(event) {
		this.selected = this.subindicators.find(sub => sub.id === event.id);
		this.displayIndicator();
	}

	displayIndicatorTitles(): void {
		if (!this.selected) {
			this.indicatorTitle = this.indicator.plural;
			this.searchPrefix = this.indicator.id;
		} else {
			this.searchPrefix = this.selected.id;
			this.indicatorTitle = this.selected.name + ' ' + this.i18n.get('Indicator');
		}
		this.viz.score_in_years.title = this.i18n.get('Average Score of') + ' ' + this.indicatorTitle + ' ' + this.i18n.get('over Time');
		this.viz.score_in_sectors.title = this.i18n.get('Average Score of') + ' ' + this.indicatorTitle + ' ' + this.i18n.get('per Sector');
		this.viz.lots_in_years.title = this.indicatorTitle + ' ' + this.i18n.get('in Score Range');
		this.viz.cpvs_codes.title = this.indicatorTitle + ' ' + this.i18n.get('in Score Range');
	}

	displayIndicator() {
		this.displayIndicatorTitles();
		this.visualize();
		this.search();
	}

	private displayStats(stats: IStats): void {
		let viz = this.viz;
		Object.keys(viz).forEach(key => {
			viz[key].data = null;
		});
		if (!stats) {
			return;
		}
		viz.score_in_sectors.data = stats.terms_main_cpv_divisions_score;
		viz.score_in_years.data = (stats.histogram_indicators ? stats.histogram_indicators[this.searchPrefix] : {}) || {};
		viz.top_companies.data = {absolute: stats.top_terms_companies, volume: stats.top_sum_finalPrice_companies};
		viz.top_authorities.data = {absolute: stats.top_terms_authorities, volume: stats.top_sum_finalPrice_authorities};
		viz.lots_in_years.data = stats.histogram_count_finalPrices;
		viz.cpvs_codes.data = stats.terms_pc_main_cpv_divisions;
		viz.terms_indicators_score.data = stats.terms_indicators_score;
		viz.years.data = Object.keys(stats.histogram_count_finalPrices || {}).map(key => parseInt(key, 10));
		if (stats.terms_score && stats.terms_score.hasOwnProperty(this.searchPrefix)) {
			viz.score.data = [{
				id: this.searchPrefix,
				name: this.indicatorTitle,
				value: stats.terms_score[this.searchPrefix]
			}];
		} else if (stats.terms_indicators_score && stats.terms_indicators_score.hasOwnProperty(this.searchPrefix)) {
			viz.score.data = [{
				id: this.searchPrefix,
				name: this.indicatorTitle,
				value: stats.terms_indicators_score[this.searchPrefix]
			}];
		} else {
			viz.score.data = [];
		}
	}

	onScoreSliderChange(event) {
		this.searchScore = [event.startValue, event.endValue];
		this.visualize();
		this.search();
	}

	onYearRangeSliderChange(event) {
		if (!this.viz.years.data) {
			return;
		}
		this.filter.years = event.data;
		this.visualize();
		this.search();
	}

	toggleDialog() {
		this.showDialog = !this.showDialog;
		if (this.weights.length === 0) {
			this.weights = this.subindicators.map(subindicator => {
				return {
					indicator: subindicator,
					value: 10
				};
			});
		}
		if (this.showDialog && this.platform.isBrowser) {
			setTimeout(() => {
				Utils.triggerResize();
			}, 10);
		}
	}

	onWeightSliderChange(event, weight) {
		weight.value = event.endValue;
	}

	applyWeights() {
		let weights = {};
		let validWeights = false;
		this.weights.forEach(w => {
			if (w.value > 0) {
				weights[w.indicator.id] = w.value / 10;
				if (w.value !== 10) {
					validWeights = true;
				}
			} else {
				validWeights = true;
			}
		});
		if (validWeights && Object.keys(weights).length > 0) {
			this.filterWeights = weights;
		} else {
			this.filterWeights = null;
		}
		this.visualize();
		this.search();
	}

	resetWeights() {
		this.weights.forEach(weight => {
			weight.value = 10;
		});
		this.applyWeights();
	}

	visualize() {
		let filters = this.buildFilters();
		this.loading++;
		let cmd: ISearchCommand = {filters: filters};
		let sub = this.api.getIndicatorStats(cmd).subscribe(
			(result) => {
				this.displayStats(result.data);
			},
			(error) => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
				sub.unsubscribe();
			});
	}

	buildFilters() {
		let filter: ISearchCommandFilter;
		if (!this.selected) {
			if (!this.filterWeights) {
				filter = {
					field: 'scores.type',
					type: 'term',
					value: [this.searchPrefix],
					and: [{
						field: 'scores.value',
						type: 'range',
						value: this.searchScore
					}]
				};
			} else {
				filter = {
					field: this.searchPrefix,
					type: 'weighted',
					value: this.searchScore,
					weights: this.filterWeights
				};
			}
		} else {
			filter = {
				field: 'indicators.type',
				type: 'term',
				value: [this.searchPrefix],
				and: [{
					field: 'indicators.value',
					type: 'range',
					value: this.searchScore
				}]
			};
		}
		let filters = [filter];
		if (this.filter.years) {
			let yearFilter: ISearchCommandFilter = {
				field: 'date',
				type: 'years',
				value: [this.filter.years.startValue, this.filter.years.endValue + 1],
			};
			filters.push(yearFilter);
		}
		return filters;
	}

	search() {
		this.search_cmd = {
			filters: this.buildFilters()
		};
	}

	searchChange(data: ISearchResultTender) {

	}
}
