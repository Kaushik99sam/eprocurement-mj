// RFPDraft.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/rfpstyle.css';
import { BsFillPersonFill, BsBox, BsLayers, BsQuestion, BsTrash, BsCurrencyRupee } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const RFPDraft = () => {
  const location = useLocation();
  
  const preFilledData = location.state || {};

  const {
    indents: initialIndents,
    selectedVendors: initialSelectedVendors,
    removedVendors: initialRemovedVendors,
    selectedDocuments: initialSelectedDocuments,
    rfpDivision: initialRfpDivision,
    remarks: initialRemarks,
    bidSubmissionDate: initialBidSubmissionDate,
    bidOpenDate: initialBidOpenDate,
  } = preFilledData;

 
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);

  const navigate = useNavigate();
  const [editable, setEditable] = useState(true);
  const [indents, setIndents] = useState(initialIndents || []);

  const [allVendors, setAllVendors] = useState(['Vendor 1', 'Vendor 2', 'Vendor 3']);
  const [selectedVendors, setSelectedVendors] = useState(initialSelectedVendors || []);
  const [removedVendors, setRemovedVendors] = useState(initialRemovedVendors || []);
  const [selectedDocuments, setSelectedDocuments] = useState(initialSelectedDocuments || []);

  const [documents, setDocuments] = useState([]);

  const [userName, setUserName] = useState('');
  const [rfpDivision, setrfpDivision] = useState(initialRfpDivision || true);
  const [remarks, setRemarks] = useState(initialRemarks || '');
  const [bidSubmissionDate, setBidSubmissionDate] = useState(initialBidSubmissionDate || '');
  const [bidOpenDate, setBidOpenDate] = useState(initialBidOpenDate || '');

  useEffect(() => {
    fetch('http://localhost:8080/doclist')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched vendors:', data);
        setDocuments(data);
      })
      .catch(error => console.error('Error fetching vendors:', error));
  }, []);

  const handleVendorSelect = (vendor) => {
    setSelectedVendors([...selectedVendors, vendor]);
    const updatedVendors = allVendors.filter((v) => v !== vendor);
    setAllVendors(updatedVendors);
  };

  const handleRemoveVendor = (vendor) => {
    const updatedVendors = selectedVendors.filter((v) => v !== vendor);
    setSelectedVendors(updatedVendors);
    setRemovedVendors([...removedVendors, vendor]);
  };

  const handleDeleteIndent = (index) => {
    const updatedIndents = [...indents];
    updatedIndents.splice(index, 1);
    setIndents(updatedIndents);
  };

  const handleDocumentChange = (documentId) => {
    const updatedDocuments = documents.map(doc => ({
      ...doc,
      selected: doc.id === documentId ? !doc.selected : doc.selected,
    }));
    setDocuments(updatedDocuments);

    // Update the selected documents state
    const selectedDocs = updatedDocuments.filter(doc => doc.selected).map(doc => doc.id);
    setSelectedDocuments(selectedDocs);
    console.log(selectedDocs);
  }

  const postData = async () => {
    try {
      const url = 'http://localhost:8080/fillrfp'; // Replace with your API endpoint
      const jsonData = {
        "id": 5,
        "estimatedPrice":
          1000.00,
        "isSplitable": rfpDivision,
        "isPublish": true,
        "isDraft": false,
        "remarks": remarks,
        "rfpCreationDate": "12-09-2023",
        "bidOpeningDate": bidOpenDate,
        "bidSubmissionDate": bidSubmissionDate,
        "buyer": 1,
        "li": [{
          "VID": "1",
          "VendorName": "Address1"
        }],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Process the response data if needed
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredVendors = allVendors.filter((vendor) => !selectedVendors.includes(vendor) && !removedVendors.includes(vendor));

  const handleFinalSubmit = () => {
    setShowFinalSubmitModal(true);
  };

  const handleFinalSubmitConfirm = () => {
    // Additional logic for final submission if needed
    navigate('/RFPList'); // Redirect to RFPList page
    setShowFinalSubmitModal(false);
  };

 

  const areAllFieldsFilled = () => {
    return (
      indents.every(item => item.quantity && item.price) &&
      selectedVendors.length > 0 &&
      selectedDocuments.length > 0 &&
      remarks.trim() !== '' &&
      bidSubmissionDate !== '' &&
      bidOpenDate !== ''
    );
  };

  return (
    <div className="main-container">
      <div className="translucent-form">
      <div className="user-info">
          {userName !== '' ? (
            <span>Welcome, {userName}</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className="form-title"><BsLayers className="icon" /> Proposed Indent</div>

        <div className="table-container mt-4">
          <table>
            <thead>
              <tr style={{ background: '#007BFF' }}>
                <th><BsBox className="icon" /> Indent ID</th>
                <th><BsFillPersonFill className="icon" /> Name</th>
                <th><BsQuestion className="icon" /> Measure of Unit</th>
                <th><BsLayers className="icon" /> Quantity</th>
                <th><BsCurrencyRupee className="icon" /> Estimated Price</th>
                {editable && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {indents.map((item, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#f0f0f0' : 'white' }}>
                  <td>{item.indentId}</td>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>
                    {editable ? (
                      <input
                        type="text"
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
                        type="text"
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

        <select
          className="form-select mt-4"
          value={''}
          onChange={(e) => handleVendorSelect(e.target.value)}
        >
          <option value={''} disabled>Select Vendor</option>
          {filteredVendors.map((vendor, index) => (
            <option key={index} value={vendor.name}>
              {vendor.name}
            </option>
          ))}
        </select>

        {selectedVendors.length > 0 && (
          <div className="selected-vendor mt-4">
            <div className="form-title">Selected Vendors</div>
            <div className="selected-vendor-box d-flex">
              {selectedVendors.map((vendor) => (
                <div key={vendor} className="selected-vendor-item mx-2 ">
                  {vendor}
                  <button
                    className="btn btn-sm btn-danger ml-2 mx-1"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
                    onClick={() => handleRemoveVendor(vendor)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="document-list mt-4">
          <div className="form-title">Documents</div>

          <div className="row">
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
          <div className="form-title">RFP Split</div>
          <div className="btn-group" role="group" aria-label="RFP Decision">
            <div className="btn-group" role="group" aria-label="RFP Decision">
              <button
                type="button"
                className={`btn btn-${rfpDivision ? 'success' : 'secondary'}`}
                onClick={() => setrfpDivision(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn btn-${!rfpDivision ? 'success' : 'secondary'}`}
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

        <div className="calendar mt-4 d-flex">
          <div className="form-group mx-2">
            <label className="form-title">Bid Submission Date</label>
            <input
              type="date"
              className="form-control form-control-lg"
              value={bidSubmissionDate}
              onChange={(e) => setBidSubmissionDate(e.target.value)}
            />
          </div>

          <div className="form-group mx-5">
            <label className="form-title">Bid Open Date</label>
            <input
              type="date"
              className="form-control form-control-lg"
              value={bidOpenDate}
              onChange={(e) => setBidOpenDate(e.target.value)}
            />
          </div>
        </div>

        <div className="create-rpf mt-5">
          {/* <button
            className="btn btn-primary"
            onClick={handleEditClick}
            disabled={editable}
          >
            Edit
          </button> */}
          {/* <button
            className="btn btn-secondary "
            onClick={handleSaveAsDraft}

          >
            Save as Draft
          </button> */}
          <button
            className="btn btn-success mx-5"
            onClick={handleFinalSubmit}
            disabled={!areAllFieldsFilled()}

          >
            Final Submit
          </button>



          

          {/* Final Submit Modal */}
          <Modal show={showFinalSubmitModal} onHide={() => setShowFinalSubmitModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Final Submit</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to submit?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowFinalSubmitModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFinalSubmitConfirm}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RFPDraft;
