// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../hooks/apiUrl";

// CategoryProduct component
const CategoryProduct = () => {
  // Get the category slug from the URL params
  const params = useParams();
  const navigate = useNavigate();

  // State variables for products, category, and loading status
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when the category slug changes
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  // Function to fetch products based on the category
  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        API_BASE + `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Layout component for consistent styling
    <Layout>
      <div className="container mt-3 category">
        {loading ? (
          // Loading state
          <div
            className="text-center"
            style={{
              minHeight: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            <p>Loading...</p>
          </div>
        ) : (
          // Display products
          <>
            <h4 className="text-center">Category - {category?.name}</h4>
            <h6 className="text-center">{products?.length} results found </h6>
            <div className="row">
              <div className="col-md-9 offset-1">
                <div className="d-flex flex-wrap justify-content-around">
                  {products?.map((p) => (
                    <div
                      className="card m-2"
                      key={p._id}
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={`${API_BASE}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <div className="card-name-price">
                          <h5 className="card-title">{p.name}</h5>
                          <h5 className="card-title card-price">
                            {p.price.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </h5>
                        </div>
                        <p className="card-text ">
                          {p.description.substring(0, 60)}...
                        </p>
                        <div className="card-name-price">
                          <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

// Export the CategoryProduct component
export default CategoryProduct;
