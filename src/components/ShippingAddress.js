import React from "react";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import countries from "../utils/shippingAvailable.json";



const ShippingAddress = () => {
    const user = useSelector(state => state.user?.data) || {};

    const getCountry = ( code ) => {
      if (!code) return "";

      return countries[code].name;
    }

    const getStatefromCountry = (country, stateCode) => {
      if (!country || !stateCode) return "";

      return countries[country].states.find((state) => state.code === stateCode).name;
    };

    return (
      <AddressWrapper className="px-8 py-12 ">
        <h1 className="w-full font-arial font-semibold tracking-widest text-lg">
          Ship to
        </h1>
        <p className="text-sm">
          {user.name} {user.surname}
        </p>
        <p className="text-sm">{user.address}</p>
        <p className="text-sm">{getCountry(user.country)}</p>
        <p className="text-sm">
          {getStatefromCountry(user.country, user.state)}
        </p>
        <p className="text-sm">{user.phone}</p>
        <Link
          to="/costumer/edit"
          className="sm:text-xs bg-gray-400 uppercase text-white text-center tracking-widest hover:bg-black cursor-pointer block w-full p-4 my-8"
        >
          Change Information
        </Link>
      </AddressWrapper>
    );
}

const AddressWrapper = styled.div`
  width: 30rem;
  @media (min-width: 1024px) {
    width: 40rem;
  }
`;

export default ShippingAddress;