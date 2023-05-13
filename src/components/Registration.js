import { InputGroup, Input, Button, InputGroupText, FormGroup, Form, Label, Col, Alert } from 'reactstrap';
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import '../styling/form.css'
import '../styling/alert.css'

function Register() {
    const [userEmail, setUserEmail] = useState([]);
    const [userPassword, setUserPasswordEmail] = useState([]);
    const [userConfirmationPassword, setUserConfirmationPassword] = useState([]);
    const [existsAlertVisible, setExistsAlertVisible] = useState(false);
    const [matchingPasswordsAlert, setMatchingPasswordsAlert] = useState(false);

    const navigate = useNavigate();

    const onDismiss = () => {
        setExistsAlertVisible(false)
        setMatchingPasswordsAlert(false)
    };

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

        if (userPassword !== userConfirmationPassword) {
            console.log("Passwords don't match...");
            if (existsAlertVisible) {
                setExistsAlertVisible(false);
            }
            setMatchingPasswordsAlert(true);
            return;
        }

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
            .then(res => {
                if (res.error === true) {
                    throw new Error(res.message);
                }

                if (res.message === "User created") {
                    navigate('/login?id=created')
                }
            })
            .catch(error => {
                if (error.message === "User already exists") {
                    if (matchingPasswordsAlert) {
                        setMatchingPasswordsAlert(false);
                    }
                    setExistsAlertVisible(true);
                }
            })
    }

    return (
        <>
            <div className='container'>
                <Alert className='my-alert' color="danger" isOpen={existsAlertVisible} toggle={onDismiss}>
                    A user with that email already exists!
                </Alert>
                <Alert className='my-alert' color="danger" isOpen={matchingPasswordsAlert} toggle={onDismiss}>
                    Passwords don't match!
                </Alert>
            </div>
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
                        Confirm Password
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
        </>
    );
}

export default Register