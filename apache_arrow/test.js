import {readFileSync} from 'fs'
import {tableFromIPC} from 'apache-arrow'


//arrow table from array
const {tableFromArrays} from 'apache-arrow'

const LEN=2000
const rainAmounts = Float32Array.from(
  {length:LENGTH}
  
)
