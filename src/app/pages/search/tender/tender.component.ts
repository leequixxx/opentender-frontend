import {Component, OnInit, OnDestroy} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {Search} from '../../../model/search';
import {TenderFilterDefs} from '../../../model/filters';
import {ISearchResultTender, ISearchFilterDef, ISearchFilterDefType, ISearchCommand} from '../../../app.interfaces';
import {I18NService} from '../../../modules/i18n/services/i18n.service';

@Component({
	moduleId: __filename,
	selector: 'search_tender',
	templateUrl: 'tender.component.html'
})
export class SearchTenderPage implements OnInit, OnDestroy {
	search = new Search('tender');
	search_cmd: ISearchCommand;
	quick_search_filters: Array<ISearchFilterDef> = [];
	search_filters = TenderFilterDefs.filter(f => f.type === ISearchFilterDefType.text || f.type === ISearchFilterDefType.value || f.type === ISearchFilterDefType.term);
	check_filters = TenderFilterDefs.filter(f => f.type !== ISearchFilterDefType.value);
	columnIds = ['id', 'title', 'buyers.name', 'lots.bids.bidders.name', 'lots.bids.price'];
	filterIds = ['indicators.score_pi', 'indicators.score_ac', 'indicators.score_ti', 'lots.awardDecisionDate.year'];
	searchIds = ['title', 'buyers.name', 'lots.bids.bidders.name'];
	quicksearchIds = [];

	constructor(private state: StateService, private i18n: I18NService) {
		this.search.build(this.check_filters.filter(def => {
			return this.filterIds.indexOf(def.id) >= 0;
		}));
		this.search_filters.filter(def => {
			if (this.searchIds.indexOf(def.id) >= 0) {
				this.search.addSearch(def);
			}
		});
		this.quick_search_filters = this.search_filters.filter(def => {
			return (this.quicksearchIds.indexOf(def.field) >= 0);
		});
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
	}

	ngOnDestroy() {
		let state = {
			columnIds: this.columnIds,
			search: this.search,
			search_cmd: this.search_cmd
		};
		this.state.put('search.tender', state);
	}

	searchChange(data: ISearchResultTender) {
		this.search.fillAggregationResults(data.aggregations);
	}

	columnsChange(data: { columns: Array<string> }) {
		this.columnIds = data.columns;
	}

	refresh() {
		this.search_cmd = this.search.getCommand();
	}
}
