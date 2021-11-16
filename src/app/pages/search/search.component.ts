import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {I18NService} from '../../modules/i18n/services/i18n.service';
import {IBreadcrumb} from '../../app.interfaces';
import {TitleService} from '../../services/title.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	moduleId: __filename,
	selector: 'search',
	template: '<breadcrumb [crumbs]="crumbs"></breadcrumb><router-outlet></router-outlet>',
	styleUrls: ['search.component.scss']
})
export class SearchPage implements OnDestroy {
	public crumbs: Array<IBreadcrumb> = [];
	public subscription: Subscription;

	constructor(private router: Router, private i18n: I18NService, private titleService: TitleService) {
		this.buildCrumbs();
		this.subscription = this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				this.buildCrumbs();
			}
		});
	}

	public buildCrumbs(): void {
		this.crumbs = [{ name: this.i18n.get('Search') }];
		const data = this.titleService.getRouteData(this.router.url);
		if (data) {
			this.crumbs.push({ name: this.i18n.get(data.menu_title || data.title) });
		}
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
