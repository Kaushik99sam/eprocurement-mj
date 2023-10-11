import React, { useState } from "react";
import { useReactTable } from "@tanstack/react-table";

const Table2 = () => {
  const [table, setTable] = useState(useReactTable({
    columns: [
      {
        Header: "Name",
        accessor: "name",
        cell: ({ cell }) => <span>{cell.getValue().toUpperCase()}</span>,
      },
      { Header: "Age", accessor: "age" },
    ],
    data: [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Doe", age: 25 },
      { id: 3, name: "Peter Parker", age: 20 },
      { id: 4, name: "Mary Jane Watson", age: 19 },
      { id: 5, name: "Bruce Wayne", age: 40 },
    ],
  }));

  const [dataLimit, setDataLimit] = useState(10);

  const filteredTableData = table.rows.filter(
    (row, index) => index < dataLimit
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((row) => (
            <tr key={row.id}>
              {table.columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
