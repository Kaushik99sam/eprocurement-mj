import { useMemo, useState } from "react";
import Table from "../components/Table/Table";
import Data from '../data/data.json';
import { useNavigate } from "react-router-dom";

export default function Tenders() {
    const navigate = useNavigate()
    // console.log(Data)
    const columns = useMemo(() => [
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
            cell: (info) => (<><button className={`btn btn-sm ${info.getValue() === 'open' ? 'btn-primary' : 'btn-secondary'}`} disabled={info.getValue() === 'closed'} onClick={() => navigate(`/suppliers/${info.row.original.id}`)}>{info.getValue()}</button></>),
            footer: (props) => props.column.id,
        }
    ], [])

    const [data, setData] = useState(() => Data);

    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <h5>List of RFQs</h5>
                    <button className="btn btn-danger btn-sm">Generate CS</button>
                </div>
            </div>
            <Table {...{
                data,
                columns,
            }} />
        </>)
}