import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ISearchFilterDef, ISearchFilterDefType, ITableColumn} from '../../../../app.interfaces';
import {I18NService} from '../../../i18n/services/i18n.service';

@Component({
	moduleId: __filename,
	selector: 'select-columns',
	templateUrl: 'select-columns.component.html',
	styleUrls: ['select-columns.component.scss']
})
export class SelectColumnsComponent implements OnChanges {
	@Input() columns_all: Array<ITableColumn>;
	@Input() columns_active: Array<ITableColumn>;
	groups: Array<{ name: string; columns: Array<{ active: boolean; column: ITableColumn; }>; }> = [];
	@Output() selectChange = new EventEmitter();
	@Output() restore = new EventEmitter();
	public allFilters = false;
	public showMoreBtn = false;
	public hiddenGroups: Array<{ name: string; columns: Array<{ active: boolean; column: ITableColumn; }>; }> = [];
	constructor(public i18n: I18NService) {
	}

	update(column, active): void {
		if (active) {
			this.selectChange.emit({value: this.columns_active.concat(column)});
		} else {
			this.selectChange.emit({
				value: this.columns_active.filter(c => {
					return c !== column;
				})
			});
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (!this.columns_all || !this.columns_active) {
			return;
		}
		let groups = {};
		this.columns_all.forEach(column => {
			let groupname = this.i18n.translateVariable(column.group || '_');
			groups[groupname] = groups[groupname] || {name: groupname, columns: []};
			groups[groupname].columns.push({
				active: this.columns_active.indexOf(column) >= 0,
				column: column
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
	private separateGroups() {
		this.hiddenGroups = this.groups.splice(3);
	}
	public isNeedShowMoreBtn(): boolean {
		return this.groups.length > 3;
	}
	public restoreColumns() {
		this.restore.emit();
	}
}
