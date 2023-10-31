import React, { useState } from "react";
import Modals from "./Modal";

export default function TableVendor({ datas, columns }) {
  const [pid,setPid] = useState(0)

  return (
    <div className="card">
      <div className="p-2">
        <table className="table ">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  style={{ backgroundColor: "#053B50", color: "white" }}
                  key={index}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.vendorId}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=>setPid(data.id)}
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    <Modals vendorId={pid}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
