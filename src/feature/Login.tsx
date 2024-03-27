import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Users = {
    email: string;
    password: string;
  };
  
   const User: Users = {
    email: "aa@bb.cc",
    password: "1234",
  };

export default function Login({ children }: any) {
  type typeLocalStorage = {
    email: string;
    password: string;
  };

  useEffect(()=>{
    setLogin()
  },[])

  const [isLogin, setIslogin] = useState<typeLocalStorage>({
    email: "",
    password: "",
  });

  const setLogin=()=>{
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    
    if(email===User.email&&password===User.password){
        setIslogin({email,password})
    }
  }

  if(isLogin.email===User.email&&isLogin.password===User.password){
    return <Navigate to={`/home`}/>;
  }
  
  return children
}
