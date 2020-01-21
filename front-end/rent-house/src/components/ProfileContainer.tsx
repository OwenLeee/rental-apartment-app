import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

class ProfileContainer extends React.Component {

    public render() {
        return (
            <Container>
                <Row>
                    <Col>Picture</Col>
                    <Col>Name</Col>
                </Row>
                <Row>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
    </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
    </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <h1>Rental Apartment</h1> filter
                    <div>
                        <Col>Picture</Col>
                        <Col>
                            Address:_______               Porperty Types:__________
                            Building:____________________
                            Rental Price:___________________________
                            BedRoom BathRoom StoreRoom Parking
                        </Col>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default ProfileContainer