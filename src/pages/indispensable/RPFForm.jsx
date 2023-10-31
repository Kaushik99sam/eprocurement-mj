// RPFForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsBox, BsLayers, BsQuestion, BsCurrencyRupee } from 'react-icons/bs';
import './styling/rfpstyle.css';

const RPFForm = () => {

  const [createRPF, setCreateRPF] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [userName, setUserName] = useState('');
  const dummyDataApiEndpoint = 'http://localhost:3040/dummyData';
  const userNameApiEndpoint = 'http://localhost:3050/userName'; // Replace with your actual API endpoint
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dummy data
    fetch(dummyDataApiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched dummy data:', data);
        setDummyData(data);
      })
      .catch(error => console.error('Error fetching dummy data:', error));

    // Fetch user name
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

  const handleCreateRPFChange = () => {
    setCreateRPF(!createRPF);

    // If 'Yes' is clicked, navigate to RFPEdit.js with the user name
    if (!createRPF) {
      navigate('/RFPEdit', { state: { dummyData, userName } });
    }
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

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><BsBox className="icon" /> Product ID</th>
                <th><BsFillPersonFill className="icon" /> Name</th>
                <th><BsQuestion className="icon" /> Product Unit</th>
                <th><BsLayers className="icon" /> Quantity</th>
                <th><BsCurrencyRupee className="icon" /> Estimated Price</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#f0f0f0' : 'white' }}>
                  <td>{item.indentId}</td>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="create-rpf mt-4">
          <div className="form-title">Do you want to create RFQ?</div>
          <div className="yes-no-buttons mx-3">
            <button className="yes-button" onClick={handleCreateRPFChange}>
              Yes, Let's Go!
            </button>
            <button className="no-button mx-1">No, Maybe Later</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPFForm;
