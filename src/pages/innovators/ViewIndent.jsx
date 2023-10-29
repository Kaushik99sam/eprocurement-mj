import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styling/styles.css";


const ViewIndents = (props) => {
  const [indents, setIndents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = `http://localhost:8080/mj/indentall/${props.headerId}`;
        const response = await axios.get(apiEndpoint);
        const fetchedIndents = response.data;

        if (Array.isArray(fetchedIndents)) {
          setIndents(fetchedIndents);
        } else if (typeof fetchedIndents === "object") {
          setIndents([fetchedIndents]);
        } else {
          console.error("Unexpected data format:", fetchedIndents);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching indents:", error);
      }
    };

    fetchData();
  }, [props.headerId]);

  return (
    <div className="container" style={{ marginTop: '10%' }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="card mb-3" style={{ background: "#176B87", color: "#EEEEEE" }}>
          <div className="card-body">
            {Array.isArray(indents) ? (
              indents.map((indent, index) => (
                <div key={index}>
                  <h5 className="card-title"><u style={{color:"black"}}>Product:</u></h5>
                  {indent.indentId && <p>IndentId: {indent.indentId}</p>}
                  {indent.indentCode && <p>IndentCode: {indent.indentCode}</p>}
                  {indent.unitPrice && <p>UnitPrice: {indent.unitPrice}</p>}
                  {indent.totalPrice && <p>Totalprice: {indent.totalPrice}</p>}
                  {indent.quantity && <p>Quantity: {indent.quantity}</p>}
                  {indent.createdAt && <p>CreatedAt: {indent.createdAt}</p>}
                  {/* {indent.indentHeaderVO?.indentHeaderId && (
                    <p>IndentheadeId: {indent.indentHeaderVO.indentHeaderId}</p>
                  )} */}
                  {/* {indent.indentHeaderVO?.netprice && (
                    <p>Netprice: {indent.indentHeaderVO.netprice}</p>
                  )} */}
                </div>
              ))
            ) : (
              <div>
                {indents.indentId && <p>IndentId: {indents.indentId}</p>}
                {indents.indentCode && <p>IndentCode: {indents.indentCode}</p>}
                {indents.unitPrice && <p>UnitPrice: {indents.unitPrice}</p>}
                {indents.totalPrice && <p>Totalprice: {indents.totalPrice}</p>}
                {indents.quantity && <p>Quantity: {indents.quantity}</p>}
                {indents.createdAt && <p>CreatedAt: {indents.createdAt}</p>}
                {/* {indents.indentHeaderVO?.indentHeaderId && (
                  <p>IndentheadeId: {indents.indentHeaderVO.indentHeaderId}</p>
                )} */}
                {/* {indents.indentHeaderVO?.netprice && (
                  <p>Netprice: {indents.indentHeaderVO.netprice}</p>
                )} */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewIndents;
