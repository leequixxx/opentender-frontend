import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INestedType, ISearchFilter, ISearchResultBucket} from '../../../../app.interfaces';
import {Utils} from '../../../../model/utils';
import {PlatformService} from '../../../../services/platform.service';
import {I18NService} from '../../../../modules/i18n/services/i18n.service';
import {NUTS_NAMES} from '../../../../model/nuts_names';

@Component({
	selector: 'search-list',
	templateUrl: 'search-list.component.html',
	styleUrls: ['search-list.component.scss'],
})
export class SearchListComponent {
	@Input() filter: ISearchFilter;
	@Output() public onChange = new EventEmitter();
	public selectedList = [];
	public showList = false;
	public searchValue = '';
	public Utils = Utils;
	public INestedType = INestedType;
	public CPVS = [{"key":"09","open":false,"name":"Petroleum products, fuel, electricity and other sources of energy - 09","children":[{"key":"091","open":false,"name":"Fuels - 091","children":[{"key":"09100","open":false,"name":"Uncategorized - 09100","children":[{"key":"09100000","open":false,"name":"Fuels - 09100000"}]}]}]},{"key":"14","open":false,"name":"Mining, basic metals and related products - 14","children":[{"key":"146","open":false,"name":"Metal ores and alloys - 146","children":[{"key":"14622","open":false,"name":"Uncategorized - 14622","children":[{"key":"146220007","open":false,"name":"Steel - 146220007"}]}]}]},{"key":"15","open":false,"name":"Food, beverages, tobacco and related products - 15","children":[{"key":"150","open":false,"name":"Uncategorized - 150","children":[{"key":"15000","open":false,"name":"Uncategorized - 15000","children":[{"key":"150000008","open":false,"name":"Food, beverages, tobacco and related products - 150000008"}]}]}]},{"key":"18","open":false,"name":"Clothing, footwear, luggage articles and accessories - 18","children":[{"key":"183","open":false,"name":"Garments - 183","children":[{"key":"18331","open":false,"name":"Uncategorized - 18331","children":[]}]}]},{"key":"22","open":false,"name":"Printed matter and related products - 22","children":[{"key":"220","open":false,"name":"Uncategorized - 220","children":[{"key":"22000","open":false,"name":"Uncategorized - 22000","children":[{"key":"220000000","open":false,"name":"Printed matter and related products - 220000000"}]}]},{"key":"222","open":false,"name":"Newspapers, journals, periodicals and magazines - 222","children":[{"key":"22200","open":false,"name":"Uncategorized - 22200","children":[{"key":"222000002","open":false,"name":"Newspapers, journals, periodicals and magazines - 222000002"}]}]},{"key":"223","open":false,"name":"Postcards, greeting cards and other printed matter - 223","children":[{"key":"22300","open":false,"name":"Uncategorized - 22300","children":[{"key":"223000003","open":false,"name":"Postcards, greeting cards and other printed matter - 223000003"}]}]}]},{"key":"30","open":false,"name":"Office and computing machinery, equipment and supplies except furniture and software packages - 30","children":[{"key":"301","open":false,"name":"Office machinery, equipment and supplies except computers, printers and furniture - 301","children":[{"key":"30100","open":false,"name":"Uncategorized - 30100","children":[{"key":"301000000","open":false,"name":"Office machinery, equipment and supplies except computers, printers and furniture - 301000000"}]},{"key":"30120","open":false,"name":"Photocopying and offset printing equipment - 30120","children":[{"key":"301200006","open":false,"name":"Photocopying and offset printing equipment - 301200006"}]},{"key":"30192","open":false,"name":"Uncategorized - 30192","children":[{"key":"301927008","open":false,"name":"Stationery - 301927008"}]}]},{"key":"302","open":false,"name":"Computer equipment and supplies - 302","children":[{"key":"30200","open":false,"name":"Uncategorized - 30200","children":[{"key":"302000001","open":false,"name":"Computer equipment and supplies - 302000001"}]}]}]},{"key":"31","open":false,"name":"Electrical machinery, apparatus, equipment and consumables; lighting - 31","children":[{"key":"310","open":false,"name":"Uncategorized - 310","children":[{"key":"31000","open":false,"name":"Uncategorized - 31000","children":[{"key":"310000006","open":false,"name":"Electrical machinery, apparatus, equipment and consumables; lighting - 310000006"}]}]},{"key":"316","open":false,"name":"Electrical equipment and apparatus - 316","children":[{"key":"31600","open":false,"name":"Uncategorized - 31600","children":[{"key":"316000002","open":false,"name":"Electrical equipment and apparatus - 316000002"}]}]}]},{"key":"32","open":false,"name":"Radio, television, communication, telecommunication and related equipment - 32","children":[{"key":"324","open":false,"name":"Networks - 324","children":[{"key":"32400","open":false,"name":"Uncategorized - 32400","children":[{"key":"324000007","open":false,"name":"Networks - 324000007"}]}]}]},{"key":"33","open":false,"name":"Medical equipments, pharmaceuticals and personal care products - 33","children":[{"key":"330","open":false,"name":"Uncategorized - 330","children":[{"key":"33000","open":false,"name":"Uncategorized - 33000","children":[{"key":"330000000","open":false,"name":"Medical equipments, pharmaceuticals and personal care products - 330000000"}]}]},{"key":"336","open":false,"name":"Pharmaceutical products - 336","children":[{"key":"33600","open":false,"name":"Uncategorized - 33600","children":[{"key":"336000006","open":false,"name":"Pharmaceutical products - 336000006"}]}]}]},{"key":"34","open":false,"name":"Transport equipment and auxiliary products to transportation - 34","children":[{"key":"341","open":false,"name":"Motor vehicles - 341","children":[{"key":"34100","open":false,"name":"Uncategorized - 34100","children":[{"key":"341000008","open":false,"name":"Motor vehicles - 341000008"}]}]},{"key":"343","open":false,"name":"Parts and accessories for vehicles and their engines - 343","children":[{"key":"34328","open":false,"name":"Uncategorized - 34328","children":[]}]},{"key":"349","open":false,"name":"Miscellaneous transport equipment and spare parts - 349","children":[{"key":"34980","open":false,"name":"Transport tickets - 34980","children":[{"key":"349800000","open":false,"name":"Transport tickets - 349800000"}]}]}]},{"key":"39","open":false,"name":"Furniture (incl. office furniture), furnishings, domestic appliances (excl. lighting) and cleaning products - 39","children":[{"key":"390","open":false,"name":"Uncategorized - 390","children":[{"key":"39000","open":false,"name":"Uncategorized - 39000","children":[{"key":"390000002","open":false,"name":"Furniture (incl. office furniture), furnishings, domestic appliances (excl. lighting) and cleaning products - 390000002"}]}]},{"key":"391","open":false,"name":"Furniture - 391","children":[{"key":"39110","open":false,"name":"Seats, chairs and related products, and associated parts - 39110","children":[{"key":"391100006","open":false,"name":"Seats, chairs and related products, and associated parts - 391100006"}]}]},{"key":"398","open":false,"name":"Cleaning and polishing products - 398","children":[{"key":"39800","open":false,"name":"Uncategorized - 39800","children":[{"key":"398000000","open":false,"name":"Cleaning and polishing products - 398000000"}]}]}]},{"key":"42","open":false,"name":"Industrial machinery - 42","children":[{"key":"421","open":false,"name":"Machinery for the production and use of mechanical power - 421","children":[{"key":"42120","open":false,"name":"Pumps and compressors - 42120","children":[{"key":"421200006","open":false,"name":"Pumps and compressors - 421200006"}]}]}]},{"key":"43","open":false,"name":"Machinery for mining, quarrying, construction equipment - 43","children":[{"key":"431","open":false,"name":"Mining equipment - 431","children":[{"key":"43100","open":false,"name":"Uncategorized - 43100","children":[{"key":"431000004","open":false,"name":"Mining equipment - 431000004"}]}]}]},{"key":"45","open":false,"name":"Construction work - 45","children":[{"key":"450","open":false,"name":"Uncategorized - 450","children":[{"key":"45000","open":false,"name":"Uncategorized - 45000","children":[{"key":"450000007","open":false,"name":"Construction work - 450000007"}]}]},{"key":"452","open":false,"name":"Works for complete or part construction and civil engineering work - 452","children":[{"key":"45200","open":false,"name":"Uncategorized - 45200","children":[{"key":"452000009","open":false,"name":"Works for complete or part construction and civil engineering work - 452000009"}]},{"key":"45231","open":false,"name":"Uncategorized - 45231","children":[{"key":"452310005","open":false,"name":"Construction work for pipelines, communication and power lines - 452310005"}]},{"key":"45233","open":false,"name":"Uncategorized - 45233","children":[{"key":"452331419","open":false,"name":"Road-maintenance works - 452331419"}]},{"key":"45250","open":false,"name":"Construction works for plants, mining and manufacturing and for buildings relating to the oil and gas industry - 45250","children":[{"key":"452500004","open":false,"name":"Construction works for plants, mining and manufacturing and for buildings relating to the oil and gas industry - 452500004"}]},{"key":"45251","open":false,"name":"Uncategorized - 45251","children":[{"key":"452511411","open":false,"name":"Geothermal power station construction work - 452511411"}]}]},{"key":"453","open":false,"name":"Building installation work - 453","children":[{"key":"45340","open":false,"name":"Fencing, railing and safety equipment installation work - 45340","children":[{"key":"453400002","open":false,"name":"Fencing, railing and safety equipment installation work - 453400002"}]}]}]},{"key":"48","open":false,"name":"Software package and information systems - 48","children":[{"key":"488","open":false,"name":"Information systems and servers - 488","children":[{"key":"48800","open":false,"name":"Uncategorized - 48800","children":[{"key":"488000006","open":false,"name":"Information systems and servers - 488000006"}]}]}]},{"key":"50","open":false,"name":"Repair and maintenance services - 50","children":[{"key":"501","open":false,"name":"Repair, maintenance and associated services of vehicles and related equipment - 501","children":[{"key":"50100","open":false,"name":"Uncategorized - 50100","children":[{"key":"501000006","open":false,"name":"Repair, maintenance and associated services of vehicles and related equipment - 501000006"}]}]}]},{"key":"55","open":false,"name":"Hotel, restaurant and retail trade services - 55","children":[{"key":"551","open":false,"name":"Hotel services - 551","children":[{"key":"55100","open":false,"name":"Uncategorized - 55100","children":[{"key":"551000001","open":false,"name":"Hotel services - 551000001"}]},{"key":"55120","open":false,"name":"Hotel meeting and conference services - 55120","children":[{"key":"551200007","open":false,"name":"Hotel meeting and conference services - 551200007"}]}]},{"key":"555","open":false,"name":"Canteen and catering services - 555","children":[{"key":"55520","open":false,"name":"Catering services - 55520","children":[{"key":"555200001","open":false,"name":"Catering services - 555200001"}]}]}]},{"key":"63","open":false,"name":"Supporting and auxiliary transport services; travel agencies services - 63","children":[{"key":"630","open":false,"name":"Uncategorized - 630","children":[{"key":"63000","open":false,"name":"Uncategorized - 63000","children":[{"key":"630000009","open":false,"name":"Supporting and auxiliary transport services; travel agencies services - 630000009"}]}]}]},{"key":"66","open":false,"name":"Financial and insurance services - 66","children":[{"key":"660","open":false,"name":"Uncategorized - 660","children":[{"key":"66000","open":false,"name":"Uncategorized - 66000","children":[{"key":"660000000","open":false,"name":"Financial and insurance services - 660000000"}]}]},{"key":"661","open":false,"name":"Banking and investment services - 661","children":[{"key":"66171","open":false,"name":"Uncategorized - 66171","children":[{"key":"661710009","open":false,"name":"Financial consultancy services - 661710009"}]}]}]},{"key":"71","open":false,"name":"Architectural, construction, engineering and inspection services - 71","children":[{"key":"713","open":false,"name":"Engineering services - 713","children":[{"key":"71300","open":false,"name":"Uncategorized - 71300","children":[{"key":"713000001","open":false,"name":"Engineering services - 713000001"}]}]}]},{"key":"72","open":false,"name":"IT services: consulting, software development, Internet and support - 72","children":[{"key":"720","open":false,"name":"Uncategorized - 720","children":[{"key":"72000","open":false,"name":"Uncategorized - 72000","children":[{"key":"720000005","open":false,"name":"IT services: consulting, software development, Internet and support - 720000005"}]}]},{"key":"722","open":false,"name":"Software programming and consultancy services - 722","children":[{"key":"72200","open":false,"name":"Uncategorized - 72200","children":[{"key":"722000007","open":false,"name":"Software programming and consultancy services - 722000007"}]}]}]},{"key":"79","open":false,"name":"Business services: law, marketing, consulting, recruitment, printing and security - 79","children":[{"key":"797","open":false,"name":"Investigation and security services - 797","children":[{"key":"79710","open":false,"name":"Security services - 79710","children":[{"key":"797100004","open":false,"name":"Security services - 797100004"}]}]},{"key":"798","open":false,"name":"Printing and related services - 798","children":[{"key":"79800","open":false,"name":"Uncategorized - 79800","children":[{"key":"798000002","open":false,"name":"Printing and related services - 798000002"}]}]}]},{"key":"80","open":false,"name":"Education and training services - 80","children":[{"key":"800","open":false,"name":"Uncategorized - 800","children":[{"key":"80000","open":false,"name":"Uncategorized - 80000","children":[{"key":"800000004","open":false,"name":"Education and training services - 800000004"}]}]}]},{"key":"90","open":false,"name":"Sewage, refuse, cleaning and environmental services - 90","children":[{"key":"909","open":false,"name":"Cleaning and sanitation services - 909","children":[{"key":"90910","open":false,"name":"Cleaning services - 90910","children":[{"key":"909100009","open":false,"name":"Cleaning services - 909100009"}]}]}]},{"key":"98","open":false,"name":"Other community, social and personal services - 98","children":[{"key":"983","open":false,"name":"Miscellaneous services - 983","children":[{"key":"98390","open":false,"name":"Other services - 98390","children":[{"key":"983900003","open":false,"name":"Other services - 983900003"}]}]}]}];

