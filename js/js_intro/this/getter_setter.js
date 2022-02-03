

class ListInts{
   data=[1,2,3,4,5]
   get stuff(){
     return this.data
   }
   set stuff(x){
     this.data = x
   }
}

l = new ListInts()
console.log(l.stuff)
l.stuff=[4,4,4]
console.log(l.stuff)

class ListString{
  data=["a","b"]
  print_this(){
    console.log(this)
  }
}

ls = new ListString()
console.log(ls.data)
ls.data=["d"]
console.log(ls.data)
ls.print_this()



