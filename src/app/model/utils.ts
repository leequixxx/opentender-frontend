import * as moment from 'moment';
import {Consts} from './consts';
import {IChartData} from '../thirdparty/ngx-charts-universal/chart.interface';

export const Utils = {
	formatDatetime: (value: string): string => {
		if (!value || value.length === 0) {
			return '';
		}
		return moment(value).format('DD.MM.YYYY HH:mm');
	},
	formatDate: (value: string): string => {
		if (!value || value.length === 0) {
			return '';
		}
		return moment(value).format('DD.MM.YYYY');
	},
	dateToUnix: (jsdate: Date) => {
		return moment(jsdate).utc().valueOf();
	},
	formatCurrency: (value: string): string => {
		if (value === undefined || value === null) {
			return '';
		}
		value = value.toUpperCase();
		if (Consts.currencies[value]) {
			return Consts.currencies[value];
		}
		return value;
	},
	formatCurrencyValue: (value: number, fractionSize: number = 2): string => {
		if (value === undefined) {
			return '';
		}
		return Utils.formatValue(value);
	},
	formatCurrencyValueEUR: (value: number, fractionSize: number = 2): string => {
		if (value === undefined) {
			return '';
		}
		return '€ ' + Utils.formatValue(value);
	},
	expandUnderlined(value: string): string {
		if (value === undefined || value === null) {
			return '';
		}
		return value.split('_').map(t => {
			return t[0].toUpperCase() + t.slice(1).toLowerCase();
		}).join(' ');
	},
	capitalize(value: string): string {
		if (value === undefined || value === null) {
			return '';
		}
		return value[0].toUpperCase() + value.slice(1);
	},
	formatPercent(value): string {
		value = Math.round(value * 100) / 100;
		return value.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}) + '%';
	},
	validateNutsCode(code, level) {
		if (code.length > 1 && code.length < 6) {
			code = code.toUpperCase();
			if (code.match(/[A-Z]{2}[A-Z0-9]{0,3}/)) {
				return code.slice(0, 2 + level);
			}
		}
		return 'invalid';
	},
	formatTrunc(value): string {
		return value.toFixed(0);
	},
	formatYear(value): string {
		return value.toString();
	},
	formatValue(n: number): string {

		if (n === null || n === undefined) {
			return '';
		}
		if (n >= 1e6) {
			// http://bmanolov.free.fr/numbers_names.php
			const SI_PREFIXES = ['', 'Thousandth', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion',
				'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion',
				'Sexdecillion', 'Septdecillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion'];

			// https://stackoverflow.com/a/40724354
			// what tier? (determines SI prefix)
			let tier = Math.log10(n) / 3 | 0;

			// if zero, we don't need a prefix
			if (tier === 0) {
				return n.toLocaleString();
			}

			// get prefix and determine scale
			let prefix = SI_PREFIXES[tier];
			let scale = Math.pow(10, tier * 3);

			// scale the number
			let scaled = n / scale;

			// format number and add prefix as suffix
			return scaled.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' ' + prefix;
		}
		return n.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
	},
	seriesToTable(data: IChartData[], header, multi: boolean) {
		if (multi) {
			let list = data.map(d => {
				let row: Array<string | number | Date> = d.series.map(val => val.invalid ? 'NO DATA' : val.value);
				row.unshift(d.name);
				return row;
			});
			let head = data && data.length > 0 ? data[0].series.map(d => d.name) : [];
			head.unshift(header.name);
			let subhead = data && data.length > 0 ? data[0].series.map(d => header.value) : [];
			subhead.unshift('Value');
			list.unshift(subhead);
			return {rows: list, head: head};
		} else {
			let hasID = header.hasOwnProperty('id');
			let list = data.map(d => {
				return hasID ? [d.id, d.name, d.value] : [d.name, d.value];
			});
			return {rows: list, head: hasID ? [header.id, header.name, header.value] : [header.name, header.value]};
		}
	},
	downloadSeries: function(format, data, header, multi: boolean, exportfilename) {
		if (format === 'csv') {
			Utils.downloadCSVSeries(data, header, multi, exportfilename);
		} else if (format === 'json') {
			Utils.downloadJSON({fields: header, data: data}, exportfilename);
		}
	},
	downloadCSVSeries(data: IChartData[], header, multi: boolean, exportfilename: string) {
		let table = Utils.seriesToTable(data, header, multi);
		let list = [JSON.stringify(table.head)];
		table.rows.forEach(row => list.push(JSON.stringify(row)));
		let csv = list.join('\n').replace(/(^\[)|(\]$)/mg, ''); // remove opening [ and closing ] brackets from each line
		Utils.downloadCSV(csv, exportfilename);
	},
	downloadCSV: function(csvString, exportfilename) {
		Utils.downloadBlob(csvString, exportfilename, 'csv', 'text/csv;charset=utf8;');
	},
	downloadJSON: function(obj, exportfilename) {
		Utils.downloadBlob(JSON.stringify(obj, null, '\t'), exportfilename, 'json', 'application/json');
	},
	downloadBlob: function(string, exportfilename, ext, type) {
		const blob = new Blob([string], {'type': type});
		const filename = exportfilename.toLowerCase().replace(/ /g, '_') + '.' + ext;
		if (window.navigator.msSaveOrOpenBlob) { // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
			window.navigator.msSaveBlob(blob, filename);
		} else {
			const a = window.document.createElement('a');
			a.href = window.URL.createObjectURL(blob);
			a.download = filename;
			a.textContent = 'Download ' + filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	},
	cpv2color: function(cpv) {
		if (cpv.length == 2) {
			return Consts.colors.diverging[parseInt(cpv, 10)];
		}
		if (cpv.length == 3) {
			let i = parseInt(cpv.slice(2, 3), 10);
			let parentcolor = Utils.cpv2color(cpv.slice(0, 2));
			if (i === 0) {
				// zero id'd "child" is in fact the parent, so use that color
				return parentcolor;
			}
			if (Consts.colors.diverging[i] === parentcolor) {
				// switcheroo if using the same color as the parent
				return Consts.colors.diverging[0];
			}
			return Consts.colors.diverging[i];
		}
		if (cpv.length == 5) {
			let i = parseInt(cpv.slice(3, 5), 10);
			let parentcolor = Utils.cpv2color(cpv.slice(0, 3));
			if (i === 0) {
				return parentcolor;
			}
			if (Consts.colors.diverging[i] === parentcolor) {
				return Consts.colors.diverging[0];
			}
			return Consts.colors.diverging[i];
		}
		return '#fff';
	},
	roundValueTwoDecimals: (value) => {
		return Math.round(value * 100) / 100;
	},
	formatFileSize: (value: number) => {
		let i = -1;
		const byteUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		do {
			value = value / 1024;
			i++;
		} while (value > 1024);
		return Math.max(value, 0.1).toFixed(1) + ' ' + byteUnits[i];
	},
	scrollToFirst: (className: string) => {
		let elements = document.getElementsByClassName(className);
		if (elements.length == 0) {
			return;
		}
		elements[0].scrollIntoView();
	},
	triggerResize: () => {
		setTimeout(() => {
			let evt = window.document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}, 0);
	}
};
