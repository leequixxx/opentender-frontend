import {NgModule} from '@angular/core';
import {routing} from './search.routing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchPage} from './search.component';
import {SearchTenderPage} from './tender/tender.component';
import {SearchCompanyPage} from './company/company.component';
import {SearchAuthorityPage} from './authority/authority.component';
import {SearchBoxComponent} from './components/searchbox/searchbox.component';
import {AutoCompleteComponent} from './components/autocomplete/autocomplete.component';
import {ValueInputComponent} from './components/value-input/value-input.component';
import {SelectDateFilterComponent} from './components/date-filter/select-date-filter-component';
import {SelectScoreRangeFilterComponent} from './components/score-range/select-score-range-filter.component';
import {SelectYearRangeFilterComponent} from './components/year-range/select-year-range-filter.component';
import {MyDatePickerModule} from 'mydatepicker';
import {TableModule} from '../../modules/tables/table.module';
import {DialogModule} from '../../modules/dialog/dialog.module';
import {I18nModule} from '../../modules/i18n/i18n.module';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {SliderModule} from '../../modules/slider/silder.module';
import {TypeaheadModule} from '../../thirdparty/typeahead/typeahead.module';
import {SearchSectorPage} from './sector/sector.component';
import {GraphsBarModule} from '../../modules/graphs/bar/graphs-bar.module';
import {SelectVizButtonComponent} from './components/select-viz-button/select-viz-button.component';
import {GraphsHeatMapGridModule} from '../../modules/graphs/heatmap-grid/graphs-heatmap-grid.module';
import {SelectSearchButtonComponent} from './components/select-search-button/select-search-button.component';
import {BreadcrumbModule} from '../../modules/breadcrumb/breadcrumb.module';
import {SearchListComponent} from './components/search-list/search-list.component';
import {SearchListCheckbox} from './components/search-list-checkbox/search-list-checkbox';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		routing,
		MyDatePickerModule,
		I18nModule,
		TableModule,
		PipesModule,
		GraphsBarModule,
		GraphsHeatMapGridModule,
		BreadcrumbModule,
		TypeaheadModule,
		SliderModule,
		DialogModule
	],
	declarations: [
		SearchPage,
		SearchTenderPage,
		SearchCompanyPage,
		SearchAuthorityPage,
		SelectVizButtonComponent,
		SelectYearRangeFilterComponent,
		SelectScoreRangeFilterComponent,
		SelectDateFilterComponent,
		SelectSearchButtonComponent,
		SearchBoxComponent,
		SearchListComponent,
		SearchSectorPage,
		AutoCompleteComponent,
		ValueInputComponent,
		SearchListCheckbox
	],
	exports: [
		SearchPage,
		SearchTenderPage,
		SearchCompanyPage,
		SearchAuthorityPage,
		SelectVizButtonComponent,
		SelectYearRangeFilterComponent,
		SelectScoreRangeFilterComponent,
		SelectDateFilterComponent,
		SelectSearchButtonComponent,
		SearchBoxComponent,
		SearchListComponent,
		SearchSectorPage,
		AutoCompleteComponent,
		ValueInputComponent,
		SearchListCheckbox
	]
})
export class SearchModule {
}
