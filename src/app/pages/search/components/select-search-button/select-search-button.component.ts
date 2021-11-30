import {Component, Input, EventEmitter, Output, SimpleChanges, OnChanges} from '@angular/core';
import {ISearchFilterDef, ISearchFilterDefType} from '../../../../app.interfaces';
import {I18NService} from '../../../../modules/i18n/services/i18n.service';
import {isFilterDef, isSearchDef} from '../../../../model/filters';

@Component({
	moduleId: __filename,
	selector: 'select-search-button',
	templateUrl: 'select-search-button.component.html',
	styleUrls: ['select-search-button.component.scss']
})
export class SelectSearchButtonComponent implements OnChanges {
	@Input() filters_all: Array<ISearchFilterDef>;
	@Input() filters_active: Array<ISearchFilterDef>;
	@Input() public search_title;
	@Output() selectChange = new EventEmitter();
	@Output() reset = new EventEmitter();
	showDialog = false;
	title: string;
	groups: Array<{
		name: string;
		filters: Array<{ active: boolean; isSearch: boolean; isFilter: boolean, filter: ISearchFilterDef, type: ISearchFilterDefType }>;
	}> = [];
	public allFilters = false;
	public showMoreBtn = false;
	public hiddenGroups: Array<{
		name: string;
		filters: Array<{ active: boolean; isSearch: boolean; isFilter: boolean, filter: ISearchFilterDef, type: ISearchFilterDefType }>;
	}> = [];

	constructor(public i18n: I18NService) {
		this.title = i18n.get('Add Search Fields');
	}

	update(filter, isSearch): void {
		this.selectChange.emit({value: {isSearch: isSearch, filter: filter}});
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (!this.filters_all || !this.filters_active) {
			return;
		}
		let groups = {};
		this.filters_all.forEach(f => {
			let groupname = this.i18n.translateVariable(f.group || '_');
			groups[groupname] = groups[groupname] || {name: groupname, filters: []};
			groups[groupname].filters.push({
				active: this.filters_active.some(filter => filter.id === f.id),
				isSearch: isSearchDef(f),
				isFilter: isFilterDef(f),
				filter: f,
				type: ISearchFilterDefType[f.type]
			});
		});
		this.groups = Object.keys(groups).sort().map(key => groups[key]);
		if (this.isNeedShowMoreBtn()) {
			this.showMoreBtn = true;
			this.separateGroups();
		}
	}
	public showAllFilter() {
		this.allFilters = true;
	}
	public hideAllFilter() {
		this.allFilters = false;
	}
	public resetFilters() {
		this.reset.emit();
	}
	private separateGroups() {
		this.hiddenGroups = this.groups.splice(4);
	}
	public isNeedShowMoreBtn(): boolean {
		return this.groups.length > 4;
	}
}
