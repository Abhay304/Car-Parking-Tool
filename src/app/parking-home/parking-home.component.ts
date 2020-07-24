import { parkingService } from './../parking.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parking-home',
  templateUrl: './parking-home.component.html',
  styleUrls: ['./parking-home.component.css']
})
export class ParkingHomeComponent implements OnInit {

  constructor(private router : Router, private parkSerice :parkingService) { }

  ngOnInit() {
  }

  onSubmit(formValue:NgForm){
    
    let totalParkingPlace = parseInt(formValue.value.parkingPlace);
    let parkedCars = parseInt(formValue.value.parkedCars);
    
    if(formValue.value.parkingPlace =="" || formValue.value.parkedCars == ""){
      alert('Fill all required Details to submit');
      return null;
    }else if (parkedCars > totalParkingPlace){
      alert('Number of Car Parked cannot be greater than Number of Pakring Place');
      formValue.reset();
      return null;
    }
    else{
      this.parkSerice.totalSlotsfn(totalParkingPlace);
      this.parkSerice.availableSlotsfn(totalParkingPlace-parkedCars);
      this.router.navigate(["/parking-View"]);
    }

  }

}
