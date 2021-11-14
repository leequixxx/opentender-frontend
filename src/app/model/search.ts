import {ISearchFilterDef, ISearchFilterDefType, ISearchCommand, ISearchCommandFilter, ISearchFilter} from '../app.interfaces';

export class Search {
	filters: Array<ISearchFilter> = [];
	searches: Array<ISearchFilter> = [];
	country: string;
	entity: string;

	constructor(entity: string, filterDefs?: Array<ISearchFilterDef>) {
		this.entity = entity;
		this.filters = (filterDefs || []).map(this.buildFilter);
	}

	public build(searchesDefs: Array<ISearchFilterDef>, filterDefs: Array<ISearchFilterDef>) {
		this.searches = (searchesDefs || []).map(this.buildFilter);
		this.filters = (filterDefs || []).map(this.buildFilter);
	}

	public getActiveFilterDefs(): Array<ISearchFilterDef> {
		return this.filters.map(f => f.def);
	}

	public toggleFilter(filterdef: ISearchFilterDef): void {
		let filter = this.filters.filter(f => {
			return filterdef === f.def;
		})[0];
		if (!filter) {
			this.filters.push(this.buildFilter(filterdef));
		} else {
			this.filters.splice(this.filters.indexOf(filter), 1);
		}
	}

	public addSearch(filterdef: ISearchFilterDef): void {
		this.searches.push(this.buildFilter(filterdef));
	}

	public removeSearch(search: ISearchFilter): void {
		this.searches = this.searches.filter(s => s !== search);
	}

	public fillAggregationResults(aggregations): void {
		this.filters.forEach(filter => {
			let missing = [];
			if (filter.def.type !== ISearchFilterDefType.bool) {
				missing = Object.keys(filter.enabled).filter(key => {
					return filter.enabled[key];
				});
			}
			filter.buckets = [];
			if (aggregations) {
				let agg = aggregations['_' + filter.aggregation_id];
				if (agg) {
					filter.buckets = agg.buckets;
					if (agg.buckets) {
						if (filter.def.valuesFilter) {
							filter.buckets = filter.def.valuesFilter(agg.buckets);
						}
						agg.buckets.forEach(bucket => {
							let i = missing.indexOf(bucket.key);
							if (i >= 0) {
								missing.splice(i, 1);
							}
						});
					}
				}
			}
			missing.forEach((key) => {
				filter.buckets.unshift({key: key, doc_count: 0});
			});
		});
	}

	public getCommand(): ISearchCommand {
		let cmd: ISearchCommand = {filters: []};
		cmd.aggregations = this.filters.filter((f) => {
			return f.active && f.def.type !== ISearchFilterDefType.range;
		}).map((f) => {
			return {type: ISearchFilterDefType[f.def.aggregation_type || f.def.type], field: f.def.aggregation_field || f.def.field, size: f.def.size};
		});
		this.filters.forEach((f) => {
			if (f.active) {
				if (f.def.type === ISearchFilterDefType.bool) {
					let b;
					if (f.value.toString() === '1') {
						b = true;
					} else if (f.value.toString() === '0') {
						b = false;
					} else {
						return;
					}
					cmd.filters.push({field: f.def.field, value: b, type: ISearchFilterDefType[f.def.type], mode: f.mode, subrequest: f.def.subrequest});
				} else {
					let list = [];
					if (f.enabled) {
						let others = [];
						Object.keys(f.enabled).forEach((key) => {

							if (f.enabled[key]) {
								if (f.def.aggregation_type && (f.def.aggregation_type !== f.def.type)) {
									others.push(key);
								} else {
									list.push(key);
								}
							}
						});
						if (others.length > 0) {
							cmd.filters.push({field: f.def.aggregation_field || f.def.field, value: others, type: ISearchFilterDefType[f.def.aggregation_type]});
						}
					}
					if (f.value && f.value.length > 0) {
						list.push(f.value);
					}
					if (f.values) {
						list = list.concat(f.values);
					}
					if (list.length > 0) {
						cmd.filters.push({field: f.def.field, value: list, type: ISearchFilterDefType[f.def.type], mode: f.mode, subrequest: f.def.subrequest});
					}
				}
			}
		});
		this.searches.forEach((f) => {
			if (f.def.type === ISearchFilterDefType.text) {
				if (f.value && f.value !== '') {
					let s: ISearchCommandFilter = cmd.filters.find(item => {
						return (item.field == f.def.field);
					});
					if (s) {
						s.value.push(f.value);
					} else {
						cmd.filters.push({field: f.def.field, value: [f.value], type: ISearchFilterDefType[f.def.type], subrequest: f.def.subrequest});
					}
				}
			} else if (f.def.type === ISearchFilterDefType.value) {
				cmd.filters.push({field: f.def.field, value: [f.value], type: ISearchFilterDefType[f.def.type], mode: f.mode, subrequest: f.def.subrequest});
			}
		});
		return cmd;
	}

	private buildFilter(fd: ISearchFilterDef) {
		return {
			def: fd,
			aggregation_id: (fd.aggregation_field || fd.field).replace(/\./g, '_'),
			value: '',
			enabled: {},
			buckets: null,
			active: true
		};
	}
	public setBuildedFilters(data) {
		this.filters = data;
	}
	public setBuildedSearches(data) {
		this.searches = data;
	}

}
