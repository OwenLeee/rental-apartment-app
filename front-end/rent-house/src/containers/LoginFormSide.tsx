import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Facebook from "../components/LoginFacebook";
import Google from "../components/LoginGoogle";

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
            </Container >
            )}
}

export default FormSide;