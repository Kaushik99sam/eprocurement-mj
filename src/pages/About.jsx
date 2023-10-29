import React from "react";
import banner from "../assets/about_us_banner.jpg";

const About = () => {
  return (
           <>
      <img
        src={banner}
        alt="Banner Image"
        className="img-fluid w-100" // Adjusted class to w-100 for full-width image
      />
      <div className="container mt-6">
        <div className="row">
          <div className="col-md-12">
            {/* Additional content goes here */}
          </div>
        </div>

        <h2 className="mt-4 mb-4">About E-Procurement</h2>
      </div>
      <div className="container mb-5">
        <p className="lead fw-normal"  style={{ paddingBottom: '5%' }}>
          e-Procurement, short for electronic procurement, refers to the use of
          digital technologies and online platforms to automate and streamline
          the procurement process within organizations. It involves the
          electronic creation, submission, and management of procurement-related
          documents and transactions. eProcurement systems often encompass
          various stages of the procurement lifecycle, including requisitioning,
          sourcing, bidding, purchasing, and invoicing. Key features of
          eProcurement systems include online catalogs, vendor management,
          electronic request for proposals (RFPs), automated workflows, and
          digital approval processes. These systems are designed to enhance
          efficiency, reduce manual errors, increase transparency, and provide
          better control and visibility into the procurement activities of an
          organization. By leveraging technology, eProcurement aims to optimize
          the procurement process, improve collaboration between buyers and
          suppliers, and drive cost savings.
        </p>
      </div>
    </>
  );
};

export default About;

