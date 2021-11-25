import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NUTSMapComponent} from './nuts-map.component';
import {MapVolumeComponent} from './nuts-map-volume.component';
import {MapPortalComponent} from './nuts-map-portal.component';
import {MapHomeComponent} from './nuts-map-home.component';
import {MapComponent} from './leaflet.component';
import {MapSuppliersComponent} from './nuts-map-supplier.component';
import {MapBuyersComponent} from './nuts-map-buyer.component';
import {PipesModule} from '../pipes/pipes.module';
import {RouterModule} from '@angular/router';
import {GraphFooterModule} from '../graph-footer/graph-footer.module';
import {NGXLeafletModule} from '../../thirdparty/ngx-leaflet/leaflet.module';
import {I18nModule} from '../i18n/i18n.module';
import {PageScrollModule} from '../page-scroll/page-scroll.module';
import {InfoButtonModule} from '../info-button/info-button.module';
import {NutsMapRegionComponent} from './nuts-map-region.component';

@NgModule({
	imports: [
		CommonModule,
		NGXLeafletModule,
		PipesModule,
		RouterModule,
		I18nModule,
		GraphFooterModule,
		PageScrollModule,
		InfoButtonModule
	],
	declarations: [
		MapComponent,
		NUTSMapComponent,
		MapHomeComponent,
		MapPortalComponent,
		MapSuppliersComponent,
		MapBuyersComponent,
		MapVolumeComponent,
		NutsMapRegionComponent,
	],
	exports: [
		MapComponent,
		NUTSMapComponent,
		NutsMapRegionComponent,
		MapHomeComponent,
		MapPortalComponent,
		MapSuppliersComponent,
		MapBuyersComponent,
		MapVolumeComponent,
	]
})
export class MapsModule {
}
