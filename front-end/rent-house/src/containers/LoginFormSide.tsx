import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Facebook from "../components/Facebook";
import Google from "../components/Google";

interface IProps {

}

interface IStates {

}

class FormSide extends Component<IProps, IStates>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                <div>
                    <h1>Sign in BeeBeeRent</h1>
                    <Facebook />
                    <Google />
                </div>

            </Container >)
    }
}

export default FormSide;