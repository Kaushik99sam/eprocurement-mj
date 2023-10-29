import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './styling/rfpstyle.css';
import {
  BsFillPersonFill,
  BsBox,
  BsLayers,
  BsQuestion,
  BsTrash,
  BsCurrencyRupee,
} from "react-icons/bs";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from React Bootstrap
import { useNavigate, useLocation } from "react-router-dom";
import { BsCalendar, BsClock } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const RFPEdit = () => {
  const location = useLocation();
  const userName = location.state?.userName || "";
  const [showSaveAsDraftModal, setShowSaveAsDraftModal] = useState(false);
  const [showFillDataModal, setShowFillDataModal] = useState(false);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [bidSubmissionDateTime, setBidSubmissionDateTime] = useState(
    new Date()
  );
  const [bidOpenDateTime, setBidOpenDateTime] = useState(new Date());
  const [minBidOpenDate, setMinBidOpenDate] = useState(new Date());
  const handleBidSubmissionDateTimeChange = (date) => {
    setBidSubmissionDateTime(date);
    setMinBidOpenDate(date);
  };
  // Declare the variables
  const bidOpenDate = new Date();
  const bidSubmissionDate = new Date();
  const handleBidOpenDateTimeChange = (date) => {
    setBidOpenDateTime(date);
  };
  const calculateEstimatedPrice = (quantity, price) => {
    return quantity && price ? quantity * price : 0;
  };
  const handleDeleteIndent = (index) => {
    const updatedIndents = [...indents];
    updatedIndents.splice(index, 1);
    setIndents(updatedIndents);
  };
  const calendarRef = useRef(null);
  const clockRef = useRef(null);
  const openCalendar = () => {
    calendarRef.current.setOpen(true);
  };
  const openClock = () => {
    clockRef.current.setOpen(true);
  };
  useEffect(() => {
    console.log("userName in RFPEdit:", userName);
  }, [userName]);

  const navigate = useNavigate();
  const [editable, setEditable] = useState(true);
  const [indents, setIndents] = useState(location.state?.dummyData || []);

  const [allVendors, setAllVendors] = useState([
    "Vendor 1",
    "Vendor 2",
    "Vendor 3",
  ]);
  const [selectedValue, setSelectedValue] = useState("");

  const [selectedVendors, setSelectedVendors] = useState([]);
  const [removedVendors, setRemovedVendors] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [rfpDivision, setrfpDivision] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [rfpName, setRfpName] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/vendorlist")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllVendors(data);
        } else {
          console.error("Invalid data format for vendors:", data);
        }
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  // useEffect(() => {
  //   console.log("Current Selected Vendors: ", selectedVendors);
  // })

  useEffect(() => {
    fetch("http://localhost:8080/doclist")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched vendors:", data);
        setDocuments(data);
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  useEffect(() => {

    console.log("MJ: ", selectedVendors);

  })

  const handleVendorSelect = (vendor) => {
    
    setSelectedValue(vendor);
   
    //const vendor = allVendors.find(vendor => vendor.id === selectedVendor.id);

    console.log("Hi--current selected vendor is: ",vendor);
    setSelectedVendors([...selectedVendors, vendor]);
    const updatedVendors = allVendors.filter((v) => v !== vendor.name);
    setAllVendors(updatedVendors);
  };

  

  const handleRemoveVendor = (vendor) => {
    const updatedVendors = selectedVendors.filter((v) => v !== vendor);
    setSelectedVendors(updatedVendors);
    setRemovedVendors([...removedVendors, vendor]);
  };

  const handleEditClick = () => {
    setEditable(true);
  };
  const handleDocumentChange = (documentId) => {
    const updatedDocuments = documents.map((doc) => ({
      ...doc,
      selected: doc.id === documentId ? !doc.selected : doc.selected,
    }));
    setDocuments(updatedDocuments);
    const selectedDocs = updatedDocuments
      .filter((doc) => doc.selected)
      .map((doc) => doc.id);
    setSelectedDocuments(selectedDocs);
    console.log("docList" + selectedDocuments);
  };
  const data = "MJ".concat(Math.random());
  const postData = async () => {
    try {
      const url = "http://localhost:8080/fillrfp";
      const jsonData = {
        id: 1,
        estimatedPrice: 100000,
        isSplitable: rfpDivision,
        isPublish: true,
        isDraft: false,
        remarks: remarks,
        rfpCreationDate: "12-09-2023",
        bidOpeningDate: bidOpenDate,
        bidSubmissionDate: bidSubmissionDate,
        name: rfpName,
        buyer_name: userName,
        buyer: 1,
        doc: [...selectedDocuments],
      //  li:[...selectedVendors]
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredVendors = allVendors.filter(
    (vendor) =>
      !selectedVendors.includes(vendor) && !removedVendors.includes(vendor)
  );

  const handleFinalSubmit = () => {
    if (!areAllFieldsFilled()) {
      setShowFillDataModal(true);
      return;
    }
    setShowFinalSubmitModal(true);
  };
  const handleFinalSubmitConfirm = async () => {
    if (!areAllFieldsFilled()) {
      setShowFillDataModal(true);
      return;
    }
    await postData();
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
  const areAllFieldsFilled = () => {
    return (
      indents.every((item) => item.quantity && item.price) &&
      rfpName.trim() !== "" &&
      selectedVendors.length > 0 &&
      selectedDocuments.length > 0 &&
      remarks.trim() !== "" &&
      bidSubmissionDate !== "" &&
      bidOpenDate !== ""
    );
  };
  useEffect(() => {
    // Check if indents is defined before using it
    if (indents) {
      // Recalculate estimated prices when indents change
      const updatedIndents = indents.map((item) => ({
        ...item,
        estimatedPrice: calculateEstimatedPrice(item.quantity, item.price),
      }));
      setIndents(updatedIndents);
    }
  }, [indents]);
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
        <div className="form-title">
          <BsLayers className="icon" /> Proposed Indent
        </div>
        <div className="table-container mt-4">
          <table>
            <thead>
              <tr style={{ background: "#007BFF" }}>
                <th>
                  <BsBox className="icon" /> Product ID
                </th>
                <th>
                  <BsFillPersonFill className="icon" /> Name
                </th>
                <th>
                  <BsQuestion className="icon" /> Product Unit
                </th>
                <th>
                  <BsLayers className="icon" /> Quantity
                </th>
                <th>
                  <BsCurrencyRupee className="icon" /> Estimated Unit Price
                </th>
                <th>
                  <BsCurrencyRupee className="icon" /> Estimated Price
                </th>
                {editable && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {indents.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#f0f0f0" : "white",
                  }}
                >
                  <td>{item.indentId}</td>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>
                    {editable ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const updatedIndents = [...indents];
                          updatedIndents[index].quantity = e.target.value;
                          setIndents(updatedIndents);
                        }}
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td>
                    {editable ? (
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const updatedIndents = [...indents];
                          updatedIndents[index].price = e.target.value;
                          setIndents(updatedIndents);
                        }}
                      />
                    ) : (
                      item.price
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.estimatedPrice}
                      onChange={(e) => {
                        const updatedIndents = [...indents];
                        updatedIndents[index].estimatedPrice = e.target.value;
                        setIndents(updatedIndents);
                      }}
                    />
                  </td>
                  {editable && (
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteIndent(index)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="container d-flex justify-content-end">
          <span class="form-title fs-4">Grand Total:</span>
          <span
            class="text-success fw-bold  mx-2"
            style={{ fontSize: "1.5em" }}
          >
            {indents.reduce(
              (total, item) => total + (item.estimatedPrice || 0),
              0
            )}
          </span>
        </div>
        <div className="remarks mt-4">
          <div className="form-title">RFQ Name</div>
          <input
            className="form-control"
            rows="4"
            value={rfpName}
            onChange={(e) => setRfpName(e.target.value)}
          />
        </div>

        <select
            className="form-select mt-4"
            value={selectedValue}
            onChange={(e) => handleVendorSelect(e.target.value)}
          >
            <option value="" disabled>
              Select Vendor
            </option>
            {allVendors.map((vendor, index) => (
              <option key={vendor.id} value={vendor.name}>
                {vendor.name}
              </option>
            ))}
          </select>

        {selectedVendors.length > 0 && (
          <div className="selected-vendor mt-4">
            <div className="form-title">Selected Vendors</div>
            <div className="selected-vendor-box d-flex">
              {selectedVendors.map((vendorName,index) => (
                <div key={index} className="selected-vendor-item mx-2 ">
                
                  {console.log("Lalu Bhai")}
                  {console.log(vendorName)}
          
                  {vendorName}
                  <button
                    className="btn btn-sm btn-danger ml-2 mx-1"
                    style={{ padding: "0.2rem 0.4rem", fontSize: "0.8rem" }}
                    onClick={() => handleRemoveVendor(vendorName)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="document-list mt-4">
          <div className=" d-flex">
            <div style={{ display: "inline" }} className="form-title">
              Documents{" "}
            </div>
            <div className="mt-2 mx-2">
              (Check The Boxes for mandatory Documents)
            </div>
          </div>

          <div className="row ">
            {documents.map((doc) => (
              <div className="col-md-3" key={doc.id}>
                <label className="document-label">
                  <input
                    type="checkbox"
                    id={`document-${doc.id}`}
                    checked={doc.selected}
                    onChange={() => handleDocumentChange(doc.id)}
                  />
                  {doc.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="rfp-decision mt-4">
          <div className="form-title">RFQ Split</div>
          <div className="btn-group" role="group" aria-label="RFP Decision">
            <div className="btn-group" role="group" aria-label="RFP Decision">
              <button
                type="button"
                className={`btn btn-${rfpDivision ? "success" : "secondary"}`}
                onClick={() => setrfpDivision(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn btn-${!rfpDivision ? "success" : "secondary"}`}
                onClick={() => setrfpDivision(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>

        <div className="remarks mt-4">
          <div className="form-title">Remarks</div>
          <textarea
            className="form-control"
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div className="calendar mt-4 border p-2 d-flex flex-row justify-content-between">
          <div className="form-group mx-2">
            <label className="form-title fs-4">
              Bid Submission Date and Time
            </label>
            <DatePicker
              selected={bidSubmissionDateTime}
              onChange={handleBidSubmissionDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
              timeCaption="Time"
              ref={calendarRef}
              className="text-success"
            />
          </div>
          <div className=" ml-auto  form-group mx-5">
            <label className="form-title fs-4">Bid Open Date and Time</label>
            <DatePicker
              selected={bidOpenDateTime}
              onChange={handleBidOpenDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
              timeCaption="Time"
              minDate={minBidOpenDate}
              ref={clockRef}
              className="text-success"
            />
          </div>
        </div>
        <div className="create-rpf mt-5 d-flex justify-content-end">
          {/* <button
            className="btn btn-primary"
            onClick={handleEditClick}
            disabled={editable}
          >
            Edit
          </button> */}
          <button className="btn btn-secondary " onClick={handleSaveAsDraft}>
            Save as Draft
          </button>
          <button className="btn btn-success mx-5" onClick={handleFinalSubmit}>
            Final Submit
          </button>
          <Modal
            show={showSaveAsDraftModal}
            onHide={() => setShowSaveAsDraftModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Save as Draft</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your draft is saved.</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSaveAsDraftConfirm}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showFillDataModal}
            onHide={() => setShowFillDataModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Please Fill in All Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please fill in all required fields before submitting.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowFillDataModal(false)}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
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
              <Button variant="primary" onClick={handleFinalSubmitConfirm}>
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

export default RFPEdit;