import { HomeComponent } from './home/home.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { CandyMachineComponent } from './candy-machine/candy-machine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'candy-machine',
    component: CandyMachineComponent
  },
  {
    path: 'elevator',
    component: ElevatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
