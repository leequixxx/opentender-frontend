import {SimulationNodeDatum} from 'd3-force';

export interface IAxisSettings {
	show: boolean;
	showLabel?: boolean;
	autoSize?: boolean;
	label?: string;
	defaultHeight?: number;
	defaultWidth?: number;
	maxLength?: number;
	minInterval?: number;
	tickFormatting?: (val: number | Date | string) => string;
}

export interface IColorSet {
	domain: Array<string>;
	getColor?: (value: string | number | Date) => string;
}

export interface IChartData {
	name: string | Date;
	value?: number;
	series?: Array<IChartData>;
	id?: string;
	color?: string;
	invalid?: boolean;
}

export interface IChartDimension {
	height?: number;
	width?: number;
}

export interface IChartView {
	fixed?: IChartDimension;
	def: IChartDimension;
	min?: IChartDimension;
	max?: IChartDimension;
}

export interface IChartNode extends SimulationNodeDatum {
	id: string;
	name: string;
	value: number;
}

export interface IChartLink {
	source: string;
	target: string;
	value: number;
}

export interface IChartLegendSettings {
	show?: boolean;
	title: string;
}

export interface IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	valueFormatting?: (val: number | Date | string) => string;
	legend?: IChartLegendSettings;
}

export interface IChartFlowChartSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	links: Array<IChartLink>;
}

export interface IChartGaugeSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;

	min: number;
	max: number;
	units: string;
	showAxis: boolean;
	bigSegments?: number;
	smallSegments?: number;
	startAngle?: number;
	angleSpan?: number;
	previousValue?: number;
}

export interface IChartXYAxisSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	valueFormatting?: (val: number | Date | string) => string;

	xAxis: IAxisSettings;
	yAxis: IAxisSettings;
	showGridLines: boolean;
	gradient: boolean;
}

export interface IChartBarsSettings extends IChartXYAxisSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	xAxis: IAxisSettings;
	yAxis: IAxisSettings;
	showGridLines: boolean;
	gradient: boolean;
	valueFormatting?: (val: number | Date | string) => string;

	chartType?: string; // standard | stacked | normalized
}

export interface IChartPieSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;

	labels: boolean;
	explodeSlices: boolean;
	doughnut: boolean;
	gradient: boolean;
}

export interface IChartPieSeriesSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;

	labels: boolean;
	maxRadius?: number;
	maxValue?: number;
}

export interface IChartRadarSettings extends IChartBaseSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;

	labels: boolean;
	maxRadius?: number;
	maxValue?: number;
}

export interface IChartLineSettings extends IChartXYAxisSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	xAxis: IAxisSettings;
	yAxis: IAxisSettings;
	showGridLines: boolean;
	gradient: boolean;

	autoScale: boolean;
	timeline: boolean;
}

export interface IChartAreaSettings extends IChartXYAxisSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	xAxis: IAxisSettings;
	yAxis: IAxisSettings;
	showGridLines: boolean;
	gradient: boolean;

	timeline: boolean;
}

export interface IChartHeatmapSettings extends IChartXYAxisSettings {
	view: IChartView;
	schemeType: string;
	colorScheme: IColorSet;
	customColors?: any;
	legend?: IChartLegendSettings;
	xAxis: IAxisSettings;
	yAxis: IAxisSettings;
	showGridLines: boolean;
	gradient: boolean;
}

export interface IChartFlowChart {
	data: Array<IChartNode>;
	chart: IChartFlowChartSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartHeatmap {
	data: Array<IChartData>;
	chart: IChartHeatmapSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartBar {
	data: Array<IChartData>;
	chart: IChartBarsSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartPie {
	data: Array<IChartData>;
	chart: IChartPieSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartRadar {
	data: Array<IChartData>;
	weights_data: Array<IChartData>;
	chart: IChartRadarSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartPieSeries {
	data: Array<IChartData>;
	chart: IChartPieSeriesSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartArea {
	chart: IChartLineSettings;
	data: Array<IChartData>;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartLine {
	chart: IChartLineSettings;
	data: Array<IChartData>;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}

export interface IChartTreeMap {
	data: Array<IChartData>;
	chart: IChartBaseSettings;
	select?: (event) => void;
	onLegendLabelClick?: (event) => void;
}
