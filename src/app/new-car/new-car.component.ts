import { parkingService } from '../parking.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  public displayCar : boolean ;

  constructor(private parkService : parkingService ) { 
    this.parkService.parkNewCarModal.subscribe(modalView =>{
      this.displayCar = modalView;
    });
  }

  ngOnInit() {}

  park(newCar:NgForm){
    if(newCar.value.carNo =="" || newCar.value.color == "" || newCar.value.slot == ""){ 
      alert('Fill Car Details To Park Car');
      this.displayCar = true;
      return null;
    }
    let CarNo = newCar.value.carNo;
    let Color = newCar.value.color;
    let Slot = newCar.value.slot;
    this.parkService.parkNewCar(CarNo,Color,Slot);
    newCar.reset();
    this.displayCar = true;
  }

}
