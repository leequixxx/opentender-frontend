/*
 TODO: respect stepValue with snap
 TODO: handle overflow tick labels
 */

import {Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges, HostListener} from '@angular/core';
import {PlatformService} from '../../services/platform.service';
import {IEventSlideAble, IEventKeyDownAble} from './slider-handle.directive';

@Component({
	selector: 'slider',
	templateUrl: 'slider.component.html'
})

export class SliderComponent implements OnChanges {

	@Input('singleHandle')
	singleHandle: boolean = false;

	@Input('formatTick')
	formatTick: (value: number) => string;

	@Input('startValue')
	get startValue(): any {
		return this._startValue;
	}

	set startValue(val) {
		this._startValue = parseFloat(val);
	}


	@Input('endValue')
	get endValue(): any {
		return this._endValue;
	}

	set endValue(val) {
		this._endValue = parseFloat(val);
	}


	@Input('stepValue')
	get stepValue(): any {
		return this._stepValue;
	}

	set stepValue(val) {
		this._stepValue = parseFloat(val);
	}

	@Input('min')
	get min(): any {
		return this._min;
	}

	set min(val) {
		this._min = parseFloat(val);
	}

	@Input('max')
	get max(): any {
		return this._max;
	}

	set max(val) {
		this._max = parseFloat(val);
	}

	@Input() snap: any = true;
	@Input() compact: any = false;

	@Input() defaultWidth: any = 100;

	@Output('onSliderChange') onSliderChangeEvent = new EventEmitter();

	public ticks = [];
	private tickWidth = 1;
	private border = 13;
	private _stepValue = 1;
	private _min = 0;
	private _max = 10;
	private _startValue = 0;
	private _endValue = 10;

	public position = {
		range1: 0,
		range1min: 0,
		range1max: 0,
		range2: 0,
		range2min: 0,
		range2max: 100
	};

	constructor(private el: ElementRef, private platform: PlatformService) {
	}

	ngOnInit() {
		this.resize();
	}

	resize() {
		if (this.platform.isBrowser) {
			let r = this.el.nativeElement.getBoundingClientRect();
			this.position.range2max = r.right - r.left - (this.border * 2);
		} else {
			this.position.range2max = parseFloat(this.defaultWidth);
		}
		this.calculateTicks();
	}

	ngAfterViewInit() {
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.resize();
	}

	calculateTicks() {
		let valueSpan = Math.max(1, this._max - this._min);
		let mod = 0;
		if (!this.compact) {
			// TODO: better tick show/hide heuristic
			mod = 1;
			if (valueSpan > 10) {
				mod = 10;
			}
			if (valueSpan > 100) {
				mod = 100;
			}
		}

		let nrOfTicks = valueSpan / this._stepValue;
		this.tickWidth = Math.max((this.position.range2max / nrOfTicks), 1);
		this.ticks = [];
		for (let i = 0; i <= valueSpan; i = i + this._stepValue) {
			this.ticks.push({value: this._min + i, width: this.tickWidth, show: i % mod === 0});
		}
		if (this.ticks.length > 0) {
			this.ticks[0].show = true;
			this.ticks[this.ticks.length - 1].show = true;
		}
		this.applyPositions();
	}

	applyPositions(): void {
		this.position.range1 = this.tickWidth * ((this._startValue - this._min) / this._stepValue);
		this.position.range2min = this.position.range1;
		this.position.range2 = this.tickWidth * ((this._endValue - this._min) / this._stepValue);
		this.position.range1max = this.position.range2;
	}

	valueFromPosition(x: number): number {
		return ((x / this.tickWidth) * this._stepValue) + this._min;
	}

	positionFromValue(val: number): number {
		return ((this.tickWidth * val) * this._stepValue) + this._min;
	}

	getTickLabel(val: number): string {
		if (this.formatTick) {
			return this.formatTick(val);
		}
		return val.toString();
	}

	@HostListener('window:resize')
	onWindowResize(): void {
		this.resize();
	}

	changed() {
		this.onSliderChangeEvent.emit({startValue: this._startValue, endValue: this._endValue});
	}

	ribbonClick(event) {
		let value = this.valueFromPosition(event.value);
		if (this.snap) {
			// TODO: snap for _stepValue > 1
			value = Math.floor(value);
		}
		value = Math.min(value, this._max);
		value = Math.max(value, this._min);
		if (this.singleHandle) {
			this._endValue = value;
		} else {
			if (value > this._endValue) {
				this._endValue = value;
			} else if (value < this._startValue) {
				this._startValue = value;
			} else {
				if (value - this._startValue > this._endValue - value) {
					this._endValue = value;
				} else {
					this._startValue = value;
				}
			}
		}
		this.applyPositions();
		this.changed();
	}

	slider1Step(event: IEventKeyDownAble) {
		let value = this._startValue;
		if (event.step < 0) {
			value = value - this._stepValue;
		} else if (event.step > 0) {
			value = value + this._stepValue;
		}
		value = Math.min(value, this._max);
		value = Math.max(value, this._min);
		value = Math.min(value, this._endValue);
		if (value !== this._startValue) {
			this._startValue = value;
			this.applyPositions();
			this.changed();
		}
	}

	slider2Step(event: IEventKeyDownAble) {
		let value = this._endValue;
		if (event.step < 0) {
			value = value - this._stepValue;
		} else if (event.step > 0) {
			value = value + this._stepValue;
		}
		value = Math.min(value, this._max);
		value = Math.max(value, this._min);
		value = Math.max(value, this._startValue);
		if (value !== this._endValue) {
			this._endValue = value;
			this.applyPositions();
			this.changed();
		}
	}

	slider1Change(event: IEventSlideAble) {
		this._startValue = this.valueFromPosition(event.value);
		if (this.snap) {
			this._startValue = Math.round(this._startValue);
		}
		this.applyPositions();
		this.changed();
	}

	slider2Change(event: IEventSlideAble) {
		this._endValue = this.valueFromPosition(event.value);
		if (this.snap) {
			this._endValue = Math.round(this._endValue);
		}
		this.applyPositions();
		this.changed();
	}

}
