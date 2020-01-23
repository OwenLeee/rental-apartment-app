import React from "react";
import { Card, Form } from "react-bootstrap";
import { IRootState } from "../redux/store";
import { connect } from "react-redux";

const mapStateToProps = (state: IRootState) => ({
    status: state.user.status,
    //
    email: state.user.email,
    name: state.user.userinfo.name,
    icon: state.user.userinfo.icon
});

interface IProfileProps {
    status: string,
    email: string,
    name: string,
    icon: string
}


class Profile extends React.Component<IProfileProps, {}>{
    // constructor(props: IProfileProps) {
    //     super(props);
    // }
    public render() {
        return (
            <Card style={{ width: '18rem' }} className="loginLogo">
                <Card.Img variant="top" src={this.props.icon} />
                <Card.Body>
        <Card.Title>Is that you?</Card.Title>
                    <Card.Text>
                        <Form>
                        <Form.Group controlId="formPlaintextEmail">
                                <Form.Label>
                                    Name:
                            </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.props.name} />
                            </Form.Group>
                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label>
                                    Email:
                            </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.props.email} />
                            </Form.Group>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Profile)