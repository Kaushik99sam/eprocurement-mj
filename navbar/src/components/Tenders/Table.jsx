// src/components/sorting.table.js
import React from "react";

import { useTable, useSortBy, usePagination } from 'react-table';

import Data from '../../data/data.json'
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        pageOptions,
        state,
        prepareRow,
        canPreviousPage,
        canNextPage,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        usePagination
    )

    const {pageIndex} = state

    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            <div>
                <span>
                    Page{''}
                    <strong>
                        {pageIndex+1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>next</button>
            </div>
        </div >
    )
}

function SortingTableComponent() {
    const columns = React.useMemo(
        () => [
            
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
        []
    )
    // console.log(JSON.stringify(data));


    return (
        <Table columns={columns} data={Data} />
    )
}

/************************************************************************/

export default SortingTableComponent;