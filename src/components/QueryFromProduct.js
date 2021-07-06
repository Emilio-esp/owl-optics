import React, { useRef, useState } from "react";
import styled from "styled-components";

const QueryFromProduct = ({ question, answer }) => {
  const answerRef = useRef(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    if (!showAnswer) {
      answerRef.current.style.maxHeight = "25rem";
    } else {
      answerRef.current.style.maxHeight = "0";
    }
    setShowAnswer(!showAnswer);
  };
  
  return (
    <div>
      <div className="text-center">
        <span
          className="p-tag border-b hover:border-black cursor-pointer"
          onClick={handleShowAnswer}
        >
          {question}
        </span>
      </div>
      <Answer ref={answerRef}>
        <div className="p-tag leading-6">{answer}</div>
        <div className="text-center p-4">
          <button
            className="sm:text-xs bg-gray-400 uppercase text-white text-center tracking-widest hover:bg-black cursor-pointer  p-1 "
            onClick={handleShowAnswer}
          >
            OKAY THANKS
          </button>
        </div>
      </Answer>
    </div>
  );
};

const Answer = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s linear;
  width: 80%;
  margin: 1rem auto;
`;

export default QueryFromProduct;
