import React, { useEffect, useState } from "react";
import Product from "./Product";
import QuickView from "./QuickView";
import axios from "axios";
import { setErrors, setProducts } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Rings } from "react-loader-spinner";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/products/view?page=${currentPage}&limit=6`
        )
        .then((res) => {
          dispatch(setProducts([...products, ...res.data]));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    };

    fetchData();
  }, []);

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const fetchMoreData = async () => {
    const nextPage = currentPage + 1;
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/products/view?page=${nextPage}&limit=6`
      )
      .then((res) => {
        dispatch(setProducts([...products, ...res.data]));
        setCurrentPage(nextPage); // Update the currentPage state
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <div className="text-gray-400 text-2xl">Something went wrong!</div>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto py-4 px-4 z-0">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length % 6 === 0}
        loader={
          <div className="w-full flex justify-center items-center my-2">
            <Rings color={"#f2f2f2"} height={60} width={60} />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }} className="text-gray-500 my-2">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-5">
          {products.map((product) => (
            <Product
              product={product}
              setSelectedProduct={setSelectedProduct}
              key={product.ProductID}
            />
          ))}
        </div>
      </InfiniteScroll>

      {selectedProduct && (
        <QuickView
          selectedProduct={selectedProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
};

export default Products;
