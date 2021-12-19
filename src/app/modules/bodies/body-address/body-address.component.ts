import {Component, Input} from '@angular/core';
import Address = Definitions.Address;
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';

@Component({
	moduleId: __filename,
	selector: 'body-address',
	template: `
		<div *ngIf="address">
			<div *ngIf="address.street | defined">{{address.street}}</div>
			<div *ngIf="(address.postcode||address.city) | defined"><span *ngIf="address.postcode | defined">{{address.postcode}}, </span>{{address.city}}</div>
			<div *ngIf="(address.ot?address.ot.nutscode:undefined) | defined"><a [routerLink]="['/region/'+address.ot.nutscode]">{{nutsCode}}</a></div>
			<div *ngIf="address.country | defined">{{address.country | expandCountry}}</div>
		</div>
	`
})
export class BodyAddressComponent {
	@Input() public address: Address;
	public nutsCode = '';
	private subscription: Subscription;
	constructor(private route: ActivatedRoute, private api: ApiService) {}

	ngOnInit(): void {
		this.subscription = this.route.params.subscribe(params => {
			let sub = this.api.getNutsNames().subscribe(
				(result) => {
					this.nutsCode = result[this.address.ot.nutscode];
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
