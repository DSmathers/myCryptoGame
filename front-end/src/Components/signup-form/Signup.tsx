import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState} from 'react' 
import { signUp } from '../../Services/Firebase/firebaseMethods'

const Signup = () => {
    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        //TODO: Replace this lazy validation with something better. 
        if(e.target[1].value.length < 7){
            return setError('Error: Passwords must be at least 6 characters long.')
        }
        if(e.target[1].value !== e.target[2].value){
            return setError('Error: Passwords do not match');
        }

        setLoading(true);
        // TODO: Error Handling Here... 
        signUp(e.target[0].value, e.target[1].value)
        setLoading(false);
    }


  return(
      <Card className="ms-auto me-auto mt-2" style={{maxWidth: '350px'}}>
          <Card.Title className="w-100 text-center mt-2">Sign Up</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control autoComplete="username" type="email"></Form.Control>
                      <Form.Label>Enter A Password</Form.Label>
                      <Form.Control type="password" autoComplete="new-password"></Form.Control>
                      <Form.Label>Confirm Your Password</Form.Label>
                      <Form.Control type="password" autoComplete="new-password"></Form.Control>
                  </Form.Group>
                  <Button type="submit" className="w-100 mt-2" disabled={loading}>Sign Up</Button>
              </Form>
              <div className="w-100 text-center mt-2">Already have an account? <Link to='/login'>Login</Link></div>
          </Card.Body>

      </Card>
  )
};

export default Signup;

