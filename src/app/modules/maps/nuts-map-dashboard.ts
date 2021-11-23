import {Component, Input} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {IStatsNuts} from '../../app.interfaces';
import {NotifyService} from '../../services/notify.service';
import {I18NService} from '../i18n/services/i18n.service';
import {ConfigService} from '../../services/config.service';
import {PlatformService} from '../../services/platform.service';

@Component({
	moduleId: __filename,
	selector: 'dashboard-nutsmap',
	template: `
		<div class="graph-header">
			<div class="graph-title">
				{{title}}
				<info-button>
					<p><strong>Tenders per region</strong> The map shows the number of tenders, meaning finalised procurement processes. View their number across the whole country, or divided by regions. Click on one area to view more details on public procurement in that region.</p>
				</info-button>
			</div>
			<div class="graph-toolbar-container">
				<div class="graph-toolbar graph-toolbar-left">
					<button class="tool-button" [ngClass]="{down:!map_companies}" i18n>Tenders</button>
				</div>
				<div class="graph-toolbar graph-toolbar-right">
					<button class="tool-button" [ngClass]="{down:map_level==2}" (click)="setLevel(2)" i18n>Counties</button>
				</div>
			</div>
		</div>
		<graph nutsmap [data]="map_data" [level]="map_level" [title]="title"></graph>
	`
})
export class MapDashboardComponent {
	public map_level: number = 2;
	public map_companies: boolean = false;
	@Input() map_data: IStatsNuts = null;
	public formatTooltip: (featureProperties: any) => string;
	public loading: number = 0;
	public title: string = '';


	constructor(private api: ApiService, private notify: NotifyService, private i18n: I18NService, private config: ConfigService, private platform: PlatformService) {
		this.formatTooltip = this.formatTooltipCallback.bind(this);
		this.fillMap(this.map_level);
	}

	getTitle() {
		return this.map_companies ? this.i18n.get('Suppliers by Region') : this.i18n.get('Tenders by Region');
	}

	formatTooltipCallback(featureProperties) {
		return featureProperties.name + ': ' + featureProperties.value + ' ' + (this.map_companies ? this.i18n.get('Suppliers') : this.i18n.get('Buyers'));
	}

	fillMap(level) {
		this.title = this.getTitle();
		if (!this.platform.isBrowser) {
			return;
		}
	}

	setLevel(level) {
		this.map_level = level;
		// this.fillMap(level);
	}
}
