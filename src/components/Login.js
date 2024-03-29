import { InputGroup, Input, Button, InputGroupText, FormGroup, Form, Label, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import "ag-grid-community/styles/ag-grid.css";
import { useState, useEffect } from 'react';
import '../styling/form.css';
import '../styling/alert.css';

function Login() {
    const [userEmail, setUserEmail] = useState([]);
    const [userPassword, setUserPasswordEmail] = useState([]);
    const [visible, setVisible] = useState(false);
    const [incorrectVisible, setIncorrectVisible] = useState(false);
    const [relogin, setRelogin] = useState(false);
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    const onDismiss = () => setVisible(false);
    const onIncorrectDismiss = () => setIncorrectVisible(false);
    const onReloginDismiss = () => setRelogin(false);

    const updateUserEmail = (e) => {
        setUserEmail(e.target.value.toLowerCase());
    }

    const updateUserPassword = (e) => {
        setUserPasswordEmail(e.target.value);
    }

    const handleLogin = (e) => {
        let body = {
            "email": userEmail,
            "password": userPassword,
            "longExpiry": false
        }

        fetch('http://sefdb02.qut.edu.au:3000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === "Incorrect email or password") {
                    setVisible(false);
                    setRelogin(false);
                    setIncorrectVisible(true);
                } else {
                    localStorage.setItem("bearerToken", res.bearerToken.token);
                    localStorage.setItem("refreshToken", res.refreshToken.token);
                    let actorId = params.get("actor");
                    if (actorId) {
                        return navigate(`/actor?id=${actorId}`);
                    }
                    return navigate("/");
                }
            })
    }

    useEffect(() => {
        console.log(params.get('id'));
        if (params.get('id') === 'created') {
            setVisible(true);
        } else if (params.get('id') === 'relogin') {
            setRelogin(true);
        }
    }, [])

    return (
        <>
            <Alert className='my-alert' color="success" isOpen={visible} toggle={onDismiss}>
                Your account has been created!
            </Alert>
            <Alert className='my-alert' color="danger" isOpen={incorrectVisible} toggle={onIncorrectDismiss}>
                Incorrect email or password
            </Alert>
            <Alert className='my-alert' color="danger" isOpen={relogin} toggle={onReloginDismiss}>
                You must sign in to your account again to access this page
            </Alert>
            <Form className='form' onSubmit={(event) => {
                event.preventDefault();
            }}>
                <h2>Log In</h2>
                <hr></hr>
                <FormGroup row>
                    <Label for="email" sm={2}>
                        Email
                    </Label>
                    <Col sm={10}>
                        <InputGroup>
                            <InputGroupText>&#128231;</InputGroupText>
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
                <a href="" onClick={() => {
                    let actorId = params.get("actor");
                    if (actorId) {
                        return navigate(`/register?actor=${actorId}`);
                    } else {
                        return navigate(`/register`);
                    }
                }}> Don't have an account? Register here</a>
                <Button type='submit' onClick={handleLogin} className='form-submit-btn'>Login</Button>
            </Form>
        </>
    );
}

export default Login