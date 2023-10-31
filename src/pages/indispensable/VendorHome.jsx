
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Accordion from './Accordion';
import './styling/rfpstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const ItemList = () => {

  const [userName, setUserName] = useState('');
  const userNameApiEndpoint = 'http://localhost:3050/userName';

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
  }, []);

  return (
    <div className="translucent-form">
      <div className="user-info">
          {userName !== '' ? (
            <span>Welcome, {userName}</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <h4>List of Tenders available for you:</h4>
      <div>
        
        <Accordion />
        {/* Add a Link to the Bid Detail View page
        <Link to="/biddetailview/:id">
          <button>View Tender</button>
        </Link> */}
      </div>
    </div>
  );
};

export default ItemList;
