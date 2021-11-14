import {
	IStatsAuthorities,
	IStatsCompanies,
	IStatsCpvs,
	IStatsIndicators,
	IStatsInYears, IStatsPcCpvs,
	IStatsPcPricesLotsInYears
} from '../app.interfaces';
import {IChartData} from '../thirdparty/ngx-charts-universal/chart.interface';

export type VizType = {
	scores: {
		score_in_years: { data: IStatsInYears, title?: string };
		score_in_sectors: { data: IStatsCpvs, title?: string };
		terms_indicators_score: { data: IStatsIndicators, title?: string };
		score: { data: Array<IChartData>, title?: string };
		years: { data: Array<number>, title?: string };
	},
	ranges: {
		top_companies: { data: { absolute: IStatsCompanies, volume: IStatsCompanies }, title?: string };
		top_authorities: { data: { absolute: IStatsAuthorities, volume: IStatsAuthorities }, title?: string };
		lots_in_years: { data: IStatsPcPricesLotsInYears, title?: string };
		cpvs_codes: { data: IStatsPcCpvs, title?: string };
	}
}

export const VIZ_DEFAULT_DATA = {
	scores: {
		score_in_years: {data: null},
		score_in_sectors: {data: null},
		score: {data: null},
		terms_indicators_score: {data: null},
		years: {data: null}
	},
	ranges: {
		top_companies: {data: null},
		top_authorities: {data: null},
		lots_in_years: {data: null},
		cpvs_codes: {data: null},
	}
}

export const DASHBOARD_CHART_TITLES = {
	transparency: {
		averageScoreOverTime: 'Spending within the Selected Transparency Score Range '
	},
	integrity: {
		averageScoreOverTime: 'Spending within the selected Integrity Score range '
	}
}

export const DASHBOARD_TOOLTIPS = {
	transparency: {
		adjustWeights: [
			'Select individual transparency indicators or view the overall score. You can edit how the score is composed by changing the weight of the individual transparency indicators and the "Average Score of Transparency Indicators" will be recalculated using those new weights.',
			'For example, if you think that it is more important that bidder names are published while the publication of committee approval dates might be less important, you can adjust the weight of the latter indicator to 5 and it\'s score will only count half as much as the others.'
		],
		averageScoreOfIndicators: [
			'The Average Score of Transparency Indicators figure shows the share of available key fields during the selected time period.',
			'For example, an average score of 90 means that 90% of the key fields (covered by the individual transparency indicators) were available in the source data during the selected time period.'
		],
		averageScoreOverTime: [
			'The Average Score of Transparency Indicators over Time figure shows the share of available key fields during the selected time period by years.',
			'For example, an average score of 90 means that 90% of the key fields (covered by the individual transparency indicators) were available in the source data in that year.'
		],
		averageScorePerSector: [
			'Sector-wise average of the Transparency Score. Click on any of the bars to get more details on the sector. Contracts are categorized into sectors by defining product markets (CPV codes) based on the contract information. See more on the details of contract categorization and the CPV nomenclature in the Data Explainer on the About page.',
		],
	},
	integrity: {
		adjustWeights: [
			'Select individual integrity indicators or view the overall score. You can edit how the score is composed by changing the weight of the individual indicators and the "Average Score of Integrity Indicators" will be recalculated using those new weights.',
			'For example, if you think that the length of the advertisement period is not as important as the other indicators, you can adjust the weight of the latter indicator to 5 and it\'s score will only count half as much as the others. Or if you want exclude some indicators entirely and only keep those most important to you, e.g. to see the combined score for the prevalence of single bidding and non-open procedure types, you can adjust the weight of all other indicators to 0.'
		],
		averageScoreOfIndicators: [
			'The Average Score of Integrity Indicators shows the average of the individual Integrity Indicators for all contracts during the selected time period. The average score can be refined/recalculated by selecting only certain individual integrity indicators and adding unique weights to them.',
			'For example, an average score of 40 means that only 40% of the key integrity dimensions showed no risks (covered by the individual integrity indicators) based on all contracts awarded during the selected time period.'
		],
		averageScoreOverTime: [
			'The Average Score of Integrity Indicators over Time figure shows the average of the individual Integrity Indicators for all contracts during the selected time period by years.',
			'For example, an average score of 40 means that only 40% of the key integrity dimensions showed no risks (covered by the individual integrity indicators) based on all contracts awarded during the selected time period.'
		],
		averageScorePerSector: [
			'Sector-wise average of the Integrity Score. Click on any of the bars to get more details on the sector. Contracts are categorized into sectors by defining product markets (CPV codes) based on the contract information. See more on the details of contract categorization and the CPV nomenclature in the Data Explainer on the About page.'
		],
	},
}
