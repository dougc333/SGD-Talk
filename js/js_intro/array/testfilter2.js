const cand = [
    {
      name: 'Kevin',
      alter: 19,
    },
    {
      name: 'Walter',
      alter: 22,
    },
    {
      name: 'Herbert',
      alter: 28,
    },
    {
      name: 'Kristin',
      alter: 31,
    },
    {
      name: 'Obergine',
      alter: 39,
    },
    {
      name: 'Hailey',
      alter: 44,
    }
  ];

//return array with ones >40

cand.filter(x=> x.alter > 40 ? console.log(x.alter): null)
const result = cand.filter(x=>x.alter>40)
console.log("result:",result)
//depends on what you want.
console.log(typeof result)
