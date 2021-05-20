import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeItemComponent } from './cake-item/cake-item.component';
import { CakeListComponent } from './cake-list/cake-list.component';
import { CakeNewComponent } from './cake-new/cake-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/cakes', pathMatch: 'full' },
  { path: 'cakes', component: CakeListComponent },
  { path: 'new', component: CakeNewComponent },
  { path: 'cakes/:id', component: CakeItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
