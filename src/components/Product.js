import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { removeItemFromShoppingCart} from "../reducers/shoppingCartReducer";

const Product = ({ width, glassId, glasses, color, type, colorHex, ...rest }) => {
  const {addRemove} = rest ;
  const dispatch = useDispatch();

  const removeFromShoppingCart = () => {
    const data = { cartId:rest.cartId, glassId, color, type };
    dispatch(removeItemFromShoppingCart(data));
  };

  return (
    <ProductWrapper width={width} className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex-1">
          <img src={glasses} alt={`glasses-${glassId}`} />
        </div>
        <div className="flex-1 flex flex-col justify-around items-center">
          {addRemove && (
            <RemoveItem>
              <img
                onClick={removeFromShoppingCart}
                src="https://www.owloptics.com/assets/remove_item-163b93addbf5c9b20b2a435570fff5a0.png"
                alt="remove-item"
              />
            </RemoveItem>
          )}

          <div>{glassId.toLocaleUpperCase()}</div>
          <div className="flex flex-row justify-center items-center">
            <div className="px-1"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <ColorFrame color={colorHex} className="flex-1 text-center">
          {color}
        </ColorFrame>
        <ColorLenses
          className="flex-1 text-center"
          color={type === "glasses" ? "gray" : "black"}
        >
          {type}
        </ColorLenses>
      </div>
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  width: ${({ width }) => width}vw;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const RemoveItem = styled.div`
  align-self:flex-end;
  width:2rem;
  margin-left:1rem;
  cursor:pointer;
`;

const ColorFrame = styled.div`
    line-height:2rem;
    height:2rem;
    background-color:${({color})=> color};
    color:white;
`;
const ColorLenses = styled.div`
    line-height:2rem;
    height:2rem;
    background-color:${({color})=> color};
    color:white;
`;
export default Product;
