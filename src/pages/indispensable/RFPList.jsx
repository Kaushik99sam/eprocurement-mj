import React, { useState, useEffect } from "react";
import { Link , useParams,  } from 'react-router-dom';


const RFPList = () => {
  // Define your RFP data

  const [rfpData,setRfpData] = useState([]);
  // const rfpData = [
  //   {
  //     id: 1,
  //     rfpName: 'RFP 1',
  //     bidCreationDate: '2023-10-01',
  //     bidOpeningDate: '2023-10-10',
  //     bidSubmissionDate: '2023-10-15',
  //     documents: ['Document 1', 'Document 2'],
  //     vendors: ['Vendor 1', 'Vendor 2'],
  //     active: true, // Set to true for the "Active" badge
  //   },
  //   {
  //     id: 2,
  //     rfpName: 'RFP 2',
  //     bidCreationDate: '2023-10-02',
  //     bidOpeningDate: '2023-10-12',
  //     bidSubmissionDate: '2023-10-17',
  //     documents: ['Document 3', 'Document 4'],
  //     vendors: ['Vendor 3', 'Vendor 4'],
  //     active: false, // Set to false for no badge
  //   },
  //   {
  //     id: 3,
  //     rfpName: 'RFP 3',
  //     bidCreationDate: '2023-10-03',
  //     bidOpeningDate: '2023-10-14',
  //     bidSubmissionDate: '2023-10-18',
  //     documents: ['Document 5', 'Document 6'],
  //     vendors: ['Vendor 5', 'Vendor 6'],
  //     active: true, // Set to true for the "Active" badge
  //   },
  //   {
  //     id: 4,
  //     rfpName: 'RFP 4',
  //     bidCreationDate: '2023-10-04',
  //     bidOpeningDate: '2023-10-16',
  //     bidSubmissionDate: '2023-10-19',
  //     documents: ['Document 7', 'Document 8'],
  //     vendors: ['Vendor 7', 'Vendor 8'],
  //     active: false, // Set to false for no badge
  //   },
  // ];

  useEffect(() => {
    fetch("http://localhost:8080/rfplist/1")
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

  // Define the state variables
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting by creation date
  const sortedRFPData = [...rfpData].sort(
    (a, b) => new Date(b.bidCreationDate) - new Date(a.bidCreationDate)
  );

  // Filtering based on the search term and active status
  const filteredRFPData = sortedRFPData.filter((rfp) => {
    return ( null
      // (rfp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //   rfp.id.toString().includes(searchTerm)) &&
      // (!showActiveOnly || rfp.active)
    );
  });

  return (
    <div className="translucent-form">
      <h1>List of RFP</h1>

      <div className="d-flex justify-content-end mb-3 primary">
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search RFPs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-${showActiveOnly ? 'primary' : 'success'}`}
          onClick={() => setShowActiveOnly(!showActiveOnly)}
        >
          {showActiveOnly ? 'Show All' : 'Show Active Only'}
        </button>
      </div>

      {rfpData.map((rfp) => (
        <div key={rfp.id} className="accordion" id={`rfpAccordion${rfp.id}`}>
          <div className={`${rfp.active ? '' : ''}`}>
            <h2 className="accordion-header" id={`rfpHeading${rfp.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#rfpCollapse${rfp.id}`}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    RFP ID: {rfp.rfp_id} - {rfp.name}
                  </div>
                  {rfp.isPublish && (
                    <span className="badge bg-success">Active</span>
                  )}
                </div>
              </button>
            </h2>
            <div
              id={`rfpCollapse${rfp.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`rfpHeading${rfp.id}`}
              data-bs-parent={`#rfpAccordion${rfp.id}`}
            >
              <div className="accordion-body">
                <table className={`table ${rfp.active ? 'bg-primary' : ''}`}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Document List</th>
                      <th style={thStyle}>Vendor List</th>
                      <th style={thStyle}>Dates</th>
                      <th style={thStyle}>View Bid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          {rfp.docNameList.map((document, index) => (
                            <li key={index}>{document}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {rfp.vendoList.map((vendor, index) => (
                            <li key={index}>{vendor}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Creation Date: {rfp.rfpCreationDate}</li>
                          <li>Opening Date: {rfp.bidOpeningDate}</li>
                          <li>Submission Date: {rfp.bidSubmissionDate}</li>
                        </ul>
                      </td>
                      <td>
                        <Link to={`/viewbids/${rfp.id}`}>
                          <button className="btn btn-success">View Bid</button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RFPList;

