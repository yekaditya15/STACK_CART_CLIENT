// About.jsx

import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/AboutStyles.css"; // Import your About page styles

const About = () => {
  return (
    <Layout title={"About us - Stack Cart"}>
      <div className="container about-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="About us"
              className="about-image"
            />
          </div>
          <div className="col-md-6">
            <div className="about-text">
              <h2>About StackCart</h2>
              <p>
                StackCart, your ultimate online destination for a diverse
                collection of watches, offers a seamless shopping experience.
                From classic elegance to modern sophistication, we curate
                timepieces that blend style and innovation.
              </p>
              <p>
                Our user-friendly platform ensures an enjoyable journey, making
                StackCart the trusted choice for quality watches that tell a
                unique story of individuality and fashion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
