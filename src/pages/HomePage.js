import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../components/context/cart";
import axios from "axios";
import { message } from "antd";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import Slider from "react-slick";
import API_BASE from "../hooks/apiUrl";
import "../styles/Homepage.css";

const { Panel } = Collapse;

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        API_BASE + "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        API_BASE + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        API_BASE + "/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        API_BASE + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilterCategory = (value) => {
    setChecked(value);
  };

  const handleFilterPrice = (value) => {
    setRadio(value);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      setFilterLoading(true);
      const { data } = await axios.post(
        API_BASE + "/api/v1/product/product-filters",

        {
          checked,
          radio,
        },
        {
          withCredentials: true,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      message.success("Quantity Updated in Cart");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
      message.success("Item Added to Cart");
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <img
        src="/images/banner1.svg"
        className="banner-img"
        alt="bannerimage"
        style={{ width: "100%" }}
      />
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filters</h4>
          <Collapse defaultActiveKey={[]}>
            <Panel header="Filter By Category" key="category">
              <Checkbox.Group
                style={{ width: "100%" }}
                value={checked}
                onChange={(values) => handleFilterCategory(values)}
              >
                {categories?.map((c) => (
                  <Checkbox key={c._id} value={c._id}>
                    <strong>{c.name}</strong>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
            <Panel header="Filter By Price" key="price">
              <div className="d-flex flex-column">
                <Radio.Group
                  onChange={(e) => handleFilterPrice(e.target.value)}
                >
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>
                        <strong>{p.name}</strong>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </Panel>
          </Collapse>
          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <div className="d-flex flex-wrap">
            {filterLoading ? (
              <div className="text-center w-100">
                <p>Loading...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((p) => (
                <div className="card m-2" key={p._id}>
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
                      {p.description?.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn amazon-btn more-details-btn ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn amazon-btn add-to-cart-btn ms-1"
                        onClick={() => handleAddToCart(p)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-100">
                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  No products found.
                </p>
              </div>
            )}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
