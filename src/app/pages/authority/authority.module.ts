import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {routing} from './authority.routing';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {DialogModule} from '../../modules/dialog/dialog.module';
import {BodiesModule} from '../../modules/bodies/bodies.module';
import {AuthorityPage} from './authority.component';
import {MapsModule} from '../../modules/maps/maps.module';
import {TableModule} from '../../modules/tables/table.module';
import {GraphsBarModule} from '../../modules/graphs/bar/graphs-bar.module';
import {GraphsBarGroupedModule} from '../../modules/graphs/bar-grouped/graphs-bar-grouped.module';
import {LoadingModule} from '../../modules/loading/loading.module';
import {BreadcrumbModule} from '../../modules/breadcrumb/breadcrumb.module';
import {InfoButtonModule} from '../../modules/info-button/info-button.module';
import {GraphsRadarPieModule} from '../../modules/graphs/radar-pie/graphs-radar-pie.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		PipesModule,
		GraphsBarModule,
		GraphsBarGroupedModule,
		BreadcrumbModule,
		MapsModule,
		TableModule,
		LoadingModule,
		DialogModule,
		BodiesModule,
		InfoButtonModule,
		GraphsRadarPieModule,
		routing
	],
	declarations: [
		AuthorityPage
	]
})
export class AuthorityModule {
}
