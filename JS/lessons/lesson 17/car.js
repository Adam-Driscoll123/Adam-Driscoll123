class Car {
  brand;
  model;
  speed = 0;

  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  displayInfo() {
    console.log(`Brand: ${this.brand}\nModel: ${this.model}\nCurrent speed: ${this.speed}km/h`)
  }

  

  go(){
    
    (this.speed<200) ? this.speed+=5 : console.log("You have reached max speed");
    this.displayInfo();
    
  }
  brake(){
    (this.speed>0) ? this.speed-=5 : console.log("Car is not moving");
    this.displayInfo();
  }

}

car1 = new Car("Toyota", "Corolla");
car2 = new Car("Ford", "Focus");


