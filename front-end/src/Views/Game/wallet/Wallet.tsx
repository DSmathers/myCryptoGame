import { useUserAuth } from "../../../Contexts/AuthContext";
import { useUserContext } from "../Game";

const Wallet = () => {
  const { userData } = useUserContext();
  return(
      <>
        <div>Wallet</div> 
        <div>USD: ${userData?.wallet.usd.toLocaleString()}</div>
        {userData?.wallet.algo && <div>ALGO: {userData.wallet.algo.toFixed(8)}</div>}
      </>
  );
};

export default Wallet;
