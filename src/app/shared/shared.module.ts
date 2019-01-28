import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ThfModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    ThfModule
  ]
})
export class SharedModule { }
