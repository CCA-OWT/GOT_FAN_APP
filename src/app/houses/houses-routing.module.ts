import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesComponent } from './houses.component';
import { HousesDetailComponent } from './houses-detail/houses-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HousesComponent
  },
  {
    path: ':id',
    component: HousesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule { }
