import React, { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

export default function TableFun() {
  const Data = [
    {
      "id": "committee-c15dw",
      "description": "editor-ktsjo",
      "status": "closed"
    },
    {
      "id": "midnight-wad0y",
      "description": "data-7h4xf",
      "status": "closed"
    },
    {
      "id": "tree-sbdb0",
      "description": "friendship-w8535",
      "status": "open"
    },
    {
      "id": "chin-borr8",
      "description": "shirt-zox8m",
      "status": "closed"
    },
    {
      "id": "women-83ef0",
      "description": "chalk-e8xbk",
      "status": "closed"
    },
    {
      "id": "women-83ef0",
      "description": "chalk-e8xbk",
      "status": "closed"
    }
  ]
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo(
    () => [
      {
        header: "Id",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "description",
        cell: (info) => info.getValue(),
        header: () => "Description",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: (info) => (<button className={`btn btn-sm ${info.getValue() === 'open' ? 'btn-primary' : 'btn-danger'}`} disabled={info.getValue() === 'closed'}>{info.getValue()}</button>),
        footer: (props) => props.column.id,
      }
    ],
    []
  );

  const [data, setData] = React.useState(() => Data);

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
      {/* <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div> */}
    </>
  );
}

function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      }
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

  // console.log(table.nextPage())

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="table" style={{borderRadius: "10%"}}>
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
                          asc: <FaCaretUp />,
                          desc: <FaCaretDown />
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
