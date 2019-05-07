import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnDestroy, OnInit {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';

  private action: string = actionInsert;
  private customerSub: Subscription;
  private paramsSub: Subscription;

  public readonly genreOptions: Array<ThfSelectOption> = [
    { label: 'Feminino', value: 'Female' },
    { label: 'Masculino', value: 'Male' },
    { label: 'Outros', value: 'Other' }
  ];

  public customer: any = { };

  constructor(
    private thfNotification: ThfNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/customers');
  }

  save() {
    const customer = {...this.customer};

    customer.status = customer.status ? 'Active' : 'Inactive';

    this.customerSub = this.httpClient.post(this.url, customer).subscribe(() => {
      this.thfNotification.success('Cliente cadastrado com sucesso');

      this.router.navigateByUrl('/customers');
    });
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizando dados do cliente' : 'Novo cliente';
  }

  private loadData(id) {
    this.customerSub = this.httpClient.get(`${this.url}/${id}`)
      .subscribe(response => this.customer = response);
  }

}
