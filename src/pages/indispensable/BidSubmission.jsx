import React, { useState, useEffect } from "react";
import './styling/rfpstyle.css';
import FileInput from "./Document";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  BsFillPersonFill,
  BsBox,
  BsLayers,
  BsQuestion,
  BsCurrencyRupee
} from "react-icons/bs";


const BidSubmit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rfpData, setRfpData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [userName, setUserName] = useState('');
  const dummyDataApiEndpoint = 'http://localhost:3040/dummyData';
  const userNameApiEndpoint = 'http://localhost:3050/userName'; // Replace with your actual API endpoint

  useEffect(() => {
    fetch(dummyDataApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched dummy data:", data);
        console.log(id);
        setDummyData(data);
      })
      .catch((error) => console.error("Error fetching dummy data:", error));

    fetch(userNameApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched user name:", data);
        const userNameValue = data && data[0] && data[0].name;

        console.log("userNameValue:", userNameValue);
        setUserName(userNameValue || "");
      })
      .catch((error) => {
        console.error("Error fetching user name:", error);
        console.error("Error message:", error.message);
      });

  }, []);

  console.log(id);
  useEffect(() => {
    fetch("http://localhost:8080/rfp1/" + id)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched dummy data:', data);
        setRfpData(data);
      })
      .catch(error => console.error('Error fetching dummy data:', error));
  }, []);
  const thStyle = {
    backgroundColor: 'blue',
    color: 'white',
  };

  // const[]

  const [vendors, setVendors] = useState(['Vendor 1', 'Vendor 2', 'Vendor 3']);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showSaveAsDraftModal, setShowSaveAsDraftModal] = useState(false);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [prices, setPrices] = useState([]);
  const docData = [
    { 'idName': "Adhar Card", 'isRequired': true },
    { 'idName': "PAN Card", 'isRequired': false },
    { 'idName': "VCard Card", 'isRequired': true },
    { 'idName': "VCard Card", 'isRequired': true },
    { 'idName': "VCard Card", 'isRequired': true }
  ];

  console.log("hello"+rfpData.bidOpeningDate);
  console.log("there"+ rfpData.bidSubmissionDate);

  const postData = async () => {
    try {
      const url = 'http://localhost:8080/fillbid';
      const jsonData = {
        "bidId": 1,
        "vendorName": userName,
        "isSplitable": rfpData.isSplitable,
        "isPublish": true,
        "isDraft": false,
        "remarks": remarks,
        "rfpCreationDateTime": rfpData.rfpCreationDate,
        "bidOpeningDateTime": rfpData.bidOpeningDate,
        "bidSubmissionDateTime": rfpData.bidSubmissionDate,
        "name": rfpData.name,
        "buyer_name": userName,
        "bidStatus": true,
        "bidPrice": 567894.90,
        "buyer": 1,
        "rfp_id":rfpData.id,
        "doc": [''],
        //"li":[...selectedVendors]

      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setPrices(dummyData.map(() => 0));
  }, [dummyData]);
  

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [prices]);

  const calculateTotalPrice = () => {
    const total = prices.reduce(
      (accumulator, price, index) => accumulator + price * dummyData[index].quantity,
      0
    );
    setTotalPrice(total);
  };

  const handlePriceChange = (e, index) => {
    const newPrices = [...prices];
    const price = parseFloat(e.target.value);
    if (!isNaN(price)) {
      newPrices[index] = price;
    } else {
      newPrices[index] = 0;
    }
    setPrices(newPrices);
  };

  const handleFinalSubmit = () => {
    setShowFinalSubmitModal(true);
  };

  const handleFinalSubmitConfirm = () => {
    postData();
    navigate("/RFPList");
    setShowFinalSubmitModal(false);
  };

  const handleSaveAsDraft = () => {
    setShowSaveAsDraftModal(true);
  };

  const handleSaveAsDraftConfirm = () => {
    navigate("/RFPList");
    setShowSaveAsDraftModal(false);
  };
  const handleAddVendor = () => {
    setVendors([...vendors, `Vendor ${vendors.length + 1}`]);
  };
  return (
    <div className="main-container">
      <div className="translucent-form">

        <div className="user-info">
          {userName !== "" ? (
            <span>Welcome, {userName}</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>RFP ID</th>
                <th>RFP Name</th>
                <th>RFP Description</th>
                <th>.......</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{rfpData.id}</td>
                <td>{rfpData.name}</td>
                <td>{rfpData.remarks}</td>
                <td>......</td>
              </tr>
            </tbody>
          </table>
        </div>

       

        

        <div className="table-container">
          <table>
            <thead>
              <tr style={{ background: "#007BFF" }}>
                <th className="th-center">
                  <BsBox className="icon" /> Product ID
                </th>
                <th className="th-center">
                  <BsFillPersonFill className="icon" /> Product Name
                </th>
                <th className="th-center">
                  <BsQuestion className="icon" /> Product Unit
                </th>
                <th className="th-center">
                  <BsLayers className="icon" />
                  Product quantity
                </th>
                <th className="th-center">
                  <BsCurrencyRupee className="icon" /> Estimated Price per Unit
                  Quantity
                </th>
                <th className="th-center">
                  <BsCurrencyRupee className="icon" />
                  Estimated Price per unit Product
                </th>
                <th className="th-center">
                  <BsCurrencyRupee className="icon" />
                  Your Unit Price
                </th>
                <th className="th-center">
                  <BsCurrencyRupee className="icon" />
                  Your Total Price per
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dummyData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.indentId}</td>
                    <td>{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        onChange={(e) => handlePriceChange(e, index)}
                      />
                    </td>
                    <td>{prices[index] * item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        <div class="container d-flex justify-content-end">
          <span class="form-title fs-4">Grand Total:</span>
          <span class="text-success fw-bold  mx-2" style={{ fontSize: '1.5em' }}>
            {totalPrice}
          </span>
        </div>

        <div className='form-title my-2'> <h3 className='font-weight-bold'
        >Attach Documents</h3></div>

        <div className="mt-3">
          <div className="row">
            {
              docData.map((val, ind) => (
                <div key={ind} className="col-md-4 mb-3" style={{ marginLeft: '10px' }}>
                  <div className="input-group">
                    <span className="input-group-text">{val.idName} {val.isRequired && (<sub className='ms-1' style={{ color: 'red' }}> * </sub>)}</span>
                    <input
                      type="file"
                      aria-label={val.idName}
                      className="form-control"
                      required={val.isRequired}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="remarks mt-4">
          <div className="form-title">Comments</div>
          <textarea
            className="form-control"
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <div className="create-rpf mt-5 d-flex justify-content-end">

          <button className="btn btn-success mx-5" onClick={handleFinalSubmit}>
            Final Submit
          </button>

          <Modal
            show={showFinalSubmitModal}
            onHide={() => setShowFinalSubmitModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Final Submit</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to submit?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFinalSubmitModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary"
                onClick={() => handleFinalSubmitConfirm()}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="create-rpf mt-5 "></div>
      </div>
      <div className="create-rpf mt-5 "></div>
    </div>
  );
};

export default BidSubmit;
