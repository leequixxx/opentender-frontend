import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {routing} from './company.routing';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {DialogModule} from '../../modules/dialog/dialog.module';
import {BodiesModule} from '../../modules/bodies/bodies.module';
import {CompanyPage} from './company.component';
import {MapsModule} from '../../modules/maps/maps.module';
import {TableModule} from '../../modules/tables/table.module';
import {GraphsBarModule} from '../../modules/graphs/bar/graphs-bar.module';
import {GraphsBarGroupedModule} from '../../modules/graphs/bar-grouped/graphs-bar-grouped.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		PipesModule,
		GraphsBarModule,
		GraphsBarGroupedModule,
		MapsModule,
		TableModule,
		DialogModule,
		BodiesModule,
		routing
	],
	declarations: [
		CompanyPage
	]
})
export class CompanyModule {
}
