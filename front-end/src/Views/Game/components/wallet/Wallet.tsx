import { useUserAuth } from "../../../../Contexts/AuthContext";

const Wallet = () => {
    const { User } = useUserAuth() 
  return(
      <>
        <div>Wallet</div> 
        <div>User: {User && User.email}</div>
      </>
  );
};

export default Wallet;
