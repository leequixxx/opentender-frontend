import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ISearchFilter, ISearchResultBucket} from '../../../../app.interfaces';
import {I18NService} from '../../../../modules/i18n/services/i18n.service';

@Component({
	selector: 'search-list-checkbox',
	templateUrl: 'search-list-checkbox.html',
	styleUrls: ['search-list-checkbox.scss']
})
export class SearchListCheckbox {
	@Input() filter: ISearchFilter;
	@Input() bucket: ISearchResultBucket;
	@Output() change: EventEmitter<string> = new EventEmitter<string>()

	constructor(public i18n: I18NService) {
	}

	public getValueTitle(bucket: ISearchResultBucket, filter: ISearchFilter): string {
		if (bucket.name) {
			return bucket.name;
		}
		if (filter.def.valueFormatter) {
			return filter.def.valueFormatter(bucket.key);
		}
		if (filter.def.valueTranslater) {
			return filter.def.valueTranslater(bucket.key, this.i18n);
		}
		return bucket.key;
	}

	public triggerChange() {
		this.change.emit('')
	}
}
