import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Signup = () => {
  return(
      <Card className="ms-auto me-auto mt-2" style={{maxWidth: '350px'}}>
          <Card.Title className="w-100 text-center mt-2">Sign Up</Card.Title>
          <Card.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control autoComplete="username"></Form.Control>
                      <Form.Label>Enter A Password</Form.Label>
                      <Form.Control type="password" autoComplete="new-password"></Form.Control>
                      <Form.Label>Confirm Your Password</Form.Label>
                      <Form.Control type="password" autoComplete="new-password"></Form.Control>
                  </Form.Group>
                  <Button type="submit" className="w-100 mt-2">Sign Up</Button>
              </Form>
              <div className="w-100 text-center mt-2">Already have an account? <Link to='/login'>Login</Link></div>
          </Card.Body>

      </Card>
  )
};

export default Signup;

