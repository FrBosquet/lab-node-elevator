const Elevator = require('./elevator.js');
const Person = require('./person.js');

var elevator = new Elevator();
elevator.call(new Person('Robert', 8, 3));
elevator.call(new Person('Albert', 1, 0));
elevator.call(new Person('Emilia', 3, 9));
elevator.call(new Person('Lola', 4, 10));
elevator.call(new Person('Juanjo', 0, 10));
elevator.call(new Person('Simon', 5, 3));
elevator.call(new Person('Laura', 9, 2));
