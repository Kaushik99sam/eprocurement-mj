import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Navbar } from 'react-bootstrap';

const BidDetailView = () => {
  const { id } = useParams();
  const [bidData, setBidData] = useState([]);

  useEffect(() => {
    // Fetch bid data based on the id
    fetch(`http://localhost:8080/bid/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched bid data:', data);
        setBidData(data);
      })
      .catch(error => console.error('Error fetching bid data:', error));
  }, [id]);

  if (!bidData) {
    return <div>Bid not found.</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <Card style={{ width: '40rem' }}>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand>Bid Details</Navbar.Brand>
          </Navbar>

          <Card.Body>
            <Card.Title>
              <strong>Bid ID:</strong> {bidData.bidId}
            </Card.Title>
            <Card.Text>
              <p>
                <strong>RFP ID:</strong> {bidData.rfpId}
              </p>
              <p>
                <strong>List of Documents:</strong>
                <ul>
                  {bidData.documents ? (
                    bidData.documents.map((document, index) => (
                      <li key={index}>{document}</li>
                    ))
                  ) : (
                    <li>No documents available</li>
                  )}
                </ul>
              </p>
              <p>
                <strong>Vendor Name:</strong> {bidData.vendorName}
              </p>
              <p>
                <strong>Vendor ID:</strong> {bidData.vendorId}
              </p>
              <p>
                <strong>Bid Submission Date:</strong> {bidData.bidSubmissionDate}
              </p>
              <p>
                <strong>Bid Opening Date:</strong> {bidData.bidOpeningDate}
              </p>
              <p>
                <strong>Bid Creation Date:</strong> {bidData.bidCreationDate}
              </p>
              <p>
                <strong>Is Active:</strong> {bidData.isActive ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Is Draft:</strong> {bidData.isDraft ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Price:</strong> ${bidData.price}
              </p>
            </Card.Text>
            <Button variant="primary">
              <Link to="/vendorhome" style={{ color: 'black', textDecoration: 'none' }}>
                Go Back
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BidDetailView;
