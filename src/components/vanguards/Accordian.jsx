import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductPrice,
  increaseProductPrice,
  modifyProductPrice,
  productState,
} from "../../slices/productSlice";

export default function Accordian({ productVendor }) {
  const { product, vendorBid } = productVendor;

  return (
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#k${productVendor.product.id}`}
            aria-expanded="true"
            aria-controls={`k${productVendor.product.id}`}
          >
            <div className="container text-center p-0 m-0">
              <div class="row">
                <div class="col">Name: {product.name}</div>
                <div class="col">Price: ₹{product.estPrice}</div>
                <div class="col">Unit Of Measurement: {product.uom}</div>
                <div class="col">Quantity: {product.qty}</div>
              </div>
            </div>
          </button>
        </h2>
        <div
          id={`k${productVendor.product.id}`}
          class="accordion-collapse collapse show"
        >
          <div class="accordion-body">
            <ul class="list-group">
              {vendorBid.map((vb, index) => (
                // console.log("vb",vb)
                <LiComp vb={vb} pid={product.id} refId={vb.refId} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiComp({ vb, pid,refId }) {
  const checkboxRef = useRef();
  const dispatch = useDispatch();
  function handleChange(e) {
    if (checkboxRef.current.checked) {
      dispatch(addProductPrice({total:checkboxRef.current.value,refId}));
    } else {
      dispatch(modifyProductPrice({total:checkboxRef.current.value,refId}));
    }
  }

  return (
    <li class="list-group-item">
      <input
        class="form-check-input me-1"
        type="checkbox"
        name={`p${pid}`}
        value={vb.bidPrice}
        id={`k${vb.vendor.vendorId}p${pid}`}
        ref={checkboxRef}
        onChange={handleChange}
      />
      <label class="form-check-label" for={`k${vb.vendor.vendorId}p${pid}`}>
        <span className="text-primary ps-3">Name: {vb.vendor.name}</span>
        <span className="text-primary ps-3">Bid Price: ₹{vb.bidPrice}</span>
      </label>
    </li>
  );
}
