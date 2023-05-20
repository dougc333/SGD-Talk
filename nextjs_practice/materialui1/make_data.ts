
import * as fs from 'fs';
import * as path from 'path';
import {parse} from 'csv-parse'



type nlsy = [
    R0000100: number, 
    PCS2000: number,
    CESD2000Total:number,
    CESDTotal2000cutpt:number,
    MCS2000:number,
    RelAt2000cat6:number,
    RelAt2000cat2:number,
    Gender:number,
    Race3:number,
    Marital2000c5:number,
    Education2000:number,
    Education2000c4:number,
    NumberBioStepAdoptChildHH2000:number,
    BioChildHH2000c2:number,
    WorkTimeHrsperWkPastCalYr2000cat4:number,
    UnemplyWksPastCal2000c:number,
    UnemployedWksPastCal2000cont:number,
    IncomePercNetFam2000c:number,
    PovertyStatus2000c2:number
]

const nlsy_header=[
    "id",
    "R0000100",
    "PCS2000",
    "CESD2000Total",
    "CESDTotal2000cutpt",
    "MCS2000",
    "RelAt2000cat6",
    "RelAt2000cat2",
    "Gender",
    "Race3",
    "Marital2000c5",
    "Education2000",
    "Education2000c4",
    "NumberBioStepAdoptChildHH2000",
    "BioChildHH2000c2",
    "WorkTimeHrsperWkPastCalYr2000cat4",
    "UnemplyWksPastCal2000c",
    "UnemployedWksPastCal2000cont",
    "IncomePercNetFam2000c",
    "PovertyStatus2000c2",
]


parse(`
"key_1","key_2"
"value 1","value 2"
`.trim(), {
  columns: true
}, function(err, records){
  console.log(records)
});


const test_header = ["key_10","key_20"]
const test_data = `"value 10","value 20"`

console.log("second version parse")
parse(
    test_data,{
    columns:test_header
},function(err,records){
    console.log(records)
}
)

console.log("sync example")


const content = fs.readFileSync("clean.csv")
console.log(content)
//parse content
parse(content,{
    columns: nlsy_header
},function(err,records){
    console.log(records)
    fs.writeFileSync("NLSY_clean.json",JSON.stringify(records))
})

//write to json file
