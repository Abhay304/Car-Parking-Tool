import { parkingService } from './../parking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-view-page',
  templateUrl: './parking-view-page.component.html',
  styleUrls: ['./parking-view-page.component.css']
})
export class ParkingViewPageComponent implements OnInit {

  public carDetails =[];
  
  public myColor :string;
  public myCarNo : string;

  public totalParkingSlots :number;
  public availableSlots :number;
  public moneyCollected : number=0;

  public displayCar:boolean= true;
  public displayAmountAlert :boolean= true;
  public filterTableContent : boolean =false;

  constructor(private parkService : parkingService) {
    this.parkService.totalSlotsMessage.subscribe(slots => this.totalParkingSlots = slots);
    this.parkService.availableSlotsMessage.subscribe(slots => this.availableSlots = slots);
   }

  ngOnInit() {
    this.carDetails = this.parkService.getCarDetails();
  }

  // Add New car in the parking lot
  addMyCar(){
    this.displayCar = false;
    this.parkService.parkNewCarModal.next(false);
  }

  // Remove Car and Collect Money
  removeCar(carNo:number){
    this.moneyCollected = this.moneyCollected + 20; 
    this.parkService.removeCar(carNo);
  }

  // Alert mesasage for displaying money collected
  // Auto hide using setTimeout
  getQueryData(){
    this.displayAmountAlert = false;
    setTimeout( () =>{
      this.displayAmountAlert = true;
    },3000);
  }

  // Search OR Reset function
  //Click reset to Reset the Search
  searchOrReset(e){
    if(e.target.id == "search"){
        this.filterTableContent = true;
    }
    else if(e.target.id == "reset"){
      this.filterTableContent = false;
      this.myCarNo ="";
      this.myColor="";
    }
    else{
      this.filterTableContent = false;
    }
  }

  setTodefault(){
    // console.log(this.filterTableContent);
    this.filterTableContent = false;
  }
}
