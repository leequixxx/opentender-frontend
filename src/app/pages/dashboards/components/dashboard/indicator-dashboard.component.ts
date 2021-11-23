import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {I18NService} from '../../../../modules/i18n/services/i18n.service';
import {Utils} from '../../../../model/utils';
import {NotifyService} from '../../../../services/notify.service';
import {
	ISearchCommandFilter, IStats,
	IIndicatorInfo, ISubIndicatorInfo, ISearchCommand, ISearchCommandWeights, ISearchResultTender, IStatsNuts
} from '../../../../app.interfaces';
import {PlatformService} from '../../../../services/platform.service';
import * as Config from '../../../../../../config.dist';
import {DASHBOARD_CHART_TITLES, DASHBOARD_TOOLTIPS, VIZ_DEFAULT_DATA, VizType} from '../../../../model/dashboard';
import {Search} from '../../../../model/search';
import {DashboardFilterDefs, isSearchDef} from '../../../../model/filters';
import {StateService} from '../../../../services/state.service';

@Component({
	moduleId: __filename,
	selector: 'indicator-dashboard',
	templateUrl: 'indicator-dashboard.component.html',
	styleUrls: ['indicator-dashboard.component.scss']
})
export class DashboardsIndicatorComponent implements OnChanges {
	@Input() indicator: IIndicatorInfo;
	@Input() columnIds;
	@Input() pageDescription = [''];
	@Input() pageID = '';
	public currencySymbol = Config.currencySymbol;
	// private icon: string = '';
	@Input() searchPrefix: string = '';
	private searchScore: [number, number] = [0, 100];
	public filterWeights: ISearchCommandWeights = null;
	public showDialog = false;
	public title: string = '';
	public subindicators: ISubIndicatorInfo[] = [];
	public weights: Array<{ value: number; indicator: ISubIndicatorInfo; }> = [];
	public selected: ISubIndicatorInfo = null;
	public indicatorTitle: string;
	public loading: number = 0;
	public viz: VizType = VIZ_DEFAULT_DATA;
	public filter: {
		years?: { startValue: number, endValue: number };
	} = {};
	public storageId = '_tender-table';
	public titles = DASHBOARD_CHART_TITLES;
	public tooltips = DASHBOARD_TOOLTIPS;
	public search = new Search('dashboard');
	public search_cmd: ISearchCommand;
	public filterIds = []
	public filters = DashboardFilterDefs;
	public filtersStorageTag = '_' + this.pageID || 'dashboard' + '-filters';
	private firstInit = true;
	public map_data: IStatsNuts = {};

	public search_title = ''

	constructor(private api: ApiService,
							private i18n: I18NService,
							private notify: NotifyService,
							private platform: PlatformService,
							private state: StateService) {
		this.viz.ranges.top_authorities.title = i18n.get('Main Buyers in Score Range');
		this.viz.ranges.top_companies.title = i18n.get('Main Suppliers in Score Range');
		this.search.build(this.filters.filter(isSearchDef), this.filters.filter(def => {
			return this.filterIds.indexOf(def.id) >= 0;
		}));
		// this.setTitle();
	}

	public filtersChange() {
		let filtersTag = JSON.stringify(location.pathname) + this.filtersStorageTag;
		if (!this.firstInit) {
			let state = {
				search: this.search,
				search_cmd: this.search_cmd
			};
			localStorage.setItem(filtersTag, JSON.stringify(state));
		}
		if (this.firstInit) {
			this.firstInit = false;
		}
		this.refresh();
	}

	public setDefaultStats() {
		this.search = new Search('dashboard');
		this.search.build(this.filters.filter(isSearchDef), this.filters.filter(def => {
			return this.filterIds.indexOf(def.id) >= 0;
		}));
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.title = this.indicator.plural;

		let state = this.state.get('search.dashboard' + this.pageID);
		if (state) {
			this.columnIds = state.columnIds;
			this.search = state.search;
			this.search_cmd = state.search_cmd;
		} else if (localStorage.getItem(JSON.stringify(location.pathname) + this.filtersStorageTag)) {
			let storageState = JSON.parse(localStorage.getItem(JSON.stringify(location.pathname) + this.filtersStorageTag));
			storageState.search.filters = storageState.search.filters.map(filter => ({...filter, def: {...filter.def, valueFormatter: this.filters.filter(f => f.id === filter.def.id)[0].valueFormatter || null}}))
			this.search.setBuildedFilters(storageState.search.filters);
			this.search.setBuildedSearches(storageState.search.searches);
			this.search_cmd = storageState.search_cmd;
		} else {
			this.refresh();
		}
		// this.icon = this.indicator.icon;
		this.subindicators = this.indicator.subindicators;
		this.displayIndicatorTitles();
	}

	ngOnInit(): void {
		this.refresh();
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
		this.viz.scores.score_in_years.title = this.i18n.get('Average Score of') + ' ' + this.indicatorTitle + ' ' + this.i18n.get('over Time');
		this.viz.scores.score_in_sectors.title = this.i18n.get('Average Score of') + ' ' + this.indicatorTitle + ' ' + this.i18n.get('per Sector');
		this.viz.ranges.lots_in_years.title = this.indicatorTitle + ' ' + this.i18n.get('in Score Range');
		this.viz.ranges.cpvs_codes.title = this.indicatorTitle + ' ' + this.i18n.get('in Score Range');
	}

