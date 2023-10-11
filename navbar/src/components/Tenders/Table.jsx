import React from "react";

import { useTable, useSortBy, usePagination } from 'react-table';
import Data from '../../data/data.json'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import './Table.css';

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

    const { pageIndex } = state

    // Render the UI for your table
    return (
        <div className="absolute">
            <table className="table" {...getTableProps()}>
                <thead className="color-change">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        &nbsp;
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <FaCaretDown />
                                                : <FaCaretUp />
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
                                        console.log(cell)
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
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>&nbsp;
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-sm color"><AiFillCaretLeft /> Previous</button>&nbsp;
                <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-sm color">Next <AiFillCaretRight /></button>
            </div>
        </div>
    )
}

function SortingTableComponent() {
    const columns = React.useMemo(
        () => [

            {
                Header: 'RFP ID',
                accessor: 'id',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Status',
                accessor: 'status',
                cell: (value) => {
                    if (value === 'open')
                        return (<button>Open</button>);
                }
            }
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