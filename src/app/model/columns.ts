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
	checkEntryCollapse: (list: Array<ITableCellLine>, library: ITableLibrary, amount: number = 10) => {
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
		name: 'City',
		id: 'body.address.city',
		group: 'Authority',
		sortBy: {
			id: 'body.address.city',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => authority.body && authority.body.address ? [{content: authority.body.address.city}] : []
	},
	{
		name: 'Country',
		id: 'body.address.country',
		group: 'Authority',
		sortBy: {
			id: 'body.address.country',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => authority.body && authority.body.address ? [{content: library.i18n.expandCountry(authority.body.address.country)}] : []
	},
	{
		name: 'Tender Count',
		id: 'count',
		group: 'Authority',
		sortBy: {
			id: 'count',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(authority.count)}]
	},
	{
		name: 'Main Activities',
		id: 'body.mainActivities',
		group: 'Authority',
		sortBy: {
			id: 'body.mainActivities',
			ascend: true
		},
		format: (authority, library): Array<ITableCellLine> => {
			return (authority.body.mainActivities || []).map(activity => {
				return {content: Utils.expandUnderlined(activity)};
			});
		}
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
	}
];

export const CompanyColumns: Array<ITableColumnCompany> = [
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
		name: 'City',
		group: 'Company',
		id: 'body.address.city',
		sortBy: {
			id: 'body.address.city',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => company.body && company.body.address ? [{content: company.body.address.city}] : []
	},
	{
		name: 'Country',
		group: 'Company',
		id: 'body.address.country',
		sortBy: {
			id: 'body.address.country',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => company.body && company.body.address ? [{content: library.i18n.expandCountry(company.body.address.country)}] : []
	},
	{
		name: 'Bid Count',
		id: 'count',
		group: 'Company',
		sortBy: {
			id: 'count',
			ascend: true
		},
		format: (company, library): Array<ITableCellLine> => [{content: library.i18n.formatValue(company.count)}]
	},
	{
		name: 'Profile Link',
		id: 'id',
		group: 'Company',
		format: (company, library) => [{icon: ICON.company + ' icon-large', content: '', link: '/company/' + company.body.id, hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(company.body.name), align: 'center'}]
	}
];

export const TenderColumns: Array<ITableColumnTender> = [
	{
		name: 'Tender Link',
		id: 'id',
		group: 'Tender',
		format: (tender, library) => [{icon: ICON.tender + ' icon-large', content: '', link: '/tender/' + tender.id, hint: library.i18n.get('Profile Page') + ' ' + tender.title, align: 'center'}]
	},
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
					if (tender.lots.length > 1) {
						if (c.lots.length > 5) {
							c.lots = c.lots.slice(0, 5);
							c.lots.push('…');
						}
						result.push({prefix: library.i18n.get('Lot') + ' ' + c.lots.join(',')});
					}
					result.push({icon: ICON.company, content: library.i18n.nameGuard(c.bidder.name), hint: library.i18n.get('Profile Page') + ' ' + library.i18n.nameGuard(c.bidder.name), link: c.link});
				}
			);
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Supplier Region',
		id: 'lots.bids.bidder.address.ot.nutscode',
		group: 'Supplier',
		sortBy: {
			id: 'lots.bids.bidder.address.ot.nutscode',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.lots) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			tender.lots.forEach((lot: Lot) => {
				if (lot.bids) {
					lot.bids.forEach((bid: Bid) => {
						if (bid.bidders) {
							bid.bidders.forEach((bidder: Bidder) => {
								if (bidder.address && bidder.address.ot && bidder.address.ot.nutscode) {
									let nut = bidder.address.ot.nutscode;
									result.push({icon: ICON.region, content: nut, hint: ('Region Page NUTS Code' + nut), link: '/region/' + nut});
								}
							});
						}
					});
				}
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
					result.push({icon: ICON.region, content: nut, hint: library.i18n.get('Profile Page') + ' NUTS ' + nut, link: '/region/' + nut});
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Administrators',
		id: 'administrators.name',
		group: 'Buyer',
		sortBy: {
			id: 'administrators.name.raw',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.administrators) {
				return [];
			}
			let result = tender.administrators.map((admin: Buyer) => {
				return {content: admin.name};
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Appeal Body Name',
		id: 'appealBodyName',
		group: 'Buyer',
		sortBy: {
			id: 'appealBodyName',
			ascend: true
		},
		format: tender => [{content: tender.appealBodyName}]
	},
	{
		name: 'Mediation Body Name',
		id: 'mediationBodyName',
		group: 'Buyer',
		sortBy: {
			id: 'mediationBodyName',
			ascend: true
		},
		format: tender => [{content: tender.mediationBodyName}]
	},
	{
		name: 'Good Procurement Score',
		id: 'indicators',
		group: 'Indicators',
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
		format: (tender, library) => {
			return ColumnsFormatUtils.formatTenderIndicatorGroup(tender, library.indicators.find(group => group.id === 'INTEGRITY'));
		}
	},
	{
		name: 'Transparency Indicator',
		id: 'indicators.ti',
		group: 'Indicators',
		format: (tender, library) => {
			return ColumnsFormatUtils.formatTenderIndicatorGroup(tender, library.indicators.find(group => group.id === 'TRANSPARENCY'));
		}
	},
	{
		name: 'Administrative Capacity Indicator',
		id: 'indicators.aci',
		group: 'Indicators',
		format: (tender, library) => {
			return ColumnsFormatUtils.formatTenderIndicatorGroup(tender, library.indicators.find(group => group.id === 'ADMINISTRATIVE'));
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
		name: 'EU-Fund',
		id: 'fundings.isEuFund',
		group: 'Funding',
		sortBy: {
			id: 'fundings.isEuFund',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.fundings) {
				return [];
			}
			let list = tender.fundings.filter(funding => funding.isEuFund);
			let result = list.map(funding => {
				return {list: list.length > 1, prefix: library.i18n.get('EU-Fund'), content: library.i18n.nameGuard(funding.programme)};
			});
			return ColumnsFormatUtils.checkEntryCollapse(ColumnsFormatUtils.sortListByContent(result), library);
		}
	},
	{
		name: 'Programme',
		id: 'fundings.programme',
		group: 'Funding',
		sortBy: {
			id: 'fundings.programme',
			ascend: true
		},
		format: (tender, library) => {
			if (!tender.fundings) {
				return [];
			}
			let list = tender.fundings.filter(funding => funding.programme);
			let result = list.map(funding => {
				return {list: list.length > 1, prefix: funding.isEuFund ? library.i18n.get('EU-Fund') : null, content: funding.programme};
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
		format: tender => [{content: tender.title}]
	},
	{
		name: 'Title English',
		id: 'titleEnglish',
		group: 'Tender',
		sortBy: {
			id: 'titleEnglish.raw',
			ascend: true
		},
		format: tender => [{content: tender.titleEnglish}]
	},
	{
		name: 'Description',
		id: 'description',
		group: 'Tender',
		sortBy: {
			id: 'description',
			ascend: true
		},
		format: tender => [{content: tender.description}]
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
		name: 'Estimated Price',
		id: 'estimatedPrice',
		group: 'Prices',
		sortBy: {
			id: 'estimatedPrice.netAmountEur',
			ascend: false
		},
		format: (tender, library) => ColumnsFormatUtils.formatPriceEUR(tender.estimatedPrice, library)
	},
	{
		name: 'Documents Price',
		id: 'documentsPrice',
		group: 'Prices',
		sortBy: {
			id: 'documentsPrice.netAmountEur',
			ascend: false
		},
		format: (tender, library) => ColumnsFormatUtils.formatPriceEUR(tender.documentsPrice, library)
	},
	{
		name: 'Bid Price',
		id: 'lots.bids.price',
		group: 'Prices',
		sortBy: {
			id: 'lots.bids.price.netAmountEur',
			ascend: false
		},
		format: (tender, library) => {
			if (!tender.lots) {
				return [];
			}
			let result: Array<ITableCellLine> = [];
			tender.lots.forEach((lot: Lot, index_l: number) => {
				if (lot.bids) {
					lot.bids.forEach((bid: Bid, index_b: number) => {
						if (bid.price && bid.price.netAmountEur) {
							result.push({
								prefix: (tender.lots.length ? library.i18n.get('Lot') + ' ' + (index_l + 1) : '') + (lot.bids.length > 1 ? ' ' + library.i18n.get('Bid') + ' ' + (index_b + 1) : ''),
								content: ColumnsFormatUtils.formatPriceEURValue(bid.price.netAmountEur, library)
							});
						}
					});
				}
			});
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Eligible Bid Languages',
		id: 'eligibleBidLanguages',
		group: 'Tender Requirements',
		sortBy: {
			id: 'eligibleBidLanguages',
			ascend: true
		},
		format: tender => {
			if (!tender.eligibleBidLanguages) {
				return [];
			}
			return tender.eligibleBidLanguages.map(lang => {
				return {content: lang};
			});
		}
	},
	{
		name: 'Deposits',
		id: 'deposits',
		group: 'Tender Requirements',
		sortBy: {
			id: 'deposits',
			ascend: true
		},
		format: tender => [{content: tender.deposits}]
	},
	{
		name: 'Personal Requirements',
		id: 'personalRequirements',
		group: 'Tender Requirements',
		sortBy: {
			id: 'personalRequirements',
			ascend: true
		},
		format: tender => [{content: tender.personalRequirements}]
	},
	{
		name: 'Economic Requirements',
		id: 'economicRequirements',
		group: 'Tender Requirements',
		sortBy: {
			id: 'economicRequirements',
			ascend: true
		},
		format: tender => [{content: tender.economicRequirements}]
	},
	{
		name: 'Technical Requirements',
		id: 'technicalRequirements',
		group: 'Tender Requirements',
		sortBy: {
			id: 'technicalRequirements',
			ascend: true
		},
		format: tender => [{content: tender.technicalRequirements}]
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
					result.push({content: Utils.formatDate(c.date), hint: library.i18n.get('Lot') + ' ' + c.lots.join(',')});
				}
			);
			return ColumnsFormatUtils.checkEntryCollapse(result, library);
		}
	},
	{
		name: 'Estimated Start Date',
		id: 'estimatedStartDate',
		group: 'Dates',
		sortBy: {
			id: 'estimatedStartDate',
			ascend: false
		},
		format: tender => [{content: Utils.formatDate(tender.estimatedStartDate)}]
	},
	{
		name: 'Estimated Completion Date',
		id: 'estimatedCompletionDate',
		group: 'Dates',
		sortBy: {
			id: 'estimatedCompletionDate',
			ascend: false
		},
		format: tender => [{content: Utils.formatDate(tender.estimatedCompletionDate)}]
	},
	{
		name: 'Bid Deadline',
		id: 'bidDeadline',
		group: 'Dates',
		sortBy: {
			id: 'bidDeadline',
			ascend: false
		},
		format: tender => [{content: Utils.formatDatetime(tender.bidDeadline)}]
	},
	{
		name: 'Documents Deadline',
		id: 'documentsDeadline',
		group: 'Dates',
		sortBy: {
			id: 'documentsDeadline',
			ascend: false
		},
		format: tender => [{content: Utils.formatDatetime(tender.documentsDeadline)}]
	},

	{
		name: 'Creation Date',
		id: 'created',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'created',
			ascend: false
		},
		format: tender => [{content: Utils.formatDatetime(tender.created)}]
	},
	{
		name: 'Modification Date',
		id: 'modified',
		group: 'Tender Meta Data',
		sortBy: {
			id: 'modified',
			ascend: false
		},
		format: tender => [{content: Utils.formatDatetime(tender.modified)}]
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
	}

];
