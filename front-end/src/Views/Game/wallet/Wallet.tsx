import { useUserAuth } from "../../../Contexts/AuthContext";
import { useUserContext } from "../Game";

const Wallet = () => {
  const userData = useUserContext();
  const { User } = useUserAuth();
  console.log(userData)
  return(
      <>
        <div>Wallet</div> 
        <div>User: {User && User.email}</div>
        <div>USD: {userData && userData.wallet.usd}</div>
      </>
  );
};

export default Wallet;