	constructor(private platform: PlatformService, public i18n: I18NService) {
	}

	public triggerChange(resize?: boolean) {
		this.onChange.next('');
		this.onChange.emit();

		if (resize && this.platform.isBrowser) {
			Utils.triggerResize();
		}
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

	public getNutsTitle(key) {
		return NUTS_NAMES[key.toUpperCase()] || key;
	}

	public toggleListVisibility() {
		this.showList = !this.showList;
	}

	public removeItems() {
		Object.keys(this.filter.enabled).forEach(i => this.filter.enabled[i] = false);
		this.triggerChange();
		this.closeShowList();
	}

	public closeShowList() {
		this.showList = false;
	}

	public nestedFormat(buckets) {
		if (!this.filter.def.nestedType) {
			return buckets
		}
		buckets.sort((a, b) => a.key.localeCompare(b.key))

		if (this.filter.def.nestedType === INestedType.nuts) {
			return this.parseByNutsLvl(buckets, 2, 1).map(lvl1 => ({ ...lvl1, children: this.parseByNutsLvl(lvl1.children, 3, 2).map(lvl2 => ({ ...lvl2, children: this.parseByNutsLvl(lvl2.children, 4, 3) })) }))
		} else if (this.filter.def.nestedType === INestedType.cpv) {
			return this.CPVS;
		}

		return buckets;
	}

	public toggleSubList(bucket): void {
		bucket.currentTarget.classList.toggle('open')
	}

	public trackByKey(bucket) {
		return bucket.key;
	}

	private parseByNutsLvl(arr, ind, level) {
		const result = [];
		for (let i = 0; i < 10; i++) {
			const filteredByThirdChar = arr.filter(b => b.key[ind] == i);
			if (!filteredByThirdChar.length) { continue; }

			result.push({
				level,
				key: filteredByThirdChar[0].key.substring(0, ind + 1),
				name: this.getNutsTitle(filteredByThirdChar[0].key.substring(0, ind + 1)),
				children: level === 3 ? null : filteredByThirdChar });
		}
		return result;
	}

	get filteredList() {
		return this.searchValue ? this.nestedFormat(this.filter.buckets.filter(b => this.getValueTitle(b, this.filter).toLowerCase().includes(this.searchValue.toLowerCase()))) : this.nestedFormat(this.filter.buckets)
	}
}
