import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styling/rfpstyle.css';

const RFPList = () => {
  const rfpData = [
    {
      id: 1,
      name: 'RFP 1',
      price: 1000,
      creationDate: '2023-10-01',
      submissionDate: '2023-10-10',
      description: 'ABC', // Add the description field
    },
    {
      id: 2,
      name: 'RFP 2',
      price: 1500,
      creationDate: '2023-10-02',
      submissionDate: '2023-10-12',
      description: 'XYZ', // Add the description field
    },
    {
      id: 3,
      name: 'RFP 3',
      price: 800,
      creationDate: '2023-10-03',
      submissionDate: '2023-10-08',
      description: 'PQR', // Add the description field
    },
    {
      id: 4,
      name: 'RFP 4',
      price: 1200,
      creationDate: '2023-10-04',
      submissionDate: '2023-10-14',
      description: 'LMN', // Add the description field
    },
  ];

  // Define state variables for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState(null);


  // Function to handle delete confirmation
  const handleDeleteConfirmation = (rfp) => {
    setSelectedRFP(rfp);
    setShowDeleteConfirmation(true);
  };

  // Function to handle canceling delete
  const handleCancelDelete = () => {
    setSelectedRFP(null);
    setShowDeleteConfirmation(false);
  };

  // Function to handle actual deletion
  const handleDelete = () => {
    if (selectedRFP) {
      // Implement your delete logic here
      // After deleting, you can redirect to the list page or perform any other action
      // For now, we'll just hide the delete confirmation popup
      const updatedRFPData = rfpData.filter((rfp) => rfp.id !== selectedRFP.id);
      console.log('Deleted RFP with ID:', selectedRFP.id);
      // Update the rfpData state or make an API request to update the data
      setSelectedRFP(null);
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className="translucent-form">
      <h1>List of RFP DRAFTS</h1>
      {rfpData.map((rfp) => (
        <div key={rfp.id} className="accordion" id={`rfpAccordion${rfp.id}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`rfpHeading${rfp.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#rfpCollapse${rfp.id}`}
              >
                {rfp.name} {/* Display the RFP name */}
              </button>
            </h2>
            <div
              id={`rfpCollapse${rfp.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`rfpHeading${rfp.id}`}
              data-bs-parent={`#rfpAccordion${rfp.id}`}
            >
              <div className="accordion-body">
                <p>RFP ID: {rfp.id}</p>
                <p>Price: ${rfp.price}</p>
                <p>Creation Date: {rfp.creationDate}</p>
                <p>Submission Date: {rfp.submissionDate}</p>
                <p>Description: {rfp.description}</p>
                {/* <button className="btn btn-primary me-2">
                  <Link to={`/rfpdetailview/${rfp.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                    View
                  </Link>
                </button> */}
                <button className="btn btn-warning me-2">
                  <Link to={`/rfpedit`} style={{ color: 'black', textDecoration: 'none' }}>
                    Edit
                  </Link>
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteConfirmation(rfp)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {showDeleteConfirmation && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the RFP with ID {selectedRFP ? selectedRFP.id : ''}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFPList;
