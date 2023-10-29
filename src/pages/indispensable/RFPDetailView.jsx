
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Navbar } from 'react-bootstrap'; // Import Bootstrap components

const RFPDetailView = () => {
  const { id } = useParams();
  const [rfpData, setRfpData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/rfp1/382")
      .then(response => response.json())
      .then(data => {
        console.log('Fetched dummy data:', data);
        setRfpData(data);
      })
      .catch(error => console.error('Error fetching dummy data:', error));
  }, []);


  // // Define the JSON data here for RFPDetailView based on the 'id' parameter
  // const rfpData = [
  //   {
  //                 id: '1',
  //                 name: 'RFP 1',
  //                 measuringUnit: 'Unit',
  //                 price: 1000,
  //                 vendorList: [{ id: 1, name: 'Vendor 1' }, { id: 2, name: 'Vendor 2' }],
  //                 attachedDocuments: ['Document 1', 'Document 2'],
  //                 rfpSplit: true,
  //                 bidSubmissionDate: '2023-10-10',
  //                 bidOpeningDate: '2023-10-15',
  //                 bidCreationDate: '2023-09-30',
  //               },
  //               {
  //                 id: '2',
  //                 name: 'RFP 2',
  //                 measuringUnit: 'Kg',
  //                 price: 1500,
  //                 vendorList: [{ id: 3, name: 'Vendor 3' }],
  //                 attachedDocuments: ['Document 3'],
  //                 rfpSplit: false,
  //                 bidSubmissionDate: '2023-10-12',
  //                 bidOpeningDate: '2023-10-18',
  //                 bidCreationDate: '2023-09-28',
  //               },
  //               {
  //                 id: '3',
  //                 name: 'RFP 3',
  //                 measuringUnit: 'Each',
  //                 price: 800,
  //                 vendorList: [{ id: 4, name: 'Vendor 4' }],
  //                 attachedDocuments: ['Document 4', 'Document 5'],
  //                 rfpSplit: true,
  //                 bidSubmissionDate: '2023-10-08',
  //                 bidOpeningDate: '2023-10-20',
  //                 bidCreationDate: '2023-09-25',
  //               },
  //               {
  //                 id: '4',
  //                 name: 'RFP 4',
  //                 measuringUnit: 'Meter',
  //                 price: 1200,
  //                 vendorList: [{ id: 5, name: 'Vendor 5' }],
  //                 attachedDocuments: ['Document 6'],
  //                 rfpSplit: false,
  //                 bidSubmissionDate: '2023-10-14',
  //                 bidOpeningDate: '2023-10-25',
  //                 bidCreationDate: '2023-09-22',
  //               },
  // ];

  //const rfp = rfpData.find((data) => data.id === id);

  // if (!rfp) {
  //   return <div>RFP not found.</div>;
  // }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <Card style={{ width: '40rem' }}>
          {/* Blue Navbar within the Card */}
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand>RFP Details</Navbar.Brand>
          </Navbar>

          <Card.Body>
            <Card.Title>
              <strong>RFP ID:</strong> {rfpData.id}
            </Card.Title>
            <Card.Text>
              <p>
                <strong>RFP Name:</strong> {rfpData.id}
              </p>
              <p>
                <strong>Measuring Unit:</strong> {rfpData.buyerName}
              </p>
              <p>
                <strong>Price:</strong> ${rfpData.estimatedPrice}
              </p>
              {/* <div>
                <strong>Vendor List:</strong>
                <ul>
                  {(rfpData.vendoList).map((vendor) => (
                    <li>{vendor}</li>
                  ))}
                </ul>
              </div> */}
              <div>
                <strong>Attached Documents:</strong>
                <ul>
                {rfpData.docNameList.map((document, index) => (
                            <li key={index}>{document}</li>
                          ))}
                </ul>
              </div>
              <p>
                <strong>RFP Split:</strong> {rfpData.splitable ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Bid Submission Date:</strong> {rfpData.bidSubmissionDate}
              </p>
              <p>
                <strong>Bid Opening Date:</strong> {rfpData.bidOpeningDate}
              </p>
              <p>
                <strong>Bid Creation Date:</strong> {rfpData.rfpCreationDate}
              </p>
            </Card.Text>
            <Button variant="primary">
              <Link to="/rfplist" style={{ color: 'black', textDecoration: 'none' }}>Go Back</Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RFPDetailView;
