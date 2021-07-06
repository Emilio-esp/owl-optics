import React from 'react';
import styled from 'styled-components';

const Column = ({ children, flexBasis, alignSelf, paddingTop }) => {
  
  return (
    <ColumnContainer
      className={`${
        paddingTop ? "pt-10 sm:pt-40 md:pt-52 lg:pt-80 p-2" : "p-2"
      }`}
      alignSelf={alignSelf}
      flexBasis={`${flexBasis}%`}
      paddingTop={paddingTop}
    >
      {children}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  width: ${({ flexBasis }) => flexBasis};
  align-self: ${({ alignSelf }) => alignSelf};

  @media (max-width: 640px) {
    width: 100%;
    align-self:center;
  }
`;

export default Column
