// Policy.jsx

import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/PolicyStyles.css"; // Import your Policy page styles

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container policy-container">
        <div className="policy-text">
          <h2>Privacy Policy</h2>

          <p>
            This Privacy Policy outlines how our ecommerce website collects,
            uses, maintains, and discloses information collected from users
            (each, a "User") of the website. This privacy policy applies to the
            website and all products and services offered by our ecommerce
            platform.
          </p>

          <h3>Personal Identification Information</h3>
          <p>
            We may collect personal identification information from Users in a
            variety of ways, including, but not limited to, when Users visit our
            site, register on the site, place an order, subscribe to the
            newsletter, and in connection with other activities, services,
            features, or resources we make available on our site.
          </p>

          <h3>Non-personal Identification Information</h3>
          <p>
            We may collect non-personal identification information about Users
            whenever they interact with our website. Non-personal identification
            information may include the browser name, the type of computer, and
            technical information about Users' means of connection to our site.
          </p>

          {/* Add more sections as needed */}

          <h3>Contact Information</h3>
          <p>
            If you have any questions about this Privacy Policy, the practices
            of this site, or your dealings with this site, please contact us at{" "}
            <a href="mailto:yekaditya11@gmail.com">yekaditya11@gmail.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
