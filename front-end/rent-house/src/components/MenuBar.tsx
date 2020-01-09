import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../scss/MenuBar.scss'

class MenuBar extends React.Component {


    public render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">BeeBeeRent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#rent">Rent</Nav.Link>
                        <Nav.Link href="#post">Post</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MenuBar;