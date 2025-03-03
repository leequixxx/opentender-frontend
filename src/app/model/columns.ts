/// <reference path="./tender.d.ts" />
import Bidder = Definitions.Bidder;
import Buyer = Definitions.Buyer;
import Price = Definitions.Price;
import Lot = Definitions.Lot;
import Bid = Definitions.Bid;
import {ITableColumnAuthority, ITableColumnCompany, ITableColumnTender, ITableCellLine, IIndicatorInfo, ITableLibrary} from '../app.interfaces';
import {Utils} from './utils';
import Tender = Definitions.Tender;

const ICON = {
	tender: 'icon-newspaper',
	region: 'icon-location',
	authority: 'icon-library',
	company: 'icon-office'
};

const ColumnsFormatUtils = {
	checkEntryCollapse: (list: Array<ITableCellLine>, library: ITableLibrary, amount: number = 1) => {
		if (list.length > amount) {
			return [{collapseName: list.length + ' ' + library.i18n.get('Entries'), collapseLines: list, collapsed: true}];
		}
		return list;
	},
	sortListByContent: (list: Array<ITableCellLine>) => {
		list.sort((a, b) => {
			if (a.content < b.content) {
				return -1;
			}
			if (a.content > b.content) {
				return 1;
			}
			return 0;
		});
		return list;
	},
	formatPriceEURValue: (value: number, library: ITableLibrary) => {
		return library.i18n.formatCurrencyValueEUR(value).replace(/ /g, '\u00a0');
	},
	formatPriceEUR: (price: Price, library: ITableLibrary) => {
		if (price && price.hasOwnProperty('netAmountEur')) {
			return [{content: ColumnsFormatUtils.formatPriceEURValue(price.netAmountEur, library)}];
		}
		return [];
	},
	formatTenderIndicatorGroup: (tender: Tender, group: IIndicatorInfo) => {
		if (!tender.indicators || !group) {
			return [];
		}
		let result: Array<ITableCellLine> = [];
		tender.ot.scores.forEach(score => {
			if (score.status === 'CALCULATED' && score.type === group.id) {
				let collapseLines: Array<ITableCellLine> = [];
				tender.indicators.forEach(indicator => {
					let group_id = indicator.type.split('_')[0];
					if (indicator.status === 'CALCULATED' && group_id === group.id) {
						let def = group.subindicators.find(sub => sub.id === indicator.type);
						if (def) {
							collapseLines.push({score: indicator.value, prefix: def.name, hint: def.desc});
						}
					}
				});
				result.push({collapseName: group.name, score: score.value, hint: group.name, collapseLines: collapseLines, collapsed: true, align: 'center'});
			}
		});
		return result;
	}
};

