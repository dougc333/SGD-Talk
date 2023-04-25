//await no work

arr = [1,2,3]
arr1 = [4,5,6]

arr_iter = arr.values()
arr1_iter = arr1.values()

data=[]
data1 = []
console.log(arr_iter.next())
console.log(arr_iter.next())
console.log(arr_iter.next())
console.log(arr_iter.next())

arr_iter =  arr.values()
arr1_iter = arr1.values()

//this iterates without capturing the value
first = await arr_iter.next()
second = await arr1_iter.next()
while(first.done!==true) {
  //console.log(arr_iter.next().value)
  data.push( await first.value, await second.value)
  first = await arr_iter.next()
  second = await arr1_iter.next()
}

console.log(data)
