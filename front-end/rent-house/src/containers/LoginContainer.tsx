import React, { Component } from "react";
import { Container } from "react-bootstrap";
import FormSide from "./LoginFormSide";
// import PictureSide from "./LoginPictureSide";

interface IProps {
}

class LoginPage extends Component<IProps, {}>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                <FormSide />
                {/* <PictureSide /> */}
            </Container>
        )
    }
}