import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '../search/search.module';
import { ListComponent } from './list.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    RouterModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
