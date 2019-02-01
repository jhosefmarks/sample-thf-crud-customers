import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { ThfComboOption } from '@totvs/thf-ui/components/thf-field';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal';
import { ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  private readonly url: string = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';
  private customersSub: Subscription;
  private page: number = 1;
  private searchTerm: string = '';

  public readonly cityOptions: Array<ThfComboOption> = [
    { label: 'Araquari', value: 'Araquari' },
    { label: 'Belém', value: 'Belém' },
    { label: 'Campinas', value: 'Campinas' },
    { label: 'Curitiba', value: 'Curitiba' },
    { label: 'Joinville', value: 'Joinville' },
    { label: 'Osasco', value: 'Osasco' },
    { label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
    { label: 'São Bento', value: 'São Bento' },
    { label: 'São Francisco', value: 'São Francisco' },
    { label: 'São Paulo', value: 'São Paulo' }
  ];

  public readonly columns: Array<ThfTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'nickname', label: 'Apelido' },
    { property: 'email', label: 'E-mail', type: 'link', action: this.sendMail.bind(this) },
    { property: 'birthdate', label: 'Nascimento', type: 'date', format: 'dd/MM/yyyy', width: '100px' },
    { property: 'genre', label: 'Gênero', type: 'subtitle', width: '80px', subtitles: [
      { value: 'Female', color: 'color-05', content: 'F', label: 'Feminino' },
      { value: 'Male', color: 'color-02', content: 'M', label: 'Masculino' },
      { value: 'Other', color: 'color-08', content: 'O', label: 'Outros' },
    ]},
    { property: 'city', label: 'Cidade' },
    { property: 'status', type: 'label', labels: [
      { value: 'Active', color: 'success', label: 'Ativo' },
      { value: 'Inactive', color: 'danger', label: 'Inativo' }
    ]}
  ];

  public readonly filter: ThfPageFilter = {
    action: this.onActionSearch.bind(this),
    advancedAction: this.openAdvancedFilter.bind(this),
    ngModel: 'searchTerm',
    placeholder: 'Pesquisar por ...'
  };

  public customers: Array<any> = [];
  public hasNext: boolean = false;
  public loading: boolean = true;

  @ViewChild('advancedFilter') advancedFilter: ThfModalComponent;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

  openAdvancedFilter() {
    this.advancedFilter.open();
  }

  showMore() {
    this.loadData({ page: ++this.page, search: this.searchTerm });
  }

  private loadData(params: { page?: number, search?: string } = { }) {
    this.loading = true;

    this.customersSub = this.httpClient.get(this.url, { params: <any>params })
      .subscribe((response: { hasNext: boolean, items: Array<any>}) => {
        this.customers = !params.page || params.page === 1
          ? response.items
          : [...this.customers, ...response.items];
        this.hasNext = response.hasNext;
        this.loading = false;
      });
  }

  private onActionSearch() {
    this.page = 1;
    this.loadData({ search: this.searchTerm });
  }

  private sendMail(email, customer) {
    const body = `Olá ${customer.name}, gostariamos de agradecer seu contato.`;
    const subject = 'Contato';

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
  }

}
