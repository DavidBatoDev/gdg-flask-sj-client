import React from 'react';
import styled from 'styled-components';

const AddButton = ({ setIsModalOpen }) => {
  return (
    <StyledWrapper>
       <button className="Btn bg-blue-600" onClick={() => setIsModalOpen(true)}>
        <div className="sign">+</div>
        <div className="text">Add</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 50px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  }

  /* plus sign */
  .sign {
    width: 100%;
    height: 100%;
    font-size: 2em;
    color: white;
    transition-duration: .3s;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1em;
    font-weight: 500;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 20px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 20px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }`;

export default AddButton;
