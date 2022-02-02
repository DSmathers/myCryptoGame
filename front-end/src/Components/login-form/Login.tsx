import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { auth } from '../../Services/Firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'


const Login = () => {
    const [ error, setError ] = useState<string>()

    const handleSubmit = (event:any) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, event.target[0].value, event.target[1].value).catch((err) => {
            setError(err.message);
        })
     
    }
    return(
        <Card className="ms-auto me-auto mt-3" style={{maxWidth: '350px'}}>
            
            <Card.Title className='w-100 text-center mt-2'>Log In</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username / Email</Form.Label>
                        <Form.Control type="email" autoComplete="username" required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="password" required></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 mb-2">Log In</Button>
                    <div className='w-100 text-center mt-2'> <Link to="/users/reset-password">Forgot Your Password?</Link></div>
                </Form>
                <div className='w-100 text-center mt-2'>Don't have an account? <Link to='/signup'>Sign Up</Link></div>
            </Card.Body>
        </Card>
    )
};

export default Login;
