import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loadItemsFromLocalStorage } from "../reducers/shoppingCartReducer"

import CartBag from "../images/cart.svg";
import styled from "styled-components";
import Product from "./Product";
import Loader from "./Loader";

const ShoppingCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadItemsFromLocalStorage());
  }, [dispatch]);

  return (
    <Cart className="bg-gray-100 flex items-center sm:absolute top-3 right-1/4 sm:right-20 sm:top-8 md:top-8 md:right-14 text-gray-900 font-medium text-sm tracking-widest cursor-default">
      <img
        height="15"
        width="25"
        className="p-1"
        src={CartBag}
        alt="shopping-cart"
      />
      <span className="hidden sm:contents">My Bag</span> (
      <span className="p-1 main-font text-gray-900">
        {shoppingCart.data.length}
      </span>
      )
      <Wrapper className="products-shopping-cart z-30">
        {shoppingCart.loading && <Loader />}

        <Border>
          {shoppingCart.data.map((product, index) => (
            <Product key={`product-${index}`} {...product} addRemove={true} />
          ))}
          <div className="flex flex-row py-2">
            <div className="flex-1 text-center">Total</div>
            <div className="flex-1 text-center">
              {shoppingCart.data.reduce(
                (acc, cp) => (acc += parseInt(cp.price)),
                0
              )}
              {` EUR`}
            </div>
          </div>
          {shoppingCart.data.length ? (
            <Link
              to="/costumer/checkout"
              className="sm:text-xs bg-gray-400 uppercase text-white text-center tracking-widest hover:bg-black cursor-pointer block w-full p-4"
            >
              Check Out
            </Link>
          ) : (
            <Link
              to="/shop"
              className="sm:text-xs bg-gray-400 uppercase text-white text-center tracking-widest hover:bg-black cursor-pointer block w-full p-4"
            >
              Empty - Go Shipping
            </Link>
          )}
        </Border>
      </Wrapper>
    </Cart>
  );
};

const Cart = styled.div`
  &:hover .products-shopping-cart {
    display: block;
  }
`;

const Border = styled.div`
    border:1px solid rgba(0,0,0,0.5);
`;

const Wrapper = styled.div`
  display: none;
  top: 100%;
  right: 0;
  padding: 0.5rem;
  width: 18rem;
  background-color: white;
  cursor: default;
  position: absolute;
  overflow-y: scroll;
  max-height: 70vh;

  @media (max-width: 767px) {
    right: 0%;
    transform:translateX(-10%);
  }
`;

export default ShoppingCart;
