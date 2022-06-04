import React from "react";
import {
  Row,
  Col,
  Alert,
  Container,
  FormGroup,
  Input,Form
} from "reactstrap";
import styled from "styled-components";
import { ButtonPrimary } from "../styles/Buttons";

const SectionContact = styled.section`
background-color:#1ed760;
`;

const Contact = (props) => {
  return (
    <SectionContact>
            <Container>
              <Row>
                <div md="6">
                  <h3>Vous souhaitez en savoir plus ?</h3>
                  <p>
                    N'hésitez pas à nous contacter, nous vous répondrons dans
                    les meilleurs délais
                  </p>
                </div>
                <Col md="6">
                  <Form onSubmit={this.handleSubmit}>
                    {this.state.successMessage === true && (
                      <Alert color="secondary">
                        Votre message a bien été envoyé !
                      </Alert>
                    )}

                    {this.state.errorMessage === true && (
                      <Alert color="danger">
                        Oops ! Votre message n'a pas pu être envoyé veuillez
                        recommencer.
                      </Alert>
                    )}
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Votre nom et prénom"
                        onChange={this.onNameChange.bind(this)}
                        value={this.state.name}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Votre email"
                        onChange={this.onEmailChange.bind(this)}
                        value={this.state.email}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="message"
                        placeholder="Votre message"
                        onChange={this.onMessageChange.bind(this)}
                        value={this.state.message}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <ButtonPrimary>Envoyer</ButtonPrimary>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          </SectionContact>
  );
};

export default Contact;
