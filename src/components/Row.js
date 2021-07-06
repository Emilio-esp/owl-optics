import React from "react";
import styled from "styled-components";

const Row = ({children, directionColumn, margin}) => {
  return (
    <RowContainer directionColumn={directionColumn} margin={margin}>
      {children}
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  margin: ${({margin}) => (margin ? `${margin}rem 0` : "0")};
  display: flex;
  justify-content:space-around;
  flex-direction: ${({ directionColumn }) =>
    directionColumn ? "column" : "row"};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;
export default Row;
