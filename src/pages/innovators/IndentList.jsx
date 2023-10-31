import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ViewIndents from './ViewIndent';
import EditIndent from './EditIndent';
import "./styling/styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const IndentList = () => {
  const [items, setItems] = useState([]);
  const [showviewModal, setviewAddModal] = useState(false); 
  const [showeditModal, seteditAddModal] = useState(false); 
  const [selectedHeaderId, setSelectedHeaderId] = useState(0);
  const navigate=useNavigate();

  const fetchApiData = async () => {
    try {
      const response = await fetch('http://localhost:8080/mj/indentheader');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleDeleteItem = async (id) => {
    let x=window.confirm("Are You Sure? You want to delete.");
    if(x===true){
      handleDeleteItem2(id);
    }
  }

  const handleDeleteItem2 = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/mj/indentheader/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedItems = items.filter((item) => item.indentHeaderId !== id);
        setItems(updatedItems);
      } else {
        console.error('Error deleting item:', response);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }

  };

  const handleHover = () => {
    document.getElementById("indadd").style.color="black";
    document.getElementById("indadd").style.backgroundColor="white";
  }

  const handleHover2 = () => {
    document.getElementById("indadd").style.color="white";
    document.getElementById("indadd").style.backgroundColor="#176b87";
  }

  const handleViewItemClick = (headerId) => {
    // console.log(headerId);
    setSelectedHeaderId(headerId); // Set the selected headerId
    setviewAddModal(true);
  };

  const handleEditItemClick = (headerId) => {
    // console.log(headerId);
    setSelectedHeaderId(headerId); // Set the selected headerId
    seteditAddModal(true);
  };

  const handleCreateIndentClick = (headerId) => {
    // console.log(headerId);
    setSelectedHeaderId(headerId); // Set the selected headerId
    navigate('/rfpform');
  };

  return (
    <div className="container mycontainer">
      <div className="card" style={{ marginTop: '5%' }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h1>Indent List</h1>
          <Link style={{width:"150px", color:"white"}} onMouseEnter={handleHover} onMouseLeave={handleHover2} className="btn btnn" id="indadd" to="/addindent2">
            Add
          </Link>
        </div>
        <div className="card-body">
          {items.length === 0 ? (
            <h6>No Data Found</h6>
          ) : (
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Netprice</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody className='justify-content-center text-center'>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.indentHeaderId}</td>
                    <td>{item.description}</td>
                    <td>{item.netprice}</td>
                    <td>
                      <button
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleDeleteItem(item.indentHeaderId)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleViewItemClick(item.indentHeaderId)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleEditItemClick(item.indentHeaderId)}
                      >
                        <i className="bi bi-pen"></i>
                      </button>
                      <button
                        className='btn btn-success'
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleCreateIndentClick(item.indentHeaderId)}
                      >
                        Create RFQ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
     
      {showviewModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title"><u><b>Indent Detail</b></u></h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setviewAddModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                 
                <ViewIndents headerId={selectedHeaderId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showeditModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title"><b><u>Edit Indent Header</u></b></h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => seteditAddModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                 
                  <EditIndent headerId={selectedHeaderId}></EditIndent>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};



export default IndentList;
