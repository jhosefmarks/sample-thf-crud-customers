import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnDestroy, OnInit {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';

  private customer: any = {};
  private customerSub: Subscription;
  private paramsSub: Subscription;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => this.loadData(params['id']));
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.customerSub.unsubscribe();
  }

  private loadData(id) {
    this.customerSub = this.httpClient.get(`${this.url}/${id}`)
      .pipe(
        map((customer: any) => {
          const status = { Active: 'Ativo', Inactive: 'Inativo' };

          const genre = { Female: 'Feminino', Male: 'Masculino', Other: 'Outros' };

          customer.status = status[customer.status];
          customer.genre = genre[customer.genre];

          return customer;
        })
      )
      .subscribe(response => this.customer = response);
  }

}
