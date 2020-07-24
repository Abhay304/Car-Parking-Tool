import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class parkingService {

  constructor() { }
  
  parkNewCarModal = new Subject<boolean>();

  private totalSlots = new BehaviorSubject(0);
  totalSlotsMessage = this.totalSlots.asObservable();

  private availableSlots = new BehaviorSubject(0);
  availableSlotsMessage = this.availableSlots.asObservable();

  totalSlotsfn(slots: number) {
    this.totalSlots.next(slots);
  }

  availableSlotsfn(slots: number) {
    this.availableSlots.next(slots);
  }

  public parkedCarDetails  =[
    {'Slno':1,'CarNo' :'KA-GH-7789' ,'Color' :'RED','Slot':3,'Date': Date.now()},
    {'Slno':2,'CarNo' :'KA-90-HJHD' ,'Color' :'BLUE','Slot':4,'Date': Date.now()},
    {'Slno':3,'CarNo' :'KA-8HD-HJJ' ,'Color' :'BLACK','Slot':1,'Date': Date.now()},
    {'Slno':4,'CarNo' :'KA-HJJH-88' ,'Color' :'WHITE','Slot':2 ,'Date' : Date.now()},
    {'Slno':5,'CarNo' :'KA-K66G-88' ,'Color' :'RED','Slot':5 ,'Date' : Date.now()}
  ]

  getCarDetails(){
    return this.parkedCarDetails;
  }

  parkNewCar(carNo :string , color:string, slot:number){
    let availableSlots;
    this.availableSlotsMessage.subscribe(value =>{
      availableSlots = value;
    });

    if(availableSlots == 0){
      alert('Sorry! All Slots are full');
      return null;
    }

    var dataFeed ={
      "Slno": this.parkedCarDetails.length+1,
      "CarNo":carNo.toUpperCase(),
      "Color" :color.toUpperCase(),
      "Slot" :slot,
      "Date" :Date.now()
    }
    let UpdatedAvailableSlots = availableSlots-1;
    this.availableSlotsfn(UpdatedAvailableSlots);
    this.parkedCarDetails.push(dataFeed);
  } 

  removeCar(CarNo){
    let availableSlots;
    this.availableSlotsMessage.subscribe(value =>{
      availableSlots = value;
    });

    let UpdatedAvailableSlots = availableSlots+1;
    this.availableSlotsfn(UpdatedAvailableSlots);
    let index = this.parkedCarDetails.findIndex(e => e.CarNo == CarNo);
    if(index !== -1){
      this.parkedCarDetails.splice(index,1);
    }
  }
  
}
