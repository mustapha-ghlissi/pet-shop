import React from "react";
import {ListGroup,ListGroupItem,Button} from "reactstrap";
import styled from "styled-components";

const ListGroupMessage = styled(ListGroup)`
 color: #424244;
`
const UserName = styled.h6`
font-weight:bold;
`
const AnnonceName = styled.h3`
     font-size: 1.2rem;
     color:#1ed760 !important;
`
const DateMessage = styled.p`
 color: black;
 opacity:.7;
 font-size:80%;
`
const ButtonActions = styled.div`
 position: absolute;
    top: 0;
    right: 0;
    .btn{
    margin-right:1rem;
        margin-top: .5rem;
    }
`

class HomeContent extends React.Component {
  render() {
    return (
      <>
        <ListGroupMessage>
          <ListGroupItem>
            <UserName>Cécile Chelim</UserName>
            <AnnonceName>
              Nom de l'annonce en ligne de chiot
            </AnnonceName>
            <DateMessage>
              12/12/21 • 22h33
            </DateMessage>
            <ButtonActions>
              <Button color={"light"}>
                Favori
              </Button>
              <Button color={"light"}>
                Archiver
              </Button>
            </ButtonActions>
          </ListGroupItem>
        </ListGroupMessage>
      </>
    );
  }
}

export default HomeContent;
