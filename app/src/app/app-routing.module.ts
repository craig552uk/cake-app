import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeListComponent } from './cake-list/cake-list.component';

const routes: Routes = [
  { path: 'list', component:CakeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
