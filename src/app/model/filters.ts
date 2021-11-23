import {Utils} from './utils';
import {INestedType, ISearchFilterDef, ISearchFilterDefType} from '../app.interfaces';

export const TenderFilterDefs: Array<ISearchFilterDef> = [
	{
		id: 'buyers.name',
		name: 'Name',
		field: 'buyers.name',
		group: 'Buyer',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'buyers.address.city',
		name: 'City',
		group: 'Buyer',
		field: 'buyers.address.city',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'buyers.address.country',
		name: 'Country',
		group: 'Buyer',
		field: 'buyers.address.country',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'buyers.buyerType',
		name: 'Type',
		group: 'Buyer',
		field: 'buyers.buyerType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
	{
		id: 'lots.bids.bidders.name',
		name: 'Name',
		field: 'lots.bids.bidders.name',
		group: 'Supplier',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'lots.bidsCount',
		name: 'Bids Count',
		group: 'Lots',
		field: 'lots.bidsCount',
		type: ISearchFilterDefType.value
	},
	{
		id: 'title',
		name: 'Title',
		field: 'title',
		group: 'Tender',
		type: ISearchFilterDefType.select,
		size: 10000,
		valueFormatter: Utils.capitalize

	},
	{
		id: 'country',
		name: 'Country',
		group: 'Tender',
		field: 'country',
		type: ISearchFilterDefType.select,
		valueTranslater: (value, i18n) => {
			return i18n.expandCountry(value);
		},
		size: 10000
	},
	{
		id: 'procedureType',
		name: 'Procedure Type',
		group: 'Tender',
		field: 'procedureType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
	{
		id: 'supplyType',
		name: 'Supply Type',
		group: 'Tender',
		field: 'supplyType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000

	},
	{
		id: 'publications.source',
		name: 'Source',
		group: 'Tender Meta Data',
		field: 'publications.source',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'ot.cpv',
		name: 'Main CPV',
		group: 'Sector',
		field: 'ot.cpv',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'cpvs.code',
		name: 'CPV Codes',
		group: 'Sector',
		field: 'cpvs.code',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'ot.cpv.divisions',
		name: 'Main CPV (Divisions)',
		group: 'Sector',
		field: 'ot.cpv.divisions',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'ot.cpv.groups',
		name: 'Main CPV (Groups)',
		group: 'Sector',
		field: 'ot.cpv.groups',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'ot.cpv.categories',
		name: 'Main CPV (Categories)',
		group: 'Sector',
		field: 'ot.cpv.categories',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'ot.cpv.full',
		name: 'Main CPV (Full)',
		group: 'Sector',
		field: 'ot.cpv',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'indicators.score_co',
		name: 'Good Procurement',
		group: 'Score',
		field: 'ot.scores.value',
		subrequest: {
			'ot.scores.type': 'TENDER'
		},
		type: ISearchFilterDefType.range,
		minmax: [0, 100],
		typeCount: true
	},
	{
		id: 'indicators.score_pi',
		name: 'Integrity',
		group: 'Score',
		field: 'ot.scores.value',
		subrequest: {
			'ot.scores.type': 'INTEGRITY'
		},
		type: ISearchFilterDefType.range,
		minmax: [0, 100],
		typeCount: true
	},
	{
		id: 'indicators.score_ti',
		name: 'Transparency',
		group: 'Score',
		field: 'ot.scores.value',
		subrequest: {
			'ot.scores.type': 'TRANSPARENCY'
		},
		type: ISearchFilterDefType.range,
		minmax: [0, 100],
		typeCount: true
	},
	{
		id: 'finalPrice.netAmountEur',
		name: 'Final Price KES',
		group: 'Prices',
		field: 'finalPrice.netAmountEur',
		type: ISearchFilterDefType.value
	},
	{
		id: 'lots.awardDecisionDate.year',
		name: 'Award Decision Year',
		group: 'Dates',
		field: 'lots.awardDecisionDate',
		typeYear: true,
		type: ISearchFilterDefType.range,
	},
	{
		id: 'lots.awardDecisionDate',
		name: 'Award Decision Date',
		group: 'Dates',
		field: 'lots.awardDecisionDate',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'publications.publicationDate',
		name: 'Call for tender date',
		group: 'Dates',
		field: 'publications.publicationDate',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'bidDeadline',
		name: 'Bid deadline',
		group: 'Dates',
		field: 'bidDeadline',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'contractSignatureDate',
		name: 'Contract signature date',
		group: 'Dates',
		field: 'contractSignatureDate',
		type: ISearchFilterDefType.date,
	},
];

export const CompanyFilterDefs: Array<ISearchFilterDef> = [
	{
		id: 'body.name.raw',
		name: 'Name',
		field: 'body.name.raw',
		group: 'Authority',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'body.contractsCount',
		name: 'Contracts count',
		group: 'Authority',
		field: 'body.contractsCount',
		type: ISearchFilterDefType.range,
		typeCount: true
	},
	{
		id: 'body.company.totalValueOfContracts',
		name: 'Total value of contracts',
		group: 'Authority',
		field: 'body.company.totalValueOfContracts',
		type: ISearchFilterDefType.range,
		bigInt: true,
		typeCount: true
	},
	{
		id: 'body.address.city',
		name: 'City',
		group: 'Address',
		field: 'body.address.city',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'body.address.country',
		name: 'Country',
		group: 'Address',
		field: 'body.address.country',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'body.address.ot.nutscode',
		name: 'Geographic region',
		group: 'Address',
		field: 'body.address.ot.nutscode',
		type: ISearchFilterDefType.select,
		nested: true,
		nestedType: INestedType.nuts,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		aggregation_field: 'body.address.ot.nutscode',
		size: 10000
	},
	{
		id: 'body.indicator.integrityIndicatorCompositionScore',
		name: 'Integrity Indicator Composite Score',
		group: 'Integrity',
		field: 'body.indicator.integrityIndicatorCompositionScore',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.elementaryIntegrityIndicators.tender',
		name: 'Elementary Integrity Indicators',
		group: 'Integrity',
		field: 'body.indicator.elementaryIntegrityIndicators.tender',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.transparencyIndicatorCompositionScore',
		name: 'Transparency Indicator Composite Score',
		group: 'Transparency',
		field: 'body.indicator.transparencyIndicatorCompositionScore',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.elementaryTransparencyIndicators.tender',
		name: 'Elementary Transparency Indicators',
		group: 'Transparency',
		field: 'body.indicator.elementaryTransparencyIndicators.tender',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.dates.awardDecisionYears',
		name: 'Award Decision Year',
		group: 'Dates',
		field: 'body.dates.awardDecisionYears',
		typeYear: true,
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.dates.awardDecisionDates',
		name: 'Award Decision Date',
		group: 'Dates',
		field: 'body.dates.awardDecisionDates',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'body.sector.cpvCodes',
		name: 'CPV code',
		group: 'Sector',
		field: 'body.sector.cpvCodes',
		type: ISearchFilterDefType.select,
		nestedType: INestedType.cpv,
		size: 10000
	},
];

export const AuthorityFilterDefs: Array<ISearchFilterDef> = [
	{
		id: 'body.name.raw',
		name: 'Name',
		group: 'Authority',
		field: 'body.name.raw',
		type: ISearchFilterDefType.select,
		size: 10000
	},
	{
		id: 'body.buyerType',
		name: 'Buyer Type',
		group: 'Authority',
		field: 'body.buyerType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
	{
		id: 'body.contractsCount',
		name: 'Contracts count',
		group: 'Authority',
		field: 'body.contractsCount',
		type: ISearchFilterDefType.range,
		typeCount: true
	},
	{
		id: 'body.company.totalValueOfContracts',
		name: 'Total value of contracts',
		group: 'Authority',
		field: 'body.company.totalValueOfContracts',
		type: ISearchFilterDefType.range,
		bigInt: true,
		typeCount: true
	},
	{
		id: 'body.address.city',
		name: 'City',
		group: 'Address',
		field: 'body.address.city',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'body.address.country',
		name: 'Country',
		group: 'Address',
		field: 'body.address.country',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'body.address.ot.nutscode',
		name: 'Geographic region',
		group: 'Address',
		field: 'body.address.ot.nutscode',
		type: ISearchFilterDefType.select,
		nestedType: INestedType.nuts,
		aggregation_field: 'body.address.ot.nutscode',
		valueFormatter: (value) => Utils.capitalize(Utils.formatNuts(value)),
		size: 10000
	},
	{
		id: 'body.indicator.integrityIndicatorCompositionScore',
		name: 'Integrity Indicator Composite Score',
		group: 'Integrity',
		field: 'body.indicator.integrityIndicatorCompositionScore',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.elementaryIntegrityIndicators.tender',
		name: 'Elementary Integrity Indicators',
		group: 'Integrity',
		field: 'body.indicator.elementaryIntegrityIndicators.tender',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.transparencyIndicatorCompositionScore',
		name: 'Transparency Indicator Composite Score',
		group: 'Transparency',
		field: 'body.indicator.transparencyIndicatorCompositionScore',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.indicator.elementaryTransparencyIndicators.tender',
		name: 'Elementary Transparency Indicators',
		group: 'Transparency',
		field: 'body.indicator.elementaryTransparencyIndicators.tender',
		typeCount: true,
		minmax: [0, 100],
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.dates.awardDecisionYears',
		name: 'Award Decision Year',
		group: 'Dates',
		field: 'body.dates.awardDecisionYears',
		typeYear: true,
		type: ISearchFilterDefType.range,
	},
	{
		id: 'body.dates.awardDecisionDates',
		name: 'Award Decision Date',
		group: 'Dates',
		field: 'body.dates.awardDecisionDates',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'body.sector.cpvCodes',
		name: 'CPV code',
		group: 'Sector',
		field: 'body.sector.cpvCodes',
		type: ISearchFilterDefType.select,
		nestedType: INestedType.cpv,
		size: 10000
	},
];

export const DashboardFilterDefs: Array<ISearchFilterDef> = [
	{
		id: 'buyers.buyerType',
		name: 'Buyer Type',
		group: 'Authority',
		field: 'buyers.buyerType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
	{
		id: 'lots.awardDecisionDate',
		name: 'Award Decision Date',
		group: 'Date',
		field: 'lots.awardDecisionDate',
		type: ISearchFilterDefType.date,
	},
	{
		id: 'buyers.contractsCount',
		name: 'Buyer\'s total contracts count',
		group: 'Authority',
		field: 'buyers.contractsCount',
		type: ISearchFilterDefType.range,
		typeCount: true
	},
	{
		id: 'lots.bids.bidders.contractsCount',
		name: 'Supplier\'s total contracts count',
		group: 'Authority',
		field: 'lots.bids.bidders.contractsCount',
		type: ISearchFilterDefType.range,
		typeCount: true
	},
	{
		id: 'buyers.company.totalValueOfContracts',
		name: 'Value of contracts',
		group: 'Authority',
		field: 'buyers.company.totalValueOfContracts',
		aggregation_field: 'buyers.company.totalValueOfContracts',
		type: ISearchFilterDefType.range,
		typeCount: true,
		bigInt: true
	},
	{
		id: 'supplyType',
		name: 'Supplier Type',
		group: 'Authority',
		field: 'supplyType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
	{
		id: 'ot.country',
		name: 'Country',
		group: 'Address',
		field: 'op.country',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.formatNuts(value),
		size: 10000
	},
	{
		id: 'buyers.address.ot.nutscode.nuts3',
		name: 'Geographic region',
		group: 'Address',
		field: 'buyers.address.ot.nutscode.nuts3',
		type: ISearchFilterDefType.select,
		// type: ISearchFilterDefType.nestedListWithSearch,
		size: 10000
	},
	{
		id: 'buyers.address.city.raw',
		name: 'City',
		group: 'Address',
		field: 'buyers.address.city.raw',
		type: ISearchFilterDefType.select,
		valueFormatter: (value) => Utils.formatNuts(value),
		size: 10000
	},
	{
		id: 'cpvs.code.raw',
		name: 'CPV code',
		group: 'Sector',
		field: 'cpvs.code.raw',
		type: ISearchFilterDefType.select,
		// type: ISearchFilterDefType.nestedListWithSearch,
		size: 10000
	},
	{
		id: 'buyers.contractsCount',
		name: 'Contract size',
		group: 'Tender',
		field: 'buyers.contractsCount',
		type: ISearchFilterDefType.range,
		typeCount: true
	},
	{
		id: 'procedureType',
		name: 'Procedure Type',
		group: 'Tender',
		field: 'procedureType',
		type: ISearchFilterDefType.select,
		valueFormatter: Utils.expandUnderlined,
		size: 10000
	},
];


export function isSearchDef(filter: ISearchFilterDef) {
	return filter.type === ISearchFilterDefType.text || filter.type === ISearchFilterDefType.value || filter.type === ISearchFilterDefType.term
}

export function isFilterDef(filter: ISearchFilterDef) {
	return filter.type !== ISearchFilterDefType.value;
}
