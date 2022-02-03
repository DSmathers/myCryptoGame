import { Button } from "react-bootstrap";
import { useUserAuth } from "../Contexts/AuthContext";


const Dashboard = () => {  
  const { logOut, User  } = useUserAuth();

  const handleClick = (e:React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    logOut();
  }
  
      return(
      <>
      <h1>Dashboard</h1>
      <p>Welcome Back {User.displayName || User.email}</p>
      <Button onClick={handleClick}>Sign Out</Button>
      </>
    )
};

export default Dashboard;
