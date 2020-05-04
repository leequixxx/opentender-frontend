import {Component, OnInit, OnDestroy} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {Search} from '../../../model/search';
import {TenderFilterDefs} from '../../../model/filters';
import {ISearchResultTender, ISearchFilterDefType, ISearchCommand, IStatsProcedureType, IStatsCpvs, IStatsPricesInYears, IStatsIndicators} from '../../../app.interfaces';
import {I18NService} from '../../../modules/i18n/services/i18n.service';

@Component({
	moduleId: __filename,
	selector: 'search_tender',
	templateUrl: 'tender.component.html'
})
export class SearchTenderPage implements OnInit, OnDestroy {
	public search = new Search('tender');
	public search_cmd: ISearchCommand;
	public search_title = 'Search Tender';
	public filters = TenderFilterDefs;
	public columnIds = ['id', 'title', 'buyers.name', 'lots.bids.bidders.name', 'lots.bids.price'];
	public filterIds = ['indicators.score_pi', 'indicators.score_ac', 'indicators.score_ti', 'lots.awardDecisionDate.year'];
	public searchIds = ['title', 'buyers.name', 'lots.bids.bidders.name'];
	public viz: {
		procedure_types: { id: string; data: IStatsProcedureType, title?: string, active: boolean };
		cpvs_codes: { id: string; data: IStatsCpvs, title?: string, active: boolean };
		histogram_finalPriceEUR: { id: string; data: IStatsPricesInYears, title?: string, active: boolean };
		distribution: { id: string; data: IStatsIndicators, title?: string, active: boolean };
	} = {
		distribution: {id: 'histogram_distribution_indicators', data: null, active: false},
		cpvs_codes: {id: 'terms_main_cpv_divisions', data: null, active: false},
		histogram_finalPriceEUR: {id: 'histogram_finalPriceEUR', data: null, active: false},
		procedure_types: {id: 'terms_procedure_type', data: null, active: false}
	};
	private defaultColumns = [];

	constructor(private state: StateService, private i18n: I18NService) {
		this.search.build(
			this.filters.filter(def => {
				return (this.searchIds.indexOf(def.id) >= 0);
			}),
			this.filters.filter(def => {
				return (this.filterIds.indexOf(def.id) >= 0);
			}));
		this.viz.procedure_types.title = this.i18n.get('Procedure Type');
		this.viz.cpvs_codes.title = this.i18n.get('Sectors');
		this.viz.histogram_finalPriceEUR.title = this.i18n.get('Tenders over Time');
		this.viz.distribution.title = this.i18n.get('Indicators');
	}

	ngOnInit(): void {
		let state = this.state.get('search.tender');
		if (state) {
			this.columnIds = state.columnIds;
			this.search = state.search;
			this.search_cmd = state.search_cmd;
		} else {
			this.refresh();
		}
		this.defaultColumns = JSON.parse(JSON.stringify(this.columnIds));
	}

	ngOnDestroy(): void {
		let state = {
			columnIds: this.columnIds,
			search: this.search,
			search_cmd: this.search_cmd
		};
		this.state.put('search.tender', state);
	}

	searchChange(data: ISearchResultTender): void {
		this.search.fillAggregationResults(data.aggregations);
		Object.keys(this.viz).forEach(key => {
			this.viz[key].data = null;
		});
		if (data.stats) {
			Object.keys(this.viz).forEach(key => {
				this.viz[key].data = data.stats[this.viz[key].id];
			});
		}
	}

	onSelectViz(data: Array<string>): void {
		Object.keys(this.viz).forEach(key => {
			this.viz[key].active = data.indexOf(key) >= 0;
		});
		this.refresh();
	}

	columnsChange(data: { columns: Array<string> }): void {
		this.columnIds = data.columns;
	}
	setDefaultStats() {
		this.search = new Search('tender');
		this.search.build(
			this.filters.filter(def => {
				return (this.searchIds.indexOf(def.id) >= 0);
			}),
			this.filters.filter(def => {
				return (this.filterIds.indexOf(def.id) >= 0);
			}));
	}
	public setDefaultColumns() {
		this.columnIds = this.defaultColumns;
	}

	refresh(): void {
		let cmd = this.search.getCommand();
		cmd.stats = Object.keys(this.viz).filter(key => this.viz[key].active).map(key => this.viz[key].id);
		this.search_cmd = cmd;
	}
}
