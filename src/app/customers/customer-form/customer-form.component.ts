import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfNotificationService } from '@totvs/thf-ui';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnDestroy, OnInit {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';
  private customerSub: Subscription;

  public customer: any = { };

  constructor(
    private thfNotification: ThfNotificationService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }

  ngOnInit() { }

  save() {
    this.customerSub = this.httpClient.post(this.url, this.customer).subscribe(() => {
      this.thfNotification.success('Cliente cadastrado com sucesso');

      this.router.navigateByUrl('/customers');
    });
  }

}
