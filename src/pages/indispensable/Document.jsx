import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function FileInput(props) {
  const [documentData, setDocumentData] = useState([]);
  const [rfpData, setRfpData] = useState([]);

 // console.log(props);
  
  const addDocumentLink = () => {
    const newDocument = { type: 'Select Type', link: '' };
    setDocumentData([...documentData, newDocument]);
  };

  const handleLinkChange = (index, event) => {
    const newDocumentData = [...documentData];
    newDocumentData[index].link = event.target.value;
    setDocumentData(newDocumentData);
  };
 // console.log(this.props.var1);
  // useEffect(() => {
  //   fetch("http://localhost:8080/rfp1/214")
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Fetched dummy data:', data);
  //       setRfpData(data);
  //     })
  //     .catch(error => console.error('Error fetching dummy data:', error));
  // }, []);

  const handleTypeChange = (index, event) => {
    const newDocumentData = [...documentData];
    newDocumentData[index].type = event.target.value;
    setDocumentData(newDocumentData);
  };

  const documentTypes = ['Select Type', 'Adhar', 'PAN', 'Passport', 'Other'];

  return (
    <Form>
      {documentData.map((document) => (
        <div  className="mb-3 p-3 border border-secondary rounded">
          <Form.Group controlId={`documentType${document}`}>
            <Form.Label className="fw-bold">Document Type</Form.Label>
            <Form.Control
              as="select"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    value={document}
              //onChange={(event) => handleTypeChange(index, event)}
            >
              {/* {documentTypes.map((type, typeIndex) => (
                <option key={typeIndex}>{type}</option>
              ))} */}
            </Form.Control>

          </Form.Group>

          <Form.Group controlId={`documentLink${document}`}>
            <Form.Label className="fw-bold ">Document Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the link to the document"
              value={document}
              //onChange={(event) => handleLinkChange(index, event)}
            />

            {/* <Form.Text className="text-muted">
              Please provide the URL for this document.
            </Form.Text> */}
            
          </Form.Group>
        </div>
      ))}
      <Button variant="secondary" onClick={addDocumentLink}>
        <FontAwesomeIcon icon={faPlus} /> Add More Document
      </Button>
    </Form>
  );
}

export default FileInput;
