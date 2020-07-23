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
    
    let carsparked = parseInt(formValue.value.parkedCars);
    let parkingPlaces = parseInt(formValue.value.parkingPlace);

    if(formValue.value.parkingPlace =="" || formValue.value.parkedCars == ""){
      alert('Fill all required Details to submit');
      return null;
    }else if (carsparked > parkingPlaces){
      alert('Number of Car Parked cannot be greater than Number of Pakring Place');
      formValue.reset();
      return null;
    }
    else{
      this.parkSerice.changeMessage(parkingPlaces);
      this.parkSerice.parkedslots(carsparked);
      this.router.navigate(["/parking-View"]);
    }

  }

}
