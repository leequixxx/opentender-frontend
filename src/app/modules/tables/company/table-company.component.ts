import {Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {CompanyColumns} from '../../../model/columns';
import {ICompany, ISearchResultCompany, ISearchCommand, ITableColumnCompany, ITable, ITableColumnSort, ITableLibrary} from '../../../app.interfaces';
import {NotifyService} from '../../../services/notify.service';
import {Utils} from '../../../model/utils';
import {PlatformService} from '../../../services/platform.service';
import {I18NService} from '../../i18n/services/i18n.service';
import {IndicatorService} from '../../../services/indicator.service';

@Component({
	selector: 'company-table',
	templateUrl: 'table-company.component.html'
})
export class CompanyTableComponent implements OnChanges, OnInit {
	@Input()
	search_cmd: ISearchCommand;
	@Input()
	columnIds: Array<string>;
	@Input()
	title: string;
	@Output()
	searchChange = new EventEmitter();

	columns: Array<ITableColumnCompany> = [];
	all_columns = CompanyColumns;

	table: ITable;
	sortBy: ITableColumnSort;
	companies: Array<ICompany> = [];

	loading: number = 0;
	total: number = 0;
	defaultPageSize: number = 10;
	defaultPage: number = 0;

	constructor(private api: ApiService, private notify: NotifyService, private platform: PlatformService, private i18n: I18NService, private indicators: IndicatorService) {
	}

	ngOnInit(): void {
		if (this.columnIds) {
			this.setColumns();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['search_cmd'] && changes['search_cmd'].currentValue) {
			this.defaultPageSize = this.search_cmd.size || 10;
			this.defaultPage = Math.round((this.search_cmd.from || 0) / this.defaultPageSize);
			this.refresh();
		} else if (changes['columnIds'] && changes['columnIds'].currentValue) {
			this.setColumns();
		}
	}

	setColumns(): void {
		this.columns = [];
		this.columnIds.forEach(c => {
			this.all_columns.forEach(col => {
				if (c == col.id) {
					this.columns.push(col);
				}
			});
		});
		this.buildTable();
	}

	onSelectColumns(event) {
		this.columns = event.value;
		this.buildTable();
	}

	buildTable(): void {
		let library: ITableLibrary = {
			indicators: this.indicators.GROUPS,
			TENDER: this.indicators.TENDER,
			i18n: this.i18n
		};
		let table: ITable = {
			columns: this.columns,
			sortBy: this.sortBy,
			rows: []
		};
		if (this.companies) {
			this.companies.forEach(company => {
				let row = [];
				this.columns.forEach(col => {
					row.push({lines: col.format(company, library)});
				});
				table.rows.push({cells: row});
			});
		}
		this.table = table;
	}

	paginationChange(data): void {
		let pageSize = parseInt(data.value.pageSize, 10);
		this.search_cmd.from = (data.value.page || 0) * pageSize;
		this.search_cmd.size = pageSize;
		this.refresh(true);
	}

	sortChange(data: { value: ITableColumnSort }) {
		this.search_cmd.sort = {field: data.value.id, ascend: data.value.ascend};
		this.refresh();
	}

	refresh(scrollToTop: boolean = false): void {
		let cmd = this.search_cmd;
		this.loading++;
		let sub = this.api.searchCompany(cmd).subscribe(
			(result) => {
				if (this.search_cmd === cmd) {
					this.display(result.data);
					if (scrollToTop && this.platform.isBrowser) {
						Utils.scrollToFirst('tables');
					}
				}
			},
			(error) => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
				sub.unsubscribe();
			});
	}

	display(data: ISearchResultCompany): void {
		if (data) {
			this.total = data.hits.total;
			this.sortBy = data.sortBy;
			this.companies = data.hits.hits;
			this.buildTable();
			this.searchChange.emit(data);
		}
	}

}
