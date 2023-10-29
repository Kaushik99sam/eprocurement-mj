import React, { useState, useEffect } from 'react';
import './styling/rfpstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import {useParams } from "react-router-dom";


function formatDateToDdMmmYyyy(date) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}
function formatOrderTime(subTime) {
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return new Date(subTime).toLocaleTimeString(undefined, options);
}

const BidView = () => {
  const [userName, setUserName] = useState('');
  const userNameApiEndpoint = 'http://localhost:3050/userName';
  //   const itemsPerPage = 4; // Number of items per page
  //   const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [vendor, setVendor] = useState([
    { vid: 1, vendorName: 'Nirala Iron & Steel Co.', submitted: true, subDate: '2023/07/12', subTime: '2023-07-12T15:45:00Z' },
    { vid: 2, vendorName: 'Nirala TMT Bars', submitted: true, subDate: '2023/07/10', subTime: '2023-07-10T06:09:00Z' },
    { vid: 3, vendorName: 'Nirala Inc.', submitted: false, subDate: '2023/07/12', subTime: '2023-07-12T20:42:00Z' },
    { vid: 3, vendorName: 'Nirala Constructions', submitted: false, subDate: '2023/07/11', subTime: '2023-07-12T12:13:00Z' }
  ]);

  //       // Calculate the index range for the current page
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const currentItems = items.slice(startIndex, endIndex);

  //   // Handle page change
  //   const handlePageChange = (page) => {
  //     setCurrentPage(page);
  //   };

  useEffect(() => {
    fetch(userNameApiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user name:', data);
        // Check if the necessary properties exist before accessing them
        const userNameValue = data && data[0] && data[0].name;

        console.log('userNameValue:', userNameValue); // Log the userNameValue
        setUserName(userNameValue || '');
      })
      .catch(error => {
        console.error('Error fetching user name:', error);
        // Log the specific error message
        console.error('Error message:', error.message);
      });

    fetch("http://localhost:8080/rfp1/" + id)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched dummy data rfp:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching dummy data:', error));

      fetch("http://localhost:8080/fillbid/" + id)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched dummy data :', data);
        setVendor(data);
      })
      .catch(error => console.error('Error fetching dummy data:', error));



  }, []);

  return (
    <div className='translucent-form'>
      <div className="user-info">
        {userName !== '' ? (
          <span>Welcome, {userName}</span>
        ) : (
          <span>Welcome, User</span>
        )}
      </div>

      
        
          <div>
            <div className="create-rpf">
              <BsFillFileEarmarkTextFill className="icon" />
              <h6 className='mx-1'>{items.name}</h6>
              <h6 className='mx-1'>(Tender Id: {items.id})</h6>
            </div>
            <table className='mt-1'>
              <th>Vendor</th>
              <th>Submission Date; Time</th>
              <th>View</th>
              {vendor.map((vdr) => (
                <tr>
                  <td>
                    <span>{vdr.vendorName} </span> 
                    <span className={`badge ${vdr.bidStatus ? 'bg-success' : 'bg-warning'} text-white me-2 mx-3`}>
                      {vdr.bidStatus ? 'Submitted' : 'Pending'}
                    </span>
                  </td>

                  <td>
                    {<p>{formatDateToDdMmmYyyy(vdr.bidSubmissionDateTime)}; 
                    {formatOrderTime(vdr.bidCreationDateTime)}</p> }
                  </td>
                  <td className='button-row'>
                    <button className='yes-button tender-view-button'>
                      <BsFillFileEarmarkTextFill className="icon" /></button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        
        {/* <nav aria-label="Page navigation example">
        <ul className="pagination mt-4 d-flex justify-content-center">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav> */}
      </div>
    
  );
};

export default BidView;