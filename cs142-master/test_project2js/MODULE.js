var module = (function(my){
    my.add_method = function(){
        Console.log("add_method");
    };

})(module);

function Person(name){
    this.name = name;
    function get_name(){
        return this.name;
    }
}

var bob = new Person('bob');
bob.module();
