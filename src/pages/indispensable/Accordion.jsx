import React, { useState, useEffect } from 'react';
import './styling/rfpstyle.css';
import { BsFillFileEarmarkTextFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';


function formatDateToDdMmmYyyy(date) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

const Accordion = () => {
    const itemsPerPage = 4; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [prod, setProd] = useState([
        { pid: 1, prodName: 'Monitor'},
        { pid: 2, prodName: 'Screws'},
        { pid: 3, prodName: 'Mouse'},
        { pid: 3, prodName: 'Keyboard'}
      ]);

      
  useEffect(() => {
    fetch('http://localhost:8080/allrfplist')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched vendors:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching RfpList:', error));
  }, []);

      // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleShowOnlyAvailable = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  const filteredItems = showOnlyAvailable ? items.filter((item) => item.isActive) : items;
  const currentItems = filteredItems.slice(startIndex, endIndex);
    
    
  return (
    <div>
        <div className= 'd-flex justify-content-end mx-5 mb-3'>
          <button
            className={`btn ${showOnlyAvailable ? 'btn-warning' : 'btn-primary'}`}
            onClick={toggleShowOnlyAvailable}
          >
            {showOnlyAvailable ? 'Show All' : 'Show Active Only'}
          </button>
        </div>
    {currentItems.map((item) => (
        <div key={item.rfp_id} className="accordion" id={`itemAccordion${item.rfp_id}`}>
                <div className="accordion-item">
                            <h6 className="accordion-header" id={`itemHeading${item.rfp_id}`}>
                                <button className="accordion-button" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#itemCollapse${item.rfp_id}`}>
                                    <BsFillFileEarmarkTextFill className="icon" />
                                    <h6 className='mx-3'>{item.buyerName}</h6>
                                    <h6 className='mx-1'>(Tender Id: {item.rfp_id})
                                    </h6>
                                      <span className={`badge ${item.isSplitable ? 'bg-success' : ''} text-white me-2 mx-3`}>
                                        {item.isSplitable ? 'Splitable' : ''}
                                      </span>
                                </button>
                                
                            </h6>

                            <div id={`itemCollapse${item.rfp_id}`} 
                            className="accordion-collapse collapse" 
                            aria-labelledby={`itemHeading${item.rfp_id}`} 
                            data-bs-parent={`#itemAccordion${item.rfp_id}`}>
                            <div className='accordion-body'>
                                <table id='acc-table'>
                                    <tr>
                                        <td>
                                        List of Products:
                                            {prod.map((pdt) => (
                                                <li>{pdt.prodName} </li>
                                            ))}
                                        </td>
                                        <td>
                                        Other Details:
                                                <p>Date Created: {formatDateToDdMmmYyyy(item.rfpCreationDate)}</p>
                                                <p>Tender Status: {item.isSplitable ? 'Open for Submissions' : 'Submission Closed'}</p>
                                                <p>Last Date of Submission: {formatDateToDdMmmYyyy(item.bidSubmissionDate)}</p>
                                        </td>
                                        <td className='button-row'>
                                        <Link to={`/bidsubmission/${item.id}`}>
                                            <button className='yes-button tender-view-button'>Submit Bid</button>
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                                
                            </div>
                            </div>
                    
                </div>
        </div>
    ))}
    <nav aria-label="Page navigation example">
        <ul className="pagination mt-4 d-flex justify-content-center">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Accordion;