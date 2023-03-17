

export class Cow{
    name: string;

    constructor(name: string){
        this.name = name;
    }

    eat(){
        console.log(`${this.name} is eating`);
    }
}
