class Test{
    constructor(a,b){
      this.a=a;
      this.b=b;
    }

    render(Date){
      this.date = Date; //when is this a good idea? keep on adding to this? 
      console.log(Date);
    }
    foo(){
      console.log(this.date);
    }
}

t = new Test(10,20);
t.render("1/2/2020");
t.foo();

function foo() {
    console.log(this);
  }
   
  // caller activates "foo" (callee) and
  // provides "this" for the callee
   
  foo(); // global object
  foo.prototype.constructor(); // foo.prototype
   
  var bar = {
    baz: foo
  };
   
  bar.baz(); // bar
   
  (bar.baz)(); // also bar
  (bar.baz = bar.baz)(); // but here is global object
  (bar.baz, bar.baz)(); // also global object
  (false || bar.baz)(); // also global object
   
  var otherFoo = bar.baz;
  otherFoo(); // again global object

  console.log("---------");
  function foo() {
    console.log(this);
  }
   
  foo(); // global
   
  console.log(foo === foo.prototype.constructor); // true
   
  // but with another form of the call expression
  // of the same function, this value is different
   
  foo.prototype.constructor(); // foo.prototype