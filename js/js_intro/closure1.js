//private funcitons wiht closuers and iife
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

var database=(function(){
    var _counter=0
    function change_counter(x){
        _counter+=x
    }

    return {
        increment:function(){
            change_counter(1)
        },
        decrement:function(){
            change_counter(-1)
        },
        get_counter(){
            return this._counter
        },
        set_counter(x){
            this._counter=x
        },
        print_counter(){
            console.log(this._counter)
        }
    }
})();

var db_no_iife=function(){
    var _counter=0
    function change_counter(x){
        _counter+=x
    }

    return {
        increment:function(){
            change_counter(1)
        },
        decrement:function(){
            change_counter(-1)
        },
        get_counter(){
            return _counter
        },
        set_counter(x){
            _counter=x
        },
        print_counter(){
            console.log(_counter)
        }
    }
};

db1= db_no_iife()
db2= db_no_iife()
//see db1 increment count
db1.print_counter()
db2.print_counter()
console.log("-----------")
db1.increment()
db1.print_counter()
//should see 100, independent of db1
db2.set_counter(100)
db2.print_counter()



