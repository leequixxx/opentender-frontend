import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
	moduleId: __filename,
	selector: 'select-year-range',
	templateUrl: 'select-year-range.component.html',
	styleUrls: ['select-year-range.component.scss']
})
export class SelectYearRangeComponent implements OnChanges {
	@Input() years: Array<number>;
	@Input() typeYear: boolean = false;
	@Input() small: boolean = false;
	@Output('onRangeChange') onRangeChange = new EventEmitter();

	public minYear: number = 0;
	public maxYear: number = 0;
	public startYear: number = 0;
	public endYear: number = 0;
	public isSet: boolean = false;
	public empty: boolean = false;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.years) {
			if (changes.years.currentValue !== null) {
				this.setYears();
			}
		}
	}

	getMinMax() {
		let years = this.years || [];
		let startYear = null;
		let endYear = null;
		years.forEach((year) => {
			startYear = startYear === null ? year : Math.min(year, startYear);
			endYear = endYear === null ? year : Math.max(year, endYear);
		});
		return {min: startYear, max: endYear};
	}


	setYears() {
		let m = this.getMinMax();
		if (this.isSet) {
			if (m.min !== null) {
				this.minYear = Math.min(m.min, this.minYear);
			}
			if (m.max !== null) {
				this.maxYear = Math.max(m.max, this.maxYear);
			}
			return;
		}
		this.empty = (this.years || []).length === 0;
		if (m.min !== null) {
			this.minYear = m.min;
		}
		if (m.max !== null) {
			this.maxYear = m.max;
		}
		this.startYear = this.minYear;
		this.endYear = this.maxYear;
		this.isSet = true;
	}

	onSliderChange(event) {
		if (!this.isSet) {
			return;
		}
		this.startYear = event.startValue;
		this.endYear = event.endValue;
		if (this.startYear > 0 && this.endYear > 0 &&
			((this.startYear !== this.minYear) || (this.endYear !== this.maxYear))
		) {
			this.onRangeChange.emit({data: {startValue: this.startYear, endValue: this.endYear}});
		} else {
			this.onRangeChange.emit({data: null});
		}
	}

}
