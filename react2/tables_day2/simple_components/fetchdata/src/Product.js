import {useState, useEffect} from 'react'

function foo(){
var { products } =
    {
        "products": [
            {
                "name": "prod 1",
                "versions": [
                    "ver 1",
                    "ver 3"
                ]
            },
            {
                "name": "prod 2",
                "versions": [
                    "ver 1",
                    "ver 2"
                ]
            },
            {
                "name": "prod 3",
                "versions": [
                    "ver 1",
                    "ver 2"
                ]
            }
        ]
    };

  let inventory = products.reduce((accumulator, currentValue) => {
      let { name, versions } = currentValue;
      accumulator[name] = versions
      console.log("accumulator:",accumulator)
      return accumulator
  }, []);

console.log("accumulator inventory:",inventory)
  Object.entries(inventory).forEach((prod) => {
      let prodName = prod[0];
      let prodVers = prod[1].join(", ");
      console.log("prodName",prodName)
      console.log("prodVers",prodVers)
  });
}

foo();