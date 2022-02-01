import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { auth } from "../Services/Firebase/firebaseConfig";

const Dashboard = () => {

  const handleClick = (e:React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    signOut(auth);
  }

  const { currentUser } = auth;
  console.log(currentUser)
      return(
      <>
      <h1>Dashboard</h1>
      {currentUser && currentUser.email}
      <Button onClick={handleClick}>Sign Out</Button>
      </>
    )
};

export default Dashboard;
