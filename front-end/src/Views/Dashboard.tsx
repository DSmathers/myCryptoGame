import { auth } from "../Services/Firebase/firebaseConfig";

const Dashboard = () => {
    let { currentUser } = auth;
    
  return <div>Dashboard {currentUser?currentUser.email:'no user found'}</div>;
};

export default Dashboard;