export const AuthorityColumns: Array<ITableColumnAuthority> = [
	{
		name: 'Profile Link',
		id: 'id',
		group: 'Authority',
		format: (authority, library): Array<ITableCellLine> => [{
			icon: ICON.authority + ' icon-large',
			content: '',
			link: '/authority/' + authority.body.id,
			hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(authority.body.name),
			align: 'center'
		}]
	},
	{
		name: 'Name',
		id: 'body.name',
		group: 'Authority',
		sortBy: {
			id: 'body.name.raw',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: library.i18n.nameGuard(authority.body.name)}]
	},
	{
		name: 'Buyer Type',
		id: 'body.buyerType',
		group: 'Authority',
		sortBy: {
			id: 'body.buyerType',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: Utils.expandUnderlined(authority.body.buyerType)}]
	},
	{
		name: 'Contracts count',
		id: 'body.contractsCount',
		group: 'Authority',
		sortBy: {
			id: 'body.contractsCount',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(authority.body.contractsCount)}]
	},
	{
		name: 'Total value of contracts',
		id: 'body.company.totalValueOfContracts',
		group: 'Authority',
		sortBy: {
			id: 'body.company.totalValueOfContracts',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(authority.body.company.totalValueOfContracts)}]
	},
	{
		name: 'City',
		id: 'body.address.city',
		group: 'Address',
		sortBy: {
			id: 'body.address.city',
			ascend: true
		},
		format: (authority): Array<ITableCellLine> => [{content: authority.body && authority.body.address ? authority.body.address.city : ''}]
	},
	{
		name: 'Country',
		id: 'body.address.country',
		group: 'Address',
		sortBy: {
			id: 'body.address.country',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: authority.body && authority.body.address ? library.i18n.expandCountry(authority.body.address.country) : ''}]
	},
	{
		name: 'Geographic region',
		id: 'body.address.ot.nutscode',
		group: 'Address',
		sortBy: {
			id: 'body.address.ot.nutscode',
			ascend: true
		},
		// TODO: update path after backend will ready
		format: (authority, library): Array<ITableCellLine> => authority.body && authority.body.address && authority.body.address.ot ? [{content: Utils.formatNuts(authority.body.address.ot.nutscode)}] : [{content: ''}]
	},
	{
		name: 'Integrity Indicator Composition Score',
		id: 'body.indicator.integrityIndicatorCompositionScore',
		group: 'Integrity',
		sortBy: {
			id: 'body.indicator.integrityIndicatorCompositionScore',
			ascend: false
		},
		format: (authority, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'INTEGRITY'));
			return authority.body && authority.body.indicator && authority.body.indicator.integrityIndicatorCompositionScore  && authority.body.indicator.integrityIndicatorCompositionScore ? [{content: Utils.roundValueTwoDecimals(authority.body.indicator.integrityIndicatorCompositionScore).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Elementary Integrity Indicators',
		id: 'body.indicator.elementaryIntegrityIndicators',
		group: 'Integrity',
		sortBy: {
			id: 'body.indicator.elementaryIntegrityIndicators',
			ascend: false
		},
		format: (authority, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'INTEGRITY'));
			return authority.body && authority.body.indicator && authority.body.indicator.elementaryIntegrityIndicators && authority.body.indicator.elementaryIntegrityIndicators.tender ? [{content: Utils.roundValueTwoDecimals(authority.body.indicator.elementaryIntegrityIndicators.tender).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Transparency Indicator Composition Score',
		id: 'body.indicator.transparencyIndicatorCompositionScore',
		group: 'Transparency',
		sortBy: {
			id: 'body.indicator.transparencyIndicatorCompositionScore',
			ascend: false
		},
		format: (authority, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'TRANSPARENCY'));
			return authority.body && authority.body.indicator && authority.body.indicator.transparencyIndicatorCompositionScore ? [{content: Utils.roundValueTwoDecimals(authority.body.indicator.transparencyIndicatorCompositionScore).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Elementary Transparency Indicators',
		id: 'body.indicator.elementaryTransparencyIndicators',
		group: 'Transparency',
		sortBy: {
			id: 'body.indicator.elementaryTransparencyIndicators',
			ascend: false
		},
		format: (authority, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'TRANSPARENCY'));
			return authority.body && authority.body.indicator && authority.body.indicator.elementaryTransparencyIndicators && authority.body.indicator.elementaryTransparencyIndicators.tender ? [{content:  Utils.roundValueTwoDecimals(authority.body.indicator.elementaryTransparencyIndicators.tender).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Award Decision Year',
		id: 'body.dates.awardDecisionYearsMinMax',
		group: 'Dates',
		sortBy: {
			id: 'body.dates.awardDecisionYearsMinMax',
			ascend: false
		},
		format: (authority, library): Array<ITableCellLine> => [{content: authority.body && authority.body.dates && authority.body.dates.awardDecisionYearsMinMax ? authority.body.dates.awardDecisionYearsMinMax : ''}]
	},
	{
		name: 'Most frequent market',
		id: 'body.sector.mostFrequentMarket',
		group: 'Sector',
		sortBy: {
			id: 'body.sector.mostFrequentMarket',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> =>  authority.body.sector && authority.body.sector.mostFrequentMarket && authority.body.sector.mostFrequentMarket.label ? [{content:authority.body.sector.mostFrequentMarket.label }] : [{content: ''}]
	},
];

export const CompanyColumns: Array<ITableColumnCompany> = [
	{
		name: 'Profile Link',
		id: 'id',
		group: 'Company',
		format: (company, library) => [{icon: ICON.company + ' icon-large', content: '', link: '/company/' + company.body.id, hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(company.body.name), align: 'center'}]
	},
	{
		name: 'Name',
		group: 'Company',
		id: 'body.name',
		sortBy: {
			id: 'body.name.raw',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => [{content: library.i18n.nameGuard(company.body.name)}]
	},
	{
		name: 'Contracts count',
		group: 'Company',
		id: 'body.contractsCount',
		sortBy: {
			id: 'body.contractsCount',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(company.body.contractsCount)}]
	},
	{
		name: 'Total value of contracts',
		group: 'Company',
		id: 'body.company.totalValueOfContracts',
		sortBy: {
			id: 'body.company.totalValueOfContracts',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(company.body.company.totalValueOfContracts)}]
	},
	{
		name: 'Geographic region',
		id: 'body.address.ot.nutscode',
		group: 'Address',
		sortBy: {
			id: 'body.address.ot.nutscode',
			ascend: true
		},
		// TODO: update path after backend will ready
		format: (company, library): Array<ITableCellLine> => company.body && company.body.address && company.body.address.ot ? [{content: Utils.formatNuts(company.body.address.ot.nutscode)}] : [{content: ''}]
	},
	{
		name: 'Country',
		group: 'Address',
		id: 'body.address.country',
		sortBy: {
			id: 'body.address.country',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => company.body && company.body.address ? [{content: library.i18n.expandCountry(company.body.address.country)}] : [{content: ''}]
	},
	{
		name: 'City',
		group: 'Address',
		id: 'body.address.city',
		sortBy: {
			id: 'body.address.city',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => company.body && company.body.address ? [{content: company.body.address.city}] : [{content: ''}]
	},{
		name: 'Integrity Indicator Composition Score',
		id: 'body.indicator.integrityIndicatorCompositionScore',
		group: 'Integrity',
		sortBy: {
			id: 'body.indicator.integrityIndicatorCompositionScore',
			ascend: false
		},
		format: (company, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'INTEGRITY'));
			return company.body && company.body.indicator && company.body.indicator.integrityIndicatorCompositionScore ? [{content: Utils.roundValueTwoDecimals(company.body.indicator.integrityIndicatorCompositionScore).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Elementary Integrity Indicators',
		id: 'body.indicator.elementaryTransparencyIndicators',
		group: 'Integrity',
		sortBy: {
			id: 'body.indicator.elementaryTransparencyIndicators',
			ascend: false
		},
		format: (company, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'INTEGRITY'));
			return company.body && company.body.indicator && company.body.indicator.elementaryTransparencyIndicators && company.body.indicator.elementaryTransparencyIndicators.tender ? [{content: Utils.roundValueTwoDecimals(company.body.indicator.elementaryTransparencyIndicators.tender).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Transparency Indicator Composition Score',
		id: 'body.indicator.transparencyIndicatorCompositionScore',
		group: 'Transparency',
		sortBy: {
			id: 'body.indicator.transparencyIndicatorCompositionScore',
			ascend: false
		},
		format: (company, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'TRANSPARENCY'));
			return company.body && company.body.indicator && company.body.indicator.transparencyIndicatorCompositionScore ? [{content: Utils.roundValueTwoDecimals(company.body.indicator.transparencyIndicatorCompositionScore).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Elementary Integrity Indicators',
		id: 'body.indicator.elementaryIntegrityIndicators',
		group: 'Transparency',
		sortBy: {
			id: 'body.indicator.elementaryIntegrityIndicators',
			ascend: false
		},
		format: (company, library): Array<ITableCellLine> => {
			// return ColumnsFormatUtils.formatTenderIndicatorGroup(authority, library.indicators.find(group => group.id === 'TRANSPARENCY'));
			return company.body && company.body.indicator && company.body.indicator.elementaryIntegrityIndicators && company.body.indicator.elementaryIntegrityIndicators.tender ? [{content: Utils.roundValueTwoDecimals(company.body.indicator.elementaryIntegrityIndicators.tender).toString()}] : [{ content: '' }];
		}
	},
	{
		name: 'Award Decision Year',
		id: 'body.dates.awardDecisionYearsMinMax',
		group: 'Dates',
		sortBy: {
			id: 'body.dates.awardDecisionYearsMinMax',
			ascend: false
		},
		format: (company, library): Array<ITableCellLine> => [{content: company.body && company.body.dates && company.body.dates.awardDecisionYearsMinMax ? company.body.dates.awardDecisionYearsMinMax : ''}]
	},
	{
		name: 'Most frequent market',
		id: 'body.sector.mostFrequentMarket',
		group: 'Sector',
		sortBy: {
			id: 'body.sector.mostFrequentMarket',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => company.body.sector && company.body.sector.mostFrequentMarket && company.body.sector.mostFrequentMarket.label ?  [{content: company.body.sector.mostFrequentMarket.label }] : [{content: ''}]
	},
];

export const TenderColumns: Array<ITableColumnTender> = [
	{
		name: 'Supplier',
		id: 'lots.bids.bidders.name',
		group: 'Supplier',
		sortBy: {
			id: 'lots.bids.bidders.name.slug',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.lots) {
				return [];
			}
			let companies = {};
			tender.lots.forEach((lot: Lot, index_l: number) => {
				if (lot.bids) {
					lot.bids.forEach((bid: Bid) => {
						if (bid.bidders) {
							bid.bidders.forEach((bidder: Bidder) => {
								companies[bidder.id] = companies[bidder.name] || {bidder: bidder, lots: [], hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(bidder.name), link: '/company/' + bidder.id};
								companies[bidder.id].lots.push(index_l + 1);
							});
						}
					});
				}
			});
			let result: Array<ITableCellLine> = [];
			Object.keys(companies).forEach(key => {
				let c = companies[key];
				let prefix = undefined;
				if (tender.lots.length > 1) {
					if (c.lots.length > 5) {
						c.lots = c.lots.slice(0, 5);
						c.lots.push('…');
					}
					prefix = library.i18n.get('Lot') + ' ' + c.lots.join(',');
				}
				result.push({prefix: prefix, icon: ICON.company, content: library.i18n.nameGuard(c.bidder.name), hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(c.bidder.name), link: c.link});
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Buyer',
		id: 'buyers.name',
		group: 'Buyer',
		sortBy: {
			id: 'buyers.name.slug',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.buyers) {
				return [];
			}
			let result = tender.buyers.map((buyer: Buyer) => {
				return {icon: ICON.authority, content: library.i18n.nameGuard(buyer.name), hint: (library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(buyer.name)), link: '/authority/' + buyer.id};
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Buyer Region',
		id: 'buyer.address.ot.nutscode',
		group: 'Buyer',
		sortBy: {
			id: 'buyers.address.ot.nutscode',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.buyers) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			tender.buyers.forEach((buyer: Buyer) => {
				if (buyer.address && buyer.address.ot && buyer.address.ot.nutscode) {
					let nut = buyer.address.ot.nutscode;
					let city = buyer.address.city;
					result.push({icon: ICON.region, content: city, hint: library.i18n.get('Profile Page') + ' ' + city, link: '/region/' + nut});
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Good Procurement Score',
		id: 'indicators',
		group: 'Indicators',
		sortBy: {
			id: 'ot.score.TENDER',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.indicators) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			let collapseLines: Array<ITableCellLine> = [];
			tender.ot.scores.forEach(score => {
				if (score.status === 'CALCULATED' && score.type !== library.TENDER.id) {
					let group = library.indicators.find(g => g.id == score.type);
					if (group) {
						collapseLines.push({score: score.value, prefix: group.name, hint: group.name});
					}
				}
			});
			let tenderscore = tender.ot.scores.find(s => s.type === library.TENDER.id);
			if (tenderscore) {
				result.push({collapseName: library.TENDER.name, score: tenderscore.value, hint: library.TENDER.name, collapseLines: collapseLines, collapsed: true, align: 'center'});
			}
			return result;
		}
	},
	{
		name: 'Integrity Indicator',
		id: 'indicators.pii',
		group: 'Indicators',
		sortBy: {
			id: 'ot.score.INTEGRITY',
			ascend: false
		},
		format: (tender, library) => {
			return ColumnsFormatUtils.formatTenderIndicatorGroup(tender, library.indicators.find(group => group.id === 'INTEGRITY'));
		}
	},
	{
		name: 'Transparency Indicator',
		id: 'indicators.ti',
		group: 'Indicators',
		sortBy: {
			id: 'ot.score.TRANSPARENCY',
			ascend: false
		},
		format: (tender, library) => {
			return ColumnsFormatUtils.formatTenderIndicatorGroup(tender, library.indicators.find(group => group.id === 'TRANSPARENCY'));
		}
	},
	{
		name: 'Main Sector',
		id: 'cpvs.main.names',
		group: 'Sector',
		sortBy: {
			id: 'cpvs.code',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.cpvs) {
				return [];
			}
			return tender.cpvs.filter(cpv => cpv.isMain).map(cpv => {
				if (cpv['valid']) {
					return {content: cpv['name'] || cpv.code, hint: library.i18n.get('Profile Page') + ' ' + cpv['name'], link: '/sector/' + cpv.code};
				} else {
					return {content: (cpv['name'] || '') + ' ' + cpv.code};
				}
			});
		}
	},
	{
		name: 'Sectors',
		id: 'cpvs.names',
		group: 'Sector',
		sortBy: {
			id: 'cpvs.code',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.cpvs) {
				return [];
			}
			let result = tender.cpvs.map(cpv => {
				if (cpv['valid']) {
					return {list: true, content: cpv['name'] || cpv.code, hint: library.i18n.get('Profile Page') + ' ' + cpv['name'], link: '/sector/' + cpv.code};
				} else {
					return {list: true, content: (cpv['name'] || '') + ' ' + cpv.code};
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Main CPV Code',
		id: 'cpvs.main.codes',
		group: 'Sector',
		sortBy: {
			id: 'cpvs.code',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.cpvs) {
				return [];
			}
			let result = tender.cpvs.filter(cpv => cpv.isMain).map(cpv => {
				if (cpv['valid']) {
					return {content: cpv.code, hint: library.i18n.get('Profile Page') + ' ' + cpv['name'], link: '/sector/' + cpv.code};
				} else {
					return {content: cpv.code};
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'CPV Codes',
		id: 'cpvs.codes',
		group: 'Sector',
		sortBy: {
			id: 'cpvs.code',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.cpvs) {
				return [];
			}
			let result = tender.cpvs.map(cpv => {
				if (cpv['valid']) {
					return {list: true, content: cpv.code, hint: library.i18n.get('Profile Page') + ' ' + cpv['name'], link: '/sector/' + cpv.code};
				} else {
					return {list: true, content: cpv.code};
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Title',
		id: 'title',
		group: 'Tender',
		sortBy: {
			id: 'title.raw',
			ascend: true
		},
		format: (tender, library) => {
			return tender.title ? [{content: tender.title, link: '/tender/' + tender.id, hint: library.i18n.get('Profile Page') + ' ' + tender.title}] :
				[{icon: ICON.tender + ' icon-large', content: '', link: '/tender/' + tender.id, hint: library.i18n.get('Profile Page') + ' ' + tender.title}];
		}
	},
	{
		name: 'Procedure Type',
		id: 'procedureType',
		group: 'Tender',
		sortBy: {
			id: 'procedureType',
			ascend: true
		},
		format: tender => [{content: Utils.expandUnderlined(tender.procedureType)}]
	},
	{
		name: 'Supply Type',
		id: 'supplyType',
		group: 'Tender',
		sortBy: {
			id: 'supplyType',
			ascend: true
		},
		format: tender => [{content: Utils.expandUnderlined(tender.supplyType)}]
	},

	{
		name: 'Final Price',
		id: 'finalPrice',
		group: 'Prices',
		sortBy: {
			id: 'finalPrice.netAmountEur',
			ascend: false
		},
		format: (tender, library) => ColumnsFormatUtils.formatPriceEUR(tender.finalPrice, library)
	},
	{
		name: 'Award Decision Date',
		id: 'lots.awardDecisionDate',
		group: 'Dates',
		sortBy: {
			id: 'lots.awardDecisionDate',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.lots) {
				return [];
			}
			let dates = {};
			tender.lots.forEach((lot: Lot, index_l: number) => {
				if (lot.awardDecisionDate) {
					dates[lot.awardDecisionDate] = dates[lot.awardDecisionDate] || {date: lot.awardDecisionDate, lots: []};
					dates[lot.awardDecisionDate].lots.push(index_l + 1);
				}
			});
			let result: Array<ITableCellLine> = [];
			let datekeys = Object.keys(dates);
			datekeys.forEach(key => {
					let c = dates[key];
					if (c.lots.length > 5) {
						c.lots = c.lots.slice(0, 5);
						c.lots.push('…');
					}
					result.push({content: library.i18n.formatDate(c.date), hint: library.i18n.get('Lot') + ' ' + c.lots.join(',')});
				}
			);
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Call for tender date',
		id: 'publications.publicationDate',
		group: 'Dates',
		sortBy: {
			id: 'publications.publicationDate',
			ascend: false
		},
		format: (tender, library) => {
			// @ts-ignore
			if (!tender.publications) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			tender.publications.forEach(publication => {
				if (publication.publicationDate) {
					result.push({content: library.i18n.formatDate(publication.publicationDate), hint: 'Call for tender date'});
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Bid deadline',
		id: 'bidDeadline',
		group: 'Dates',
		sortBy: {
			id: 'bidDeadline',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.bidDeadline) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			result.push({content: library.i18n.formatDate(tender.bidDeadline), hint: 'Bid deadline'});
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Contract signature date',
		id: 'contractSignatureDate',
		group: 'Dates',
		sortBy: {
			id: 'contractSignatureDate',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.contractSignatureDate) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			result.push({content: library.i18n.formatDate(tender.contractSignatureDate), hint: 'Contract signature date'});
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Creation Date',
		id: 'created',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'created',
			ascend: false
		},
		format: (tender, library) => [{content: library.i18n.formatDatetime(tender.created)}]
	},
	{
		name: 'Modification Date',
		id: 'modified',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'modified',
			ascend: false
		},
		format: (tender, library) => [{content: library.i18n.formatDatetime(tender.modified)}]
	},
	{
		name: 'Country',
		id: 'country',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'country',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.country) {
				return [];
			}
			return [{content: library.i18n.expandCountry(tender.country)}];
		}
	},
	{
		name: 'Source',
		id: 'publications.source',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'publications.source',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.publications) {
				return [];
			}
			let result = [];
			tender.publications.forEach(pub => {
				if (pub.source && result.indexOf(pub.source) < 0) {
					result.push(pub.source);
				}
			});
			return result.map(s => {
				return {content: s};
			});
		}
	},
	{
		name: 'Bids Count',
		id: 'lots.bidsCount',
		group: 'Lots',
		sortBy: {
			id: 'lots.bidsCount',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.lots) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			tender.lots.forEach((lot: Lot, index_l: number) => {
				if (Utils.isDefined(lot.bidsCount)) {
					result.push({
						prefix: (tender.lots.length > 1) ? library.i18n.get('Lot') + ' ' + (index_l + 1) : undefined,
						content: lot.bidsCount.toString()
					});
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
];
