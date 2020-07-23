import { parkingService } from './../parking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-view-page',
  templateUrl: './parking-view-page.component.html',
  styleUrls: ['./parking-view-page.component.css']
})
export class ParkingViewPageComponent implements OnInit {

  public carDetails =[];
  public displayCar:boolean= true;
  public moneyCollected : number=0;
  public displayAmountAlert :boolean= true;
  public filterContent : boolean =false;
  public myColor :string;
  public totalParkingSlots :number;
  public availableSlots :number;

  public dateTime ;

  constructor(private parkService : parkingService) {
    this.parkService.currentMessage.subscribe(slots => this.totalParkingSlots = slots);
    this.parkService.updatedMessage.subscribe(parkedCars => this.availableSlots = parkedCars);
   }

  ngOnInit() {
    this.carDetails = this.parkService.getCarDetails();
    this.dateTime = Date.now();
  }

  addMyCar(){
    this.displayCar = false;
    this.parkService.parkNewCarModal.next(false);
  }

  removeCar(CarNo){
    this.moneyCollected = this.moneyCollected+ 20; 
    this.parkService.removeCar(CarNo);
  }

  getQueryData(){
    this.displayAmountAlert = false;
    setTimeout( () =>{
      this.displayAmountAlert = true;
    },3000);
  }

  searchOrReset(e){
    if(e.target.id == "search"){
        this.filterContent = true;
    }
    else{
      this.filterContent = false;
    }
  }

  availableCar(){
    this.parkService.availableCars();
  }

}
