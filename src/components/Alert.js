import React from 'react';
import styled, {keyframes} from 'styled-components';

const Alert = ({
  type,
  message = "Your Information Account has been updated successfuly!",
  color,
  setShowAlert
}) => {
  return (
    <AlertWrapper
      onAnimationEnd={() => setShowAlert(false)}
      className={`${color} p-1 sub-title-text mt-0`}
    >
      <span className="text-white">{message}</span>
    </AlertWrapper>
  );
};

const alerAnimation = keyframes`
    from{
        opacity: 1
    }
    to{
        opacity:0;
    }
`;

const AlertWrapper = styled.div`
    animation: ${alerAnimation} 4s forwards linear;
`;

export default Alert
