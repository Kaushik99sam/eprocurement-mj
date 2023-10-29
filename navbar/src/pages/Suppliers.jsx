import { useMemo, useState } from "react";
import jsonData from "../data/SupplierData.json";
import Modals from "../components/Modals/Modal";
import Table from "../components/Table/Table";

export default function Suppliers() {
    const [data, setData] = useState(() => jsonData);
    console.log(jsonData);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "Id",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            accessorKey: "total",
            header: "Total Price(₹)",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            header: "View",
            cell: () => <><button className="btn btn-outline-dark btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"><i class="bi bi-eye"></i></button>
                <Modals /></>,
        }
    ], [])
    console.log(data);
    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h5>List of Vendors</h5>
                <button className="btn btn-success btn-sm">Generate CS</button>
            </div>
            <Table {...{
                data, columns
            }} />
        </>
    );
}
{/* // <div aria-labelledby="supplier-list">
             <table className="table">
                 <thead className="table-primary">
        //             <th>Supplier ID</th>
        //             <th>Supplier Name</th>
        //             <th>Total Price</th>
        //             <th>Supplier's Info</th>
        //             <th>Status</th>
        //         </thead>
        //         <tbody>
                    // {data.map((item,index) => ( */}
{/* //         <tr key={index}>
                    //             <td>{item.id}</td>
                    //         <td>{item.name}</td>
                    //         <td>{item.total}</td>
                    //         <td><button className="btn btn-primary" */}
{/* //                     data-bs-toggle="modal"
        //                     data-bs-target="#exampleModal"><i class="bi bi-eye"></i></button> */}
{/* //                     <Modals/></td> */ }
{/* //                     <td>{item.status}</td>
        //                 </tr> */}
{/* //             ))} */ }
{/* //         </tbody> */ }
{/* //     </table> */ }
{/* // </div> */ }