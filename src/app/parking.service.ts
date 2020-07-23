import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class parkingService {

  constructor() { }
  
  parkNewCarModal = new Subject<boolean>();
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  private alreadyParkedCar = new BehaviorSubject(0);
  updatedMessage = this.alreadyParkedCar.asObservable();

  public availableSlots:number;
  public totalSlots:number;

  changeMessage(slots: number) {
    this.messageSource.next(slots);
    
  }

  parkedslots(slots: number) {
    this.alreadyParkedCar.next(slots);
  }

  public parkedCarDetails =[
    {'Slno':1,'CarNo' :'KA-GH-7789' ,'Color' :'red','Date': Date.now()},
    {'Slno':2,'CarNo' :'KA-90-HJHD' ,'Color' :'blue','Date': Date.now()},
    {'Slno':3,'CarNo' :'KA-8HD-HJJ' ,'Color' :'black','Date': Date.now()},
    {'Slno':4,'CarNo' :'KA-HJJH-88' ,'Color' :'white' ,'Date' : Date.now()}
  ]

  getCarDetails(){
    
    return this.parkedCarDetails;
  }

  parkNewCar(carNo :string , color:string){

    this.updatedMessage.subscribe(value =>{
      this.availableSlots = value;
    });

    this.currentMessage.subscribe(value =>{
      this.totalSlots = value;
    });

    if(this.availableSlots >= this.totalSlots){
      alert('Slots are full');
      return null;
    }

    var dataFeed ={
      "Slno": this.parkedCarDetails.length+1,
      "CarNo":carNo.toLowerCase(),
      "Color" :color.toLowerCase(),
      "Date" :Date.now()
    }
    let UpdatedSlot = this.availableSlots+1;
    this.parkedslots(UpdatedSlot);
    this.parkedCarDetails.push(dataFeed);
  } 

  removeCar(CarNo){
    this.updatedMessage.subscribe(value =>{
      this.availableSlots = value;
    });

    let UpdatedSlot = this.availableSlots-1;
    this.parkedslots(UpdatedSlot);
    let index = this.parkedCarDetails.findIndex(e => e.CarNo == CarNo);
    if(index !== -1){
      this.parkedCarDetails.splice(index,1);
    }
  }

  availableCars(){
    this.updatedMessage.subscribe(value =>{
      this.availableSlots = value;
    });
  }
  
}
