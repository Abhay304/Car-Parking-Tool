import { ParkingViewPageComponent } from './parking-view-page/parking-view-page.component';
import { ParkingHomeComponent } from './parking-home/parking-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'/parking-home', pathMatch:'full'},
  {path:'parking-home' , component : ParkingHomeComponent},
  {path:'parking-View' , component: ParkingViewPageComponent},
  {path:'**' , component: ParkingHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
