import { InputGroup, Input, Button, InputGroupText, FormGroup, Form, Label, Col } from 'reactstrap';
import "ag-grid-community/styles/ag-grid.css"
import { useState } from 'react';
import '../styling/form.css'

function Register() {
    const [userEmail, setUserEmail] = useState([]);
    const [userPassword, setUserPasswordEmail] = useState([]);
    const [userConfirmationPassword, setUserConfirmationPassword] = useState([]);

    const updateUserEmail = (e) => {
        setUserEmail(e.target.value.toLowerCase());
    }

    const updateUserPassword = (e) => {
        setUserPasswordEmail(e.target.value);
    }

    const updateUserConfirmationPassword = (e) => {
        setUserConfirmationPassword(e.target.value);
    }

    const handleSubmit = () => {

        let body = {
            "email": userEmail,
            "password": userPassword
        }

        fetch('http://sefdb02.qut.edu.au:3000/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    return (
        <Form className='form' onSubmit={(event) => {
            event.preventDefault();
        }}>
            <h2>Register</h2>
            <FormGroup row>
                <Label for="email" sm={2}>
                    Email
                </Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroupText>@</InputGroupText>
                        <Input id='email' type='email' onChange={updateUserEmail} required />
                    </InputGroup>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="password" sm={2}>
                    Password
                </Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroupText>&#128274;</InputGroupText>
                        <Input id='password' onChange={updateUserPassword} type='password' required />
                    </InputGroup>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="confirmation-password" sm={2}>
                    Password
                </Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroupText>&#128274;</InputGroupText>
                        <Input id='confirmation-password' onChange={updateUserConfirmationPassword} type='password' required />
                    </InputGroup>
                </Col>
            </FormGroup>
            <Button type='submit' onClick={handleSubmit} className='form-submit-btn'>Submit</Button>
        </Form>
    );
}

export default Register