import {Component, OnDestroy, OnInit} from '@angular/core';
import {Search} from '../../../model/search';
import {StateService} from '../../../services/state.service';
import {CompanyFilterDefs, isSearchDef} from '../../../model/filters';
import {ISearchResultCompany, ISearchFilterDefType, ISearchCommand} from '../../../app.interfaces';
import {I18NService} from '../../../modules/i18n/services/i18n.service';

@Component({
	moduleId: __filename,
	selector: 'search_company',
	templateUrl: 'company.component.html'
})
export class SearchCompanyPage implements OnInit, OnDestroy {
	title = '';
	search = new Search('company', CompanyFilterDefs);
	search_cmd: ISearchCommand;
	columnIds = ['id', 'body.name', 'body.address.city', 'body.address.country'];
	filterIds = ['body.name', 'body.address.city'];
	filters = CompanyFilterDefs;
	public search_title = 'Search Company';

	constructor(private state: StateService, private i18n: I18NService) {
		this.search.build(this.filters.filter(isSearchDef), this.filters.filter(def => {
			return this.filterIds.indexOf(def.id) >= 0;
		}));
		this.setTitle();
	}

	ngOnInit(): void {
		let state = this.state.get('search.company');
		if (state) {
			this.columnIds = state.columns;
			this.search = state.search;
			this.search_cmd = state.search_cmd;
		} else {
			this.refresh();
		}
	}

	ngOnDestroy() {
		this.state.put('search.company', {
			columns: this.columnIds,
			search: this.search,
			search_cmd: this.search_cmd
		});
	}

	setTitle(total?) {
		this.title = this.i18n.get('Companies') + (total !== null ? ': ' + this.i18n.formatValue(total) : '');
	}

	searchChange(data: ISearchResultCompany) {
		this.setTitle(data.hits && data.hits.total ? data.hits.total : 0);
		this.search.fillAggregationResults(data.aggregations);
	}

	columnsChange(data: { columns: Array<string> }) {
		this.columnIds = data.columns;
	}

	refresh() {
		this.search_cmd = this.search.getCommand();
	}
}
