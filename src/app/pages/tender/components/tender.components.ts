import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
/// <reference path="./model/tender.d.ts" />
import Body = Definitions.Body;
import Address = Definitions.Address;
import Price = Definitions.Price;
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';

@Component({
	moduleId: __filename,
	selector: 'collapse-expand',
	template: `
		<span *ngIf="o" class="link-no_under" i18n-title title="Click to hide/show this section" (click)="o.open=!o.open">{{o.label}} <i class="icon-chevron-down"
																																		 [ngClass]="{'icon-chevron-down':!o.open,'icon-chevron-up':o.open}"></i></span>
	`
})
export class CollapseExpandComponent {
	@Input()
	public o: { open: boolean; label: string };
}

@Component({
	moduleId: __filename,
	selector: 'tender-body-address',
	styleUrls: ['../tender.component.scss'],
	template: `
		<div *ngIf="address">
			<div *ngIf="address.street | defined" class="info__row-label">{{address.street}}</div>
			<div *ngIf="(address.postcode||address.city) | defined" class="info__row-label"><span *ngIf="address.postcode | defined">{{address.postcode}}, </span>{{address.city}}</div>
			<div *ngIf="(address.ot?address.ot.nutscode:null) | defined" class="info__row-label"><a class="info__row-link" [routerLink]="['/region/'+address.ot.nutscode]">{{nutsCode}}</a></div>
			<div *ngIf="address.country | defined" class="info__row-label">{{address.country | expandCountry}}</div>
		</div>
	`
})
export class TenderBodyAddressComponent {
	@Input() public address: Address;
	public nutsCode = '';
	private subscription: Subscription;
	constructor(private route: ActivatedRoute, private api: ApiService) {}

	ngOnInit(): void {
		this.subscription = this.route.params.subscribe(params => {
			let sub = this.api.getNutsNames().subscribe(
				(result) => {
					this.nutsCode = this.address && this.address.ot && this.address.ot.nutscode ? result[this.address.ot.nutscode] : '';
				},
				(error) => {
					this.nutsCode = `NUTS ${this.address && this.address.ot && this.address.ot.nutscode ? this.address.ot.nutscode : ''}`;
				},
				() => {
					sub.unsubscribe();
				});
		});
	}
}

@Component({
	moduleId: __filename,
	selector: 'tender-body',
	styleUrls: ['../tender.component.scss'],
	template: `
		<div *ngIf="body" class="info__content">
			<div class="info__row" *ngIf="link">
				<span class="info__row-label">Buyer name:</span>
				<a  class="info__row-link" routerLink="{{link}}"><i *ngIf="icon" class="{{icon}} info__row-icon"></i>{{body.name | nameGuard}}</a>
			</div>
			<div class="info__row" *ngIf="!link">
				<span class="info__row-label">{{body.name | nameGuard}}</span>
			</div>
			<div class="info__row" *ngIf="body.buyerType">
				<span class="info__row-label">{{ body.buyerType | expandUnderlined }}</span>
			</div>
			<div class="info__row" *ngIf="body.bidderType">
				<span class="info__row-label">{{ body.bidderType | expandUnderlined }}</span>
			</div>
			<div class="info__row" *ngIf="body.bodyIds">
				<span class="info__row-label" *ngFor="let bodyId of body.bodyIds">{{ bodyId.type | expandUnderlined }}: {{ bodyId.id }}</span>
			</div>
			<div class="info__row" *ngIf="body.address">
				<tender-body-address [address]="body.address"></tender-body-address>
			</div>
		</div>
	`
})
export class TenderBodyComponent {
	@Input()
	public body: Body;
	@Input()
	public link: string;
	@Input()
	public icon: string;
}

@Component({
	moduleId: __filename,
	selector: 'tender-lot-body',
	styleUrls: ['../tender.component.scss'],
	template: `
		<div *ngIf="body" class="info__content">
			<div class="info__row" *ngIf="link">
				<span class="info__row-label">Bidder name:</span>
				<a  class="info__row-link" routerLink="{{link}}"><i *ngIf="icon" class="{{icon}} info__row-icon"></i>{{body.name | nameGuard}}</a>
			</div>
			<div class="info__row" *ngIf="!link">
				<span class="info__row-label">{{body.name | nameGuard}}</span>
			</div>
			<div class="info__row" *ngIf="body.bidderType">
				<span class="info__row-label">{{ body.bidderType | expandUnderlined }}</span>
			</div>
			<div class="info__row" *ngIf="body.bodyIds">
				<span class="info__row-label" *ngFor="let bodyId of body.bodyIds">{{ bodyId.type | expandUnderlined }}: {{ bodyId.id }}</span>
			</div>
			<div class="info__row" *ngIf="body.address">
				<tender-body-address [address]="body.address"></tender-body-address>
			</div>
		</div>
	`
})
export class TenderLotBodyComponent {
	@Input()
	public body: Body;
	@Input()
	public link: string;
	@Input()
	public icon: string;
}

@Component({
	moduleId: __filename,
	selector: 'tender-supplier-body',
	styleUrls: ['../tender.component.scss'],
	template: `
		<div *ngIf="body" class="info__content">
			<div class="info__row" *ngIf="link">
				<span class="info__row-label">Supplier name:</span>
				<a  class="info__row-link" routerLink="{{link}}"><i *ngIf="icon" class="{{icon}} info__row-icon"></i>{{body.name | nameGuard}}</a>
			</div>
			<div class="info__row" *ngIf="!link">
				<span class="info__row-label">{{body.name | nameGuard}}</span>
			</div>
			<div class="info__row" *ngIf="body.bidderType">
				<span class="info__row-label">{{ body.bidderType | expandUnderlined }}</span>
			</div>
			<div class="info__row" *ngIf="body.bodyIds">
				<span class="info__row-label" *ngFor="let bodyId of body.bodyIds">{{ bodyId.type | expandUnderlined }}: {{ bodyId.id }}</span>
			</div>
			<div class="info__row" *ngIf="body.address">
				<span class="info__row-label">{{ body.address }}</span>
			</div>
		</div>
	`
})

export class TenderSupplierBodyComponent {
	@Input()
	public body: Body;
	@Input()
	public link: string;
	@Input()
	public icon: string;
}
@Component({
	moduleId: __filename,
	selector: 'tender-body-line',
	styleUrls: ['../tender.component.scss'],
	template: `<span class="info__row">
		<span *ngIf="body" class="info__row-label">
			<a class="info__row-link" *ngIf="link" routerLink="{{link}}"><i *ngIf="icon" class="{{icon}} info__row-icon"></i> {{body.name | nameGuard}}</a>
			<span *ngIf="!link">{{body.name}}</span>
			<span *ngIf="body.address && body.address.city | defined">, {{body.address.city}}</span>
		</span>
	</span>`
})
export class TenderBodyLineComponent {
	@Input()
	public body: Body;
	@Input()
	public link: string;
	@Input()
	public icon: string;
}

@Component({
	moduleId: __filename,
	selector: 'tender-price',
	styleUrls: ['../tender.component.scss'],
	template: `<span *ngIf="price" class="info__row">
	<div *ngIf="price.netAmountNational | defined" class="info__row-value"><span>(national)</span> <span>{{price.currencyNational | formatCurrency}}</span> {{price.netAmountNational | formatCurrencyValue}}</div>
	<div *ngIf="price.vat | defined" class="info__row-value"><span>(VAT)</span> {{price.vat}}%</div>
</span>`
})
export class TenderPriceComponent implements OnChanges {
	@Input()
	public price: Price;

	public ngOnChanges(changes: SimpleChanges): void {

	}
}
