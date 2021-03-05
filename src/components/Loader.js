import React from "react";
import styled, { keyframes } from "styled-components";

function Loader() {
  return (
    <div className="w-full h-80 flex justify-center items-center">
      <LoaderContainer>
        <div></div>
        <div></div>
        <div></div>
      </LoaderContainer>
    </div>
  );
}
const loaderAmination = keyframes`
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(360deg);
    }
`;

const LoaderContainer = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;

  & div {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-width: 0.3rem;
    border-style: solid;
    border-color: gray transparent transparent transparent;
    animation: ${loaderAmination} 1.2s infinite cubic-bezier(0.5, 0, 0.5, 1);
  }

  
  & div:nth-child(1){
      animation-delay:-0.45s; 
  }
  & div:nth-child(2){
      animation-delay:-0.3s; 
  }
  & div:nth-child(3){
      animation-delay:-0.15s; 
  }
`;

export default Loader;
