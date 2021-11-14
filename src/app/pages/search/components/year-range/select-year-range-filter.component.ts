import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {ISearchFilter, ISearchResultBucket} from '../../../../app.interfaces';
import {ConfigService} from '../../../../services/config.service';

@Component({
	moduleId: __filename,
	selector: 'select-year-range-filter',
	templateUrl: 'select-year-range-filter.component.html',
	styleUrls: ['select-year-range-filter.component.scss']
})
export class SelectYearRangeFilterComponent implements OnChanges {
	@Input()
	filter: ISearchFilter;

	@Input()
	buckets: Array<ISearchResultBucket>;

	@Output('onRangeChange')
	onRangeChange = new EventEmitter();

	public minYear: number;
	public maxYear: number;
	public startYear: number;
	public endYear: number;

	constructor(private config: ConfigService) {
		this.minYear = config.validMinYear;
		this.startYear = config.validMinYear;
		this.maxYear = config.validMaxYear;
		this.endYear = config.validMaxYear;
	}

	restoreFilter(filter: ISearchFilter) {
		if (filter.values) {
			this.startYear = filter.values[0];
			this.endYear = filter.values[1] - 1;
		}
		if (filter.minmax) {
			this.minYear = filter.minmax[0];
			this.maxYear = filter.minmax[1];
		}
	}

	applyBuckets(buckets) {
		if (this.filter && !this.filter.minmax) {
			if (buckets.length == 1) {
				this.filter.minmax = [buckets[0].key, buckets[0].key];
			} else {
				this.filter.minmax = [2100, 2000];
				buckets.forEach(bucket => {
					this.filter.minmax[0] = Math.min(this.filter.minmax[0], bucket.key);
					this.filter.minmax[1] = Math.max(this.filter.minmax[1], bucket.key);
				});
			}
			this.minYear = Math.max(2000, this.filter.minmax[0]);
			this.maxYear = Math.min(2100, this.filter.minmax[1]);
			if (this.startYear < this.minYear) {
				this.startYear = this.minYear;
			}
			if (this.endYear > this.maxYear) {
				this.endYear = this.maxYear;
			}
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.filter && changes.filter.currentValue) {
			this.restoreFilter(changes.filter.currentValue);
		}
		if (changes.buckets && changes.buckets.currentValue) {
			this.applyBuckets(changes.buckets.currentValue);
		}
	}

	onSliderChange(event) {
		this.startYear = event.startValue;
		this.endYear = event.endValue;
		if (!Number.isInteger(this.startYear) || !Number.isInteger(this.endYear)) {
			return;
		}
		if (event.startValue == this.minYear && event.endValue == this.maxYear) {
			this.filter.values = null;
		} else {
			this.filter.values = [this.startYear, this.endYear];
		}
		this.onRangeChange.emit();
	}

}
