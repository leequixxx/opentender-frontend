import {CommonModule} from '@angular/common';
import {I18nModule} from '../../modules/i18n/i18n.module';
import {NgModule} from '@angular/core';
import {DialogModule} from '../../modules/dialog/dialog.module';
import {SliderModule} from '../../modules/slider/silder.module';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {TableModule} from '../../modules/tables/table.module';
import {DashboardsPage} from './dashboards.component';
import {DashboardsTransparencyPage} from './transparency/transparency.component';
import {DashboardsIntegrityPage} from './procurement-integrity/procurement-integrity.component';
import {DashboardsMarketAnalysisPage} from './market-analysis/market-analysis.component';
import {routing} from './dashboards.routing';
import {DashboardsIndicatorComponent} from './components/dashboard/indicator-dashboard.component';
import {SelectYearRangeModule} from '../../modules/select-year-range/select-year-range.module';
import {MapsModule} from '../../modules/maps/maps.module';
import {GraphsTreeMapModule} from '../../modules/graphs/tree-map/graphs-treemap.module';
import {GraphsBarModule} from '../../modules/graphs/bar/graphs-bar.module';
import {GraphsRadarPieModule} from '../../modules/graphs/radar-pie/graphs-radar-pie.module';
import {GraphsValuesGridModule} from '../../modules/graphs/values-grid/graphs-values-grid.module';
import {BreadcrumbModule} from '../../modules/breadcrumb/breadcrumb.module';
import {InfoButtonModule} from '../../modules/info-button/info-button.module';
import {SearchModule} from '../search/search.module';
import {MapDashboardComponent} from '../../modules/maps/nuts-map-dashboard';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		routing,
		I18nModule,
		TableModule,
		GraphsTreeMapModule,
		GraphsBarModule,
		GraphsRadarPieModule,
		GraphsValuesGridModule,
		BreadcrumbModule,
		PipesModule,
		SliderModule,
		DialogModule,
		SelectYearRangeModule,
		MapsModule,
		InfoButtonModule,
		SearchModule
	],
	declarations: [
		DashboardsIndicatorComponent,
		DashboardsPage,
		DashboardsIntegrityPage,
		DashboardsMarketAnalysisPage,
		DashboardsTransparencyPage,
		MapDashboardComponent
	]
})
export class DashboardsModule {
}
