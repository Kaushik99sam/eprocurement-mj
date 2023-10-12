import { useEffect, useState } from "react";
import jsonData from "../data/SupplierData.json";
import Modals from "../components/Modals/Modal";
export default function Suppliers() {
    const [data, setData] = useState([]);
    useEffect (() => {
        setData(jsonData);
    }, []);
    return (
            <div>
                <table className="table">
                    <thead className="table-primary">
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Total Price</th>
                        <th>Supplier's Info</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {data.map((item,index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.total}</td>
                                <td><button className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-eye"></i></button>
                                <Modals/></td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}