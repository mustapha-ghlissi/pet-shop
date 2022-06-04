import { Button} from "reactstrap";
import styled from "styled-components";

const ButtonPrimary = styled(Button)`
  background-color: #1ed760;
  border-color: #1ed760;
  vertical-align: middle;
    width: auto;
    margin: 0;
    font-family: Nunito,sans-serif;
    
    line-height: 1em;
    font-weight: 700;
    border-radius: 4px;
    padding: 14px 36px;
    font-size: 20px;
    cursor: pointer;

  &:hover {
    transition: all 0.1s linear;
    border-color: #ddd!important;
    background-color: #1ed760;
  }
`;
const ButtonPrimarySmall = styled(ButtonPrimary)`
    padding: 8px 24px;
    font-size: 14px;
`;

const ButtonSecondary = styled(ButtonPrimary)`
  background-color: #a7a7a7;
  color: white;
  border: 0;
  &:hover {
    background-color: #1ed760;
    transform: scale(1.1);
    transition: all 0.1s linear;
    color: #2941ab;
  }
`;

const ButtonWhite = styled(ButtonPrimary)`
  background-color: #ffffff1f;
  color: white;
  border-color:#fff;
  padding: 8px 24px;
    font-size: 18px;
  &:hover {
  }
`;
const ButtonError = styled(ButtonPrimary)`
  background-color: red;
  color: white;
  padding: 8px 24px;
    font-size: 14px;
`;

const ButtonPrimaryOutline = styled(ButtonPrimary)`
  background-color: #ffffff1f;
  color: #1ed760;
  border-color:#1ed760;
`;

export { ButtonPrimary, ButtonSecondary,ButtonWhite,ButtonPrimaryOutline,ButtonError,ButtonPrimarySmall };
