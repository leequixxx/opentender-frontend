/// <reference path="./model/tender.d.ts" />
import Bidder = Definitions.Bidder;
import Tender = Definitions.Tender;
import Buyer = Definitions.Buyer;
import {Country} from './services/config.service';
import {IChartData} from './thirdparty/ngx-charts-universal/chart.interface';
import {FeatureCollection, GeometryObject} from 'geojson';
import Indicator = Definitions.Indicator;

/* data objects from api */

export interface ISector {
	id: string;
	name: string;
	level: string;
	value?: number;
}

export interface IRegion {
	id: string;
	name: string;
	level: number;
	value?: number;
}

export interface IAuthority {
	body: Buyer;
	count: number;
	countries: Array<string>;
	value?: number;
	sector?: string;
	ot: {indicators: Indicator[]};
}

export interface ICompany {
	body: Bidder;
	count: number;
	countries: Array<string>;
	value?: number;
	sector?: string;
	ot: {indicators: Indicator[]};
}

export interface IDownload {
	country: string;
	count: number;
	lastUpdate: number | string;
	formats: {
		csv: { filename: string; size: number };
		json: { filename: string; size: number };
		ndjson: { filename: string; size: number };
	};
}

export interface IDownloadOCDS {
	filename: string;
	lastUpdate: number | string;
	size: number;
}

/* stats objects from api */

export interface IStatsCountry {
	id: string;
	name: string;
	value: number;
}

export interface IStatsInYears {
	[year: string]: number;
}

export interface IStatsScoresInYears {
	[id: string]: IStatsInYears;
}

export interface IStatsDistributionInYears {
	[id: string]: {
		[year: string]: {
			[key: string]: number;
		}
	};
}

export interface IStatsPcCpvs {
	[id: string]: { name: string; value: number; percent: number; total: number };
}

export interface IStatsCpvs {
	[id: string]: { name: string; value: number };
}

export interface IStatsCpvsScores {
	[id: string]: { name: string; scores: IStatsIndicators };
}

export interface IStatsProcedureType {
	[name: string]: number;
}

export interface IStatsIndicators {
	[name: string]: number;
}

export interface IStatsNuts {
	[nutscode: string]: {[key: string]: number};
}

export interface IStatsPriceEUR {
	value: number;
}

export interface IStatsPrices {
	[currency: string]: number;
}

export interface IStatsPricesInYears {
	[year: string]: {
		value: number;
		sum_finalPriceEUR: IStatsPriceEUR;
		avg_finalPriceEUR: IStatsPriceEUR;
	};
}

export interface IStatsPcPricesLotsInYears {
	[year: string]: {
		total: number;
		value: number;
		percent: number;
		sum_finalPriceEUR: IStatsPriceEUR;
		avg_finalPriceEUR: IStatsPriceEUR;
	};
}

export interface IStatsAuthorities {
	top10: Array<IAuthority>;
}

export interface IStatsCompanies {
	top10: Array<ICompany>;
}

export interface IStatsSector {
	sector: ISector;
	parents?: Array<ISector>;
	stats: IStats;
}

export interface IStatsRegion {
	region: IRegion;
	parents?: Array<IRegion>;
	children?: Array<IRegion>;
	stats: IStats;
}

export interface IStats {
	terms_authority_nuts: IStatsNuts;
	terms_company_nuts: IStatsNuts;
	terms_subregions_nuts: IStatsNuts;
	terms_main_cpv_categories: IStatsCpvs;
	terms_main_cpv_groups: IStatsCpvs;
	terms_main_cpv_divisions: IStatsCpvs;
	terms_main_cpv_full: IStatsCpvs;
	terms_main_cpv_divisions_score: IStatsCpvs;
	terms_main_cpv_divisions_scores: IStatsCpvsScores;
	terms_main_cpv_groups_scores: IStatsCpvsScores;
	terms_main_cpv_categories_scores: IStatsCpvsScores;
	terms_main_cpv_full_scores: IStatsCpvsScores;
	terms_pc_main_cpv_divisions: IStatsPcCpvs;
	sums_finalPrice: IStatsPrices;
	sum_finalPriceEUR: IStatsPriceEUR;
	avg_finalPriceEUR: IStatsPriceEUR;
	top_sum_finalPrice_authorities: IStatsAuthorities;
	top_terms_companies: IStatsCompanies;
	top_sum_finalPrice_companies: IStatsCompanies;
	top_terms_authorities: IStatsAuthorities;
	terms_indicators: IStatsIndicators;
	terms_procedure_type: IStatsProcedureType;
	terms_indicators_score: IStatsIndicators;
	terms_score: IStatsIndicators;
	histogram: IStatsInYears;
	histogram_finalPriceEUR: IStatsPricesInYears;
	histogram_indicators: IStatsScoresInYears;
	histogram_distribution_indicators: IStatsDistributionInYears;
	histogram_count_finalPrices: IStatsPcPricesLotsInYears;
	sectors_stats: Array<{ sector: ISector; stats: IStats }>;
	region_stats: Array<{ id: string; value: number, stats: IStats }>;
	benchmark: IStats;
}

