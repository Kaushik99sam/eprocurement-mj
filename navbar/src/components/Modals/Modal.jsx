import React, { useEffect, useState } from "react";
import jsonData from "../../data/ProduuctPrice.json";
import jsonDocument from "../../data/document.json";
export default function Modals() {
  const [modal, setModal] = useState(false); // State to control PopUp visibility
  const [data, setData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  useEffect(() => {
    setData(jsonData);
  }, []);
  useEffect(() => {
    setDocumentData(jsonDocument);
  }, []);
  /********************************** */
  /********************************** */
  const [modaltwo, setModaltwo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = () => {
    alert("Form submitted");
  };
  /*********************************** */
  //const total = data.reduce((acc, item) => acc + item.price, 0);
  const total = data.reduce((acc, item) => {
    // Convert item.price to a number (integer or decimal)
    const price = parseFloat(item.price);
    // Check if price is a valid number
    if (!isNaN(price)) {
      return acc + price;
    } else {
      return acc; // If price is not a valid number, skip it
    }
  }, 0);
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Documents and Bid Prices
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <table className="table">
                <thead className="table-primary">
                  <tr>
                    <th>Documents</th>
                    <th>
                      <i class="bi bi-check"></i>
                    </th>
                    <th>
                      <i class="bi bi-x"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.document}</td>
                      <td>
                        <input
                          type="radio"
                          name={item.document}
                          value="yes"
                          checked={item.status === "yes"}
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          name={item.document}
                          value="no"
                          checked={item.status === "no"}
                        />
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
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                  <tr className="table-secondary">
                    <td>Total:</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Generate PO
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}