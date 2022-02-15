import { useUserAuth } from "../../../Contexts/AuthContext";
import { getUserToken } from "../../../Services/Firebase/firebaseMethods";
import axios from "axios";
import { useEffect, useState } from "react";

const Wallet = () => {
  const { User } = useUserAuth();
  const [ assets, setAssets ] = useState<Test>();

  interface Test {
    usd?: number,
  }
  
  const test = async () => {
    const token = await getUserToken()
    if(!token){
      throw new Error('Problem Recieving Token');
    };
    axios.get('http://192.168.0.4:8000/api/users/user/wallet', ({headers: {authorization: token}}))
      .then((res) => {
        setAssets(res.data.wallet);
      });
  };

  useEffect(() => {test()}, [])
  return(
      <>
        <div>Wallet</div> 
        <div>User: {User && User.email}</div>
        <div>USD: ${assets && assets.usd?.toLocaleString()}</div>
      </>
  );
};

export default Wallet;
