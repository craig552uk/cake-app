import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeListComponent } from './cake-list/cake-list.component';
import { CakeNewComponent } from './cake-new/cake-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CakeListComponent },
  { path: 'new', component: CakeNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
