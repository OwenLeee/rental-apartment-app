import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
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
        < Container >
            Hello
        </Container >
        )
}
}

export default FormSide;