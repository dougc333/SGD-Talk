import React from 'react'
import {useReactTable} from '@tanstack/react-table'
import dataJSON from './MOCK_DATA.json'
import {columnDef} from './columns'


const BasicTable = ()=>{
  const tableInstance = useReactTable({
    columns: columnDef,
    data:dataJSON,
  })

  console.log(tableInstance.getHeaderGroups())

  return(
    <table>
      <thead>
        {/* {tableInstance.getHeaderGroups().map()} */}
      </thead>
    </table>     
  )
}

export default BasicTable