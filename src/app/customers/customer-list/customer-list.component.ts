import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';
  private customersSub: Subscription;

  public readonly columns: ThfTableColumn = [
    { property: 'name' },
    { property: 'nickname' },
  ];

  public customers: Array<any> = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.customersSub = this.httpClient.get(this.url)
      .subscribe((response: { hasNext: boolean, items: Array<any>}) => {
        this.customers = response.items;
      });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

}