	displayIndicator() {
		this.displayIndicatorTitles();
		this.refresh();
	}

	private displayScoreStats(stats: IStats): void {
		let viz = this.viz;
		Object.keys(viz.scores).forEach(key => {
			viz.scores[key].data = null;
		});
		if (!stats) {
			return;
		}
		viz.scores.score_in_sectors.data = stats.terms_main_cpv_divisions_score;
		viz.scores.score_in_years.data = (stats.histogram_indicators ? stats.histogram_indicators[this.searchPrefix] : {}) || {};
		viz.scores.years.data = Object.keys(viz.scores.score_in_years.data || {}).map(key => parseInt(key, 10));
		viz.scores.terms_indicators_score.data = stats.terms_indicators_score;
		if (stats.terms_score && stats.terms_score.hasOwnProperty(this.searchPrefix)) {
			viz.scores.score.data = [{
				id: this.searchPrefix,
				name: this.indicatorTitle,
				value: stats.terms_score[this.searchPrefix]
			}];
		} else if (stats.terms_indicators_score && stats.terms_indicators_score.hasOwnProperty(this.searchPrefix)) {
			viz.scores.score.data = [{
				id: this.searchPrefix,
				name: this.indicatorTitle,
				value: stats.terms_indicators_score[this.searchPrefix]
			}];
		} else {
			viz.scores.score.data = [];
		}
	}

	private displayRangeStats(stats: IStats): void {
		let viz = this.viz;
		Object.keys(viz.ranges).forEach(key => {
			viz.ranges[key].data = null;
		});
		if (!stats) {
			return;
		}
		viz.ranges.top_companies.data = {absolute: stats.top_terms_companies, volume: stats.top_sum_finalPrice_companies};
		viz.ranges.top_authorities.data = {absolute: stats.top_terms_authorities, volume: stats.top_sum_finalPrice_authorities};
		viz.ranges.lots_in_years.data = stats.histogram_count_finalPrices;
		viz.ranges.cpvs_codes.data = stats.terms_pc_main_cpv_divisions;
	}

	refresh() {
		this.search_cmd = this.getCommand(this.search.getCommand());
		this.visualizeScores();
		this.visualizeRanges();
		// this.search();
	}

	public getCommand(cmd) {
		cmd.filters = [...cmd.filters, ...this.buildFilters(true)]
		return cmd
	}

	onScoreSliderChange(event) {
		this.searchScore = [event.startValue, event.endValue];
		this.refresh();
		// this.search();
	}

	onYearRangeSliderChange(event) {
		if (!this.viz.scores.years.data) {
			return;
		}
		this.filter.years = event.data;
		this.refresh();
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
			}, 1);
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
		this.showDialog = false;
		this.refresh();
	}

	resetWeights() {
		this.weights.forEach(weight => {
			weight.value = 10;
		});
		this.applyWeights();
	}

	visualizeScores() {
		let filters = this.search_cmd.filters;
		// let filters = [...this.search_cmd.filters, ...this.buildFilters(false)];
		this.loading++;
		// @ts-ignore
		let cmd: ISearchCommand = {filters: filters};
		let sub = this.api.getIndicatorScoreStats(cmd).subscribe(
			(result) => {
				this.displayScoreStats(result.data);
			},
			(error) => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
				sub.unsubscribe();
			});
	}

	visualizeRanges() {
		let filters = this.search_cmd.filters;
		// let filters = [...this.search_cmd.filters, ...this.buildFilters(true)];
		this.loading++;
		let cmd: ISearchCommand = {filters: filters};
		let sub = this.api.getIndicatorRangeStats(cmd).subscribe(
			(result) => {
				this.displayRangeStats(result.data);
				this.map_data = result.data.terms_authority_nuts
			},
			(error) => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
				sub.unsubscribe();
			});
	}

	buildFilters(inRange: boolean) {
		let filter: ISearchCommandFilter;
		if (inRange) {
			if (!this.selected) {
				if (!this.filterWeights) {
					filter = {
						field: 'ot.scores.type',
						type: 'term',
						value: [this.searchPrefix],
						and: [{
							field: 'ot.scores.value',
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
		} else {
			if (!this.selected) {
				filter = {
					field: 'ot.scores.type',
					type: 'term',
					value: [this.searchPrefix],
					weights: this.filterWeights ? this.filterWeights : undefined
				};
			} else {
				filter = {
					field: 'indicators.type',
					type: 'term',
					value: [this.searchPrefix]
				};
			}
		}
		let filters = [filter];

		if (this.filter.years) {
			let yearFilter: ISearchCommandFilter = {
				field: 'ot.date',
				type: 'years',
				value: [this.filter.years.startValue, this.filter.years.endValue],
			};
			filters.push(yearFilter);
		}
		return filters;
	}

	// search() {
	// 	this.search_cmd = {
	// 		filters: this.buildFilters(true)
	// 	};
	// }

	searchChange(data: ISearchResultTender) {
		this.search.fillAggregationResults(data.aggregations);

	}
	public serDefaultColumns() {
		let defaultData = ['title', 'buyers.name', 'lots.bids.bidders.name', 'indicators.ti'];
		this.columnIds = defaultData;
		this.saveDataToStorage(defaultData);
	}
	private saveDataToStorage(data) {
		localStorage.setItem(JSON.stringify(location.pathname) + this.storageId, JSON.stringify(data));
	}
}
