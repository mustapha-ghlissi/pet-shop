import styled from "styled-components";

const Title = styled.h1`
font-size: 68px;
font-weight: bold;
@media (max-width: 768px) {
    font-size: 51px;
  }
`;

const Titleh2 = styled.h2`
font-size: 50px;
line-height: 1.1em;
font-weight: bold;
@media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Titleh4 = styled.h4`
font-size: 20px;
line-height: 1.1em;
font-weight: bold;
`;


export { Title, Titleh2,Titleh4 };
