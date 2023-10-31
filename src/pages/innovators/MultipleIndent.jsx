import React, { useState } from "react";
import AddProduct from "./AddIndentProduct";
import { useNavigate } from "react-router-dom";
import "./styling/styles.css";


const MultipleIndent = () => {
    const [addedProducts, setAddedProducts] = useState([]);
    const [firstButtonClick, setFirstButtonClick] = useState(false);
    const navigate = useNavigate();


    const handleFirstButtonClick = () => {
        const updatedProducts = [
            ...addedProducts,
            <AddProduct key={addedProducts.length} />,
        ];
        setAddedProducts(updatedProducts);
        setFirstButtonClick(true);
    };

    const handleSecondButtonClick = () => {
        navigate('/indentlist');
    };

    return (
        <>
            <div className="mb-5">
                {addedProducts.map((product, index) => (
                    <div key={index}>{product}</div>
                ))}
                <div>
                <button className="btn btnn m-5 mb-0 mt-1" onClick={handleFirstButtonClick}>
                    Add Product
                </button>
                {firstButtonClick && (
                    <div style={{marginLeft:'80%'}}>
                    <button
                    className="btn btnn m-5 mt-0 ps-3 pe-3"
                    onClick={handleSecondButtonClick}
                    style={{background:"green"}}
                >
                    Submit Indent
                </button></div>
                    
            )}
            </div>
            </div>
            
        </>
    );
};

export default MultipleIndent;