/* search-result-packages */

export interface ISearchResultBucket {
	name?: string;
	key: string;
	doc_count: number;
	min?: number,
	max?: number
}

export interface ISearchResultAggregation {
	[name: string]: {
		doc_count?: number;
		buckets: Array<ISearchResultBucket>;
	};
}

export interface ISearchResultTender {
	hits: {
		total: number;
		hits: Array<Tender>;
	};
	sortBy: ITableColumnSort;
	aggregations: ISearchResultAggregation;
	stats: IStats;
}

export interface ISearchResultAuthority {
	hits: {
		total: number;
		hits: Array<IAuthority>;
	};
	sortBy: ITableColumnSort;
	aggregations: ISearchResultAggregation;
}

export interface ISearchResultCompany {
	hits: {
		total: number;
		hits: Array<ICompany>;
	};
	sortBy: ITableColumnSort;
	aggregations: ISearchResultAggregation;
}

/* api-transfer-packages */

export interface IApiResultTender {
	data: Tender;
}

export interface IApiResultSectors {
	data: {
		[cpvcode: string]: { name: string; value: number; level: string }
	};
}

export interface IApiResultPortalsStats {
	data: Array<IStatsCountry>;
}

export interface IApiResultCompany {
	data: {
		company: ICompany;
	};
}

export interface IApiResultCompanySimilar {
	data: {
		similar: Array<ICompany>;
	};
}

export interface IApiResultAuthority {
	data: {
		authority: IAuthority;
	};
}

export interface IApiResultNuts {
	data: IStatsNuts;
}

export interface IApiResultAuthoritySimilar {
	data: {
		similar: Array<IAuthority>;
	};
}

export interface IApiResultSector {
	data: IStatsSector;
}

export interface IApiResultRegion {
	data: IStatsRegion;
}

export interface IApiResultSearchCompany {
	data: ISearchResultCompany;
}

export interface IApiResultSearchAuthority {
	data: ISearchResultAuthority;
}

export interface IApiResultSearchTender {
	data: ISearchResultTender;
}

export interface IApiResultDownloadTenderSearch {
	data: {
		id: string;
	};
}

export interface IApiResultStat {
	data: IStats;
}

export interface IApiResultStatStats {
	data: {
		stats: IStats;
	};
}

export interface IApiResultPing {
	data: {
		version: string;
		country: Country
	};
}

export interface IApiResultAutoComplete {
	data: Array<{
		key: string;
		value: number;
	}>;
}

export interface IApiResultGeoJSON extends FeatureCollection<GeometryObject, { id: string; name: string }> {
	crs: string;
}

/* graph & map data export */

export interface ISeries {
	data: Array<IChartData>;
	multi?: boolean;
	header: { value: string, name: string };
	filename: string;
}

export interface ISeriesProvider {
	getSeriesInfo: () => ISeries;
}

export interface ISeriesDataTable {
	heads: Array<Array<string>>;
	rows: Array<Array<string | number | Date>>;
}

/* benchmark filter */

export interface IBenchmarkFilter {
	id: string;
	name: string;
	active: boolean;
	data?: string;
}

/* search object helper */

export enum ISearchFilterDefType {
	text = 1,
	select = 2,
	value = 3,
	range = 4,
	term = 5,
	date = 6,
	years = 7,
	bool = 8,
	listWithSearch = 9,
	nestedListWithSearch = 10,
	none = 0
}
export enum INestedType {
	nuts = 1,
	cpv = 2
}

export interface ISearchFilterValueTranslate {
	expandCountry: (string) => string;
}

