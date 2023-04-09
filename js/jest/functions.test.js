const functions = require('./functions/functions');

test('adds 2 numbers', ()=>{
    expect(functions.add(1,2)).toBe(3)
})

test('adds 2 numbers', ()=>{
    expect(functions.add(1,2)).not.toBe(44)
})

test("should be null matcher toBeNull",()=>{
    expect(functions.returnNull()).toBeNull()
})

test("should be null matcher toBe with null as parameter",()=>{
    expect(functions.returnNull()).toBe(null)
})

test("should be undefined using toBe(undefined)",()=>{
    expect(functions.returnUndefined()).toBe(undefined)
})


test("should be undefined using not.toBeDefined",()=>{
    expect(functions.returnUndefined()).not.toBeDefined()
})

test("should be NaN using toBe and NaN in args",()=>{
    expect(functions.returnNaN()).toBe(NaN)
})

test("should be NaN using toBeNaN",()=>{
    expect(functions.returnNaN()).toBeNaN()
})
