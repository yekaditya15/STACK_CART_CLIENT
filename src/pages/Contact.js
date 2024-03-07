import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/ContactStyles.css";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here if needed

    // Redirect to the homepage
    navigate("/");
  };

  return (
    <Layout title={"Contact-us"}>
      <div className="container contact-container">
        <div className="row">
          <div className="col-md-6">
            <h1>Contact Us</h1>
            <p>
              Feel free to reach out to us if you have any questions or
              inquiries. We're here to help!
            </p>
            <p>
              Email:{" "}
              <a href="mailto:yekaditya11@gmail.com">yekaditya11@gmail.com</a>
            </p>
            <p>Phone: +91 9666501513</p>
            <p>Address: Kakinada, Andhra Pradesh, India </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
