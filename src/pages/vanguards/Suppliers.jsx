import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {TableVendor,Table,Table2} from "../../components/vanguards";
import { useDownloadCsQuery, useGetVendorByRfpQuery,useGetAllVendorQuery } from "../../service/product";
import { useDispatch } from "react-redux";

export default function Suppliers() {
  const { id } = useParams();
  let fetchedContent;
  if(id){
    fetchedContent = useGetVendorByRfpQuery(id)
  }
  else{
    fetchedContent = useGetAllVendorQuery();
  }
  
  const {
    isLoading,
    isError,
    isSuccess,
    data :Data,
    error,
  } = fetchedContent;

  const columns = ["Id", "Name", "Total price", "Status", "View"];

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  const dispatch = useDispatch()

  if (Data) {
    console.log("Supplier",Data)
    // let d = [Data]
    return (
      <>
        <div className="mb-2">
          <div className="d-flex justify-content-between">
            <h5>List of Vendors</h5>
            <a className="btn btn-danger btn-sm" href={`http://localhost:8080/download-excel/${1}`}>Generate Cs </a>
          </div>
        </div>
        <TableVendor datas={Data} columns={columns} />
      </>
    );
  }
}

// import React from 'react'

// export default function Suppliers() {
//   return (
//     <div>Suppliers</div>
//   )
// }