export interface ISearchFilterDef {
	id: string;
	name: string;
	field: string;
	type: ISearchFilterDefType;
	group?: string;
	size?: number;
	aggregation_field?: string; // if empty "field" is used for aggregation, too
	aggregation_type?: ISearchFilterDefType; // if empty "type" is used for aggregation, too
	valueFormatter?: (string) => string;
	valueTranslater?: (string, ISearchFilterValueTranslate) => string;
	valuesFilter?: (buckets: Array<ISearchResultBucket>) => Array<ISearchResultBucket>;
	listFormatter?: string;
	nested?: boolean;
	nestedType?: INestedType;
	subrequest?: {
		[fieldname: string]: string | boolean | number
	};
	minmax?: null | [number, number];
	typeCount?: boolean
	typeYear?: boolean
	bigInt?: boolean
}

export interface ISearchFilter {
	def: ISearchFilterDef;
	aggregation_id?: string; // auto build field->id (xyz.xzy -> xyz_xyz as made be elastic aggregation result)
	value?: string; // the actual user search value
	values?: Array<any>; // the actual user search values, eg. range [year_start,year_end]
	enabled?: {}; // the additional filter strings based on user choosen aggregation
	buckets?: Array<ISearchResultBucket>; // the result of aggregation
	searchedValue?: string;
	active?: boolean;
	mode?: string;
	minmax?: null | [number, number];
}

/* search commands */

export interface ISearchCommandAggregation {
	field: string;
	size?: number;
	type: string;
	aggregations?: ISearchCommandAggregation[];
}

export interface ISearchCommandWeights {
	[fieldname: string]: number;
}

export interface ISearchCommandFilter {
	field: string;
	value: Array<string | boolean | number>;
	type: string;
	sort?: string;
	mode?: string;
	and?: ISearchCommandFilter[];
	weights?: ISearchCommandWeights;
	subrequest?: {
		[fieldname: string]: string | boolean | number;
	};
}

export interface ISearchCommand {
	filters: Array<ISearchCommandFilter>;
	aggregations?: Array<ISearchCommandAggregation>;
	stats?: Array<string>;
	size?: number;
	from?: number;
	sort?: {
		field: string;
		ascend: boolean;
	};
}

export interface IGetByIdCommand {
	ids: Array<string>;
	filters?: Array<ISearchCommandFilter>;
}

/* Indicator Info Helpers */

export interface IIndicatorInfo {
	id: string;
	name: string;
	plural: string;
	icon: string;
	subindicators: Array<ISubIndicatorInfo>;
}

export interface ISubIndicatorInfo {
	id: string;
	name: string;
	desc: string;
	order: number;
}

/* table model */

export interface ITableCell {
	align?: string;
	lines: Array<ITableCellLine>;
}

export interface ITableRow {
	cells: Array<ITableCell>;
}

export interface ITable {
	columns: Array<ITableColumn>;
	rows: Array<ITableRow>;
	sortBy: ITableColumnSort;
}

export interface ITableColumnSort {
	id: string;
	ascend: boolean;
}

export interface ITableColumn {
	name: string;
	id: string;
	group: string;
	sortBy?: ITableColumnSort;
}

export interface ITableCellLine {
	content?: string;
	link?: string;
	prefix?: string;
	hint?: string;
	icon?: string;
	styleClass?: string;
	score?: number;
	collapseName?: string;
	collapseLines?: Array<ITableCellLine>;
	collapsed?: boolean;
	align?: string;
}

export interface ITableLibrary {
	indicators: Array<IIndicatorInfo>;
	TENDER: IIndicatorInfo;
	i18n: {
		formatDate: (value: string) => string;
		formatDatetime: (value: string) => string;
		formatCurrencyValueEUR: (value: number) => string;
		formatValue: (value: number) => string;
		expandCountry: (key: string) => string;
		nameGuard: (key: string) => string;
		get: (key: string) => string;
	};
}

export interface ITableColumnAuthority extends ITableColumn {
	format: (authority: IAuthority, library: ITableLibrary) => Array<ITableCellLine>;
}

export interface ITableColumnCompany extends ITableColumn {
	format: (company: ICompany, library: ITableLibrary) => Array<ITableCellLine>;
}

export interface ITableColumnTender extends ITableColumn {
	format: (tender: Tender, library: ITableLibrary) => Array<ITableCellLine>;
}

export interface IBreadcrumb {
	name: string;
	link?: string;
}

export interface INutsNames {
	[key: string]: string;
}
