import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "../styles/category.css";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="custom-link">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
