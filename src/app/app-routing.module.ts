import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListListsComponent } from './list-lists/list-lists.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: ListListsComponent },
  { path: 'itemlist/:id', component: ItemListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
