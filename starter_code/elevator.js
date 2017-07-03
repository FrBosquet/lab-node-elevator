const UP = 'up';
const DOWN = 'down';

class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.waitingList = [];
    this.passengers = [];
    this.requests = [];
    this.direction = 'none';
    this.interval = undefined;
  }

  start() {
    this.stop();
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  update() {
    this.checkFloor();
    switch (this.direction) {
      case UP:
        this.floorUp();
        break;
      case DOWN:
        this.floorDown();
        break;
    }
    this.log();
  }

  checkFloor() {
    this.checkWaitingList();
    this.checkPassengersList();

    if (this.floor === this.requests[0])
      this.requests.shift();
  }

  checkWaitingList() {
    this.waitingList = this.waitingList.filter((passenger) => {
      let inFloor = passenger.originFloor === this.floor;
      if (inFloor) this._passengersEnter(passenger);
      return !inFloor;
    });
  }

  checkPassengersList() {
    this.passengers = this.passengers.filter((passenger) => {
      let inFloor = passenger.destinationFloor === this.floor;
      if (inFloor) this._passengersLeave(passenger);
      return !inFloor;
    });
  }

  _passengersEnter(passenger) {
    console.log(`>> ${passenger.name} has enter the elevator`);
    this.passengers.push(passenger);
    this.requests.push(passenger.destinationFloor);
  }

  _passengersLeave(passenger) {
    console.log(`<< ${passenger.name} has left the elevator`);
    this.decideDirection();
  }

  floorUp() {
    this.floor < this.MAXFLOOR && this.floor++;
  }

  floorDown() {
    this.floor > 0 && this.floor--;
  }

  decideDirection() {
    let destinationFloor = this.requests[0];
    if (destinationFloor) {
      this.direction = destinationFloor > this.floor ? UP : DOWN;
    } else {
      this.stop();
    }
  }

  call(person) {
    console.log(`${person.name} just called at floor ${person.originFloor}`);
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
    this.decideDirection();
    this.start();
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
