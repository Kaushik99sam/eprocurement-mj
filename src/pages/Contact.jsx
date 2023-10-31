import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData); // You can replace this with your API call or other actions
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mb-5">
      <div className="card p-2 mt-4" style={{ width: '35%', marginBottom: '5%' }}>
        <div className="card-body p-2 ">
          <h2 className="card-title text-center">Contact Us</h2>
          <p className="text-center mb-1 small">Phone: +1 (123) 456-7890</p>
          <p className="text-center mb-1 small">Email: example@example.com</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn btnn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
