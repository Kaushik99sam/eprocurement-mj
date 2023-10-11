// import React from "react";

// import { useTable, useSortBy, usePagination } from 'react-table';
// import Data from '../../data/data.json'
// import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
// import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
// import './Table.css';

// function Table({ columns, data }) {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         nextPage,
//         previousPage,
//         pageOptions,
//         state,
//         prepareRow,
//         canPreviousPage,
//         canNextPage,
//     } = useTable(
//         {
//             columns,
//             data,
//         },
//         useSortBy,
//         usePagination
//     )

//     const { pageIndex } = state

//     // Render the UI for your table
//     return (
//         <div className="absolute">
//             <table className="table" {...getTableProps()}>
//                 <thead className="color-change">
//                     {headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map(column => (
//                                 // Add the sorting props to control sorting. For this example
//                                 // we can add them into the header props
//                                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                     {column.render('Header')}
//                                     {/* Add a sort direction indicator */}
//                                     <span>
//                                         &nbsp;
//                                         {column.isSorted
//                                             ? column.isSortedDesc
//                                                 ? <FaCaretDown />
//                                                 : <FaCaretUp />
//                                             : ''}
//                                     </span>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {page.map(
//                         (row, i) => {
//                             prepareRow(row);
//                             return (
//                                 <tr {...row.getRowProps()}>
//                                     {row.cells.map(cell => {
//                                         console.log(cell)
//                                         return (
//                                             <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                                         )
//                                     })}
//                                 </tr>
//                             )
//                         }
//                     )}
//                 </tbody>
//             </table>
//             <br />
//             <div>
//                 <span>
//                     Page{''}
//                     <strong>
//                         {pageIndex + 1} of {pageOptions.length}
//                     </strong>
//                 </span>&nbsp;
//                 <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-sm color"><AiFillCaretLeft /> Previous</button>&nbsp;
//                 <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-sm color">Next <AiFillCaretRight /></button>
//             </div>
//         </div>
//     )
// }

// function SortingTableComponent() {
//     const columns = React.useMemo(
//         () => [

//             {
//                 Header: 'RFP ID',
//                 accessor: 'id',
//             },
//             {
//                 Header: 'Description',
//                 accessor: 'description',
//             },
//             {
//                 Header: 'Status',
//                 accessor: 'status',
//                 cell: (value) => {
//                     if (value === 'open')
//                         return (<button>Open</button>);
//                 }
//             }
//         ],
//         []
//     )
//     // console.log(JSON.stringify(data));


//     return (
//         <Table columns={columns} data={Data} />
//     )
// }

// /************************************************************************/

// export default SortingTableComponent;

import React, { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

import Data from '../../data/data.json'

export default function TableFun() {
  const rerender = React.useReducer(() => ({}), {})[1];
  

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    //   {
    //     accessorFn: (row) => row.lastName,
    //     id: "lastName",
    //     cell: (info) => info.getValue(),
    //     header: () => <span>Last Name</span>,
    //     footer: (props) => props.column.id,
    //   },
    //   {
    //     accessorKey: "age",
    //     header: () => "Age",
    //     footer: (props) => props.column.id,
    //   },
    //   {
    //     accessorKey: "visits",
    //     header: () => <span>Visits</span>,
    //     footer: (props) => props.column.id,
    //   },
      {
        accessorKey: "description",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(100000));
  const refreshData = () => setData(() => makeData(100000));

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </>
  );
}

function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    // Pipeline
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler()
                      }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽"
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
