import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';

  public customer: any = { };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  save() {
    this.httpClient.post(this.url, this.customer);
  }

}
