//create class Person using prototype test for all objects

function Person(name){
    this.name=name;
}

Person.prototype.get_name(){
    return this.name;
}

let b = new Person('bob');
console.log(b.get_name());
