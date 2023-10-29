import React from "react";
import { useNavigate } from "react-router-dom";

export default function Table2({ columns, datas }) {
  const navigate = useNavigate();
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
              console.log(data.isSpilt);
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{"" + data.isSpilt}</td>
                  <td>{data.description}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        data.status === "active"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      disabled={data.status === "inactive"}
                      onClick={() => {
                        navigate(`/suppliers/${data.id}`);
                      }}
                    >
                      {data.status}
                    </button>
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
