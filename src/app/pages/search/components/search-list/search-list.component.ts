import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ISearchFilter, ISearchResultBucket} from '../../../../app.interfaces';
import {Utils} from '../../../../model/utils';
import {PlatformService} from '../../../../services/platform.service';

@Component({
	selector: 'search-list',
	templateUrl: 'search-list.component.html',
	styleUrls: ['search-list.component.scss']
})
export class SearchListComponent {
	@Input() filter: ISearchFilter;
	@Output() public onChange = new EventEmitter();
	public selectedList = [];
	public showList = false;
	public searchValue = '';
	public Utils = Utils;

	constructor(private platform: PlatformService) {
	}

	public triggerChange(resize?: boolean) {
		this.onChange.next('')
		this.onChange.emit();

		if (resize && this.platform.isBrowser) {
			Utils.triggerResize();
		}
	}

	public toggleListVisibility() {
		this.showList = !this.showList;
	}

	public removeItems() {
		Object.keys(this.filter.enabled).forEach(i => this.filter.enabled[i] = false)
		this.triggerChange();
		this.closeShowList();
	}

	public closeShowList() {
		this.showList = false;
	}

	get filteredList() {
		return this.searchValue ? this.filter.buckets.filter(b => b.key.toLowerCase().includes(this.searchValue.toLowerCase())) : this.filter.buckets
	}
}
