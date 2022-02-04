

class Doggie{
  constructor(name){
    this.name=name,
    this.bark_sound='ruff ruff'
  }

  bark(){
    return this.bark_sound;
  }

  get name(){
    return this.name
  }

}

d=new Doggie('fido')

