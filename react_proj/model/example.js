
var models;

if (models === undefined) {
   models = {};
}

models.exampleModel = function() {
   return {
      name: 'Doug Chang',
      motto: 'Fee Fi Fo Fum'
   };
};

models.protein_data = ()=>{
    return{
        config: {
            domains: [
                {
                    start: 1,
                    end: 400,
                    domain: {
                        name: "PF0022",
                        id: 1,
                        description: "Lorem ipsum stuff"
                    },
                    source: {
                        name: "Pfam",
                        href: null,
                        id: 1
                    }
                },
                {
                    start: 145,
                    end: 340,
                    domain: {
                        name: "PF0023",
                        id: 2
                    },
                    source: {
                        name: "Pfam",
                        href: null,
                        id: 1
                    }
                },
                {
                    start: 245,
                    end: 540,
                    domain: {
                        name: "Some23",
                        id: 3
                    },
                    source: {
                        name: "Panther",
                        href: null,
                        id: 2
                    }
                }
            ],
            locus: {
                start: 0,
                end: 650,
                name: "Foo",
                href: "http://google.com"
            }
        }
    }
}
