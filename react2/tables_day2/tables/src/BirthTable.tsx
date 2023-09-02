
import './App.css'
import dataJSON from '../data/BIRTH2.json'
import {columnBirth} from './columns'
import {useReactTable, flexRender,getCoreRowModel} from '@tanstack/react-table'
import './table.css'



function BirthTable() {
  const tableInstance = useReactTable({
    columns:columnBirth,
    data:dataJSON,
    getCoreRowModel:getCoreRowModel()
  })
  console.log(tableInstance.getHeaderGroups())

  return (
    <>
    <table>
      <thead>
      {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
      </thead>
      <tbody>
      {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
    </>
  )
}

export default BirthTable
