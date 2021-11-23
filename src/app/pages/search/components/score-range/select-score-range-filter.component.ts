import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {ISearchFilter, ISearchResultBucket} from '../../../../app.interfaces';

@Component({
	moduleId: __filename,
	selector: 'select-score-range-filter',
	templateUrl: 'select-score-range-filter.component.html',
	styleUrls: ['select-score-range-filter.component.scss']
})
export class SelectScoreRangeFilterComponent implements OnChanges {
	@Input()
	filter: ISearchFilter;
	@Input()
	typeCount: boolean = false;
	@Input()
	typeYear: boolean = false;
	@Input()
	bigInt: boolean = false;
	@Input()
	buckets: Array<ISearchResultBucket>;

	@Output('onRangeChange') onRangeChange = new EventEmitter();

	@Input()
	public minScore: number = 0;
	@Input()
	public maxScore: number = 100;
	@Input()
	public startScore: number = 0;
	@Input()
	public endScore: number = 100;


	restoreFilter(filter: ISearchFilter) {
		if (filter.values) {
			this.startScore = filter.values[0];
			this.endScore = filter.values[1];
		}
	}

	applyBuckets(buckets) {
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.filter && changes.filter.currentValue) {
			this.restoreFilter(changes.filter.currentValue);
			this.minScore = Math.trunc(this.minScore);
			this.maxScore = Math.trunc(this.maxScore);
			this.startScore = Math.trunc(this.startScore);
			this.endScore = Math.trunc(this.endScore);
		}
		if (changes.buckets && changes.buckets.currentValue) {
			this.applyBuckets(changes.buckets.currentValue);
		}
	}

	onSliderChange(event) {
		this.startScore = event.startValue;
		this.endScore = event.endValue;
		if (event.startValue == this.minScore && event.endValue == this.maxScore) {
			this.filter.values = null;
		} else {
			this.filter.values = [this.startScore, this.endScore];
		}
		this.onRangeChange.emit();
	}

}
