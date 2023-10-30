import React, { useEffect, useState } from "react";
import { useGetProductByVendorQuery } from "../../service/product";
import documentData from "../../data/document.json";
import { useDispatch } from "react-redux";
import { useAddPoMutation } from "../../service/po";

export default function Modals({ vendorId }) {
  const {
    isLoading,
    isError,
    isSuccess,
    data: Data,
    error,
  } = useGetProductByVendorQuery(vendorId);

  const dispatch = useDispatch();
  const [addPo] = useAddPoMutation()

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  if (Data) {
    // console.log(vendorId)
    console.log("Product", Data);
  }
  // return<div>Hello</div>
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <table className="table">
                <thead className="table-primary">
                  <tr>
                    <th>Documents</th>
                    <th>
                      <i className="bi bi-check"></i>
                    </th>
                    <th>
                      <i className="bi bi-x"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.document}</td>
                      <td>
                        <input type="radio" name={item.document} value="yes" />
                      </td>
                      <td>
                        <input type="radio" name={item.document} value="no" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Product and Price Table */}
            <div>
              <table className="table">
                <thead className="table-primary">
                  <tr>
                    <th>Product</th>
                    <th>Price(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.bidPrice}</td>
                    </tr>
                  ))}
                  {/* <tr className="table-secondary">
                    <td>Total:</td>
                    <td>{total}</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={()=>dispatch(addPo({refTable:[{id:item.id}]}))}
            >
              Generate PO
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // const [data, setData] = useState([]);
  // const [documentData, setDocumentData] = useState([]);

  // const [modaltwo, setModaltwo] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  // const handleSubmit = () => {
  //   alert("Form submitted");
  // };
  /*********************************** */
  //const total = data.reduce((acc, item) => acc + item.price, 0);
  // const total = data.reduce((acc, item) => {
  //   // Convert item.price to a number (integer or decimal)
  //   const price = parseFloat(item.price);
  //   // Check if price is a valid number
  //   if (!isNaN(price)) {
  //     return acc + price;
  //   } else {
  //     return acc; // If price is not a valid number, skip it
  //   }
  // }, 0);
  // return <div>Hello</div>
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <table className="table">
                <thead className="table-primary">
                  <tr>
                    <th>Documents</th>
                    <th>
                      <i className="bi bi-check"></i>
                    </th>
                    <th>
                      <i className="bi bi-x"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.document}</td>
                      <td>
                        <input type="radio" name={item.document} value="yes" />
                      </td>
                      <td>
                        <input type="radio" name={item.document} value="no" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Product and Price Table */}
            <div>
              <table className="table">
                <thead className="table-primary">
                  <tr>
                    <th>Product</th>
                    <th>Price(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) =>
                    item.venIds.id === vendorId ? (
                      <tr key={index}>
                        <td>{item.proIds.name}</td>
                        <td>{item.bidPrice}</td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )}
                  <tr className="table-secondary">
                    <td>Total:</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Generate PO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
