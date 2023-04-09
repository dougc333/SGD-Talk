const functions = require('./functions/functions');

test('adds 2 numbers', ()=>{
    expect(functions.add(1,2)).toBe(3)
})

test('adds 2 numbers', ()=>{
    expect(functions.add(1,2)).not.toBe(44)
})

