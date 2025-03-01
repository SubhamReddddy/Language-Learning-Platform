import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card: FC<{ title: number }> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <div className="card cursor-pointer bg-gradient-to-br from-green-400 to-blue-500">
        <div className="card-details">
          <p className="text-title">Assingment {title + 1}</p>
          <p className="text-body">Hover to see details</p>
        </div>
        <button
          className="card-button"
          onClick={() => {
            navigate(`review/${title}`);
          }}
        >
          More info
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: max-content;
    height: 254px;
    border-radius: 20px;
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
  }

  .card-details {
    color: white;
    height: 100%;
    gap: 0.5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #008bf8;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .text-body {
    color: rgb(200, 255, 255);
  }

  /*Text*/
  .text-title {
    font-size: 1.5em;
    font-weight: bold;
  }

  /*Hover*/
  .card:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;

export default Card;
