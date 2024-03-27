import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type Users = {
  username: string;
  password: string;
};

const User: Users = {
  username: "aa@bb.cc",
  password: "1234",
};

export default function LoginPage({}: Props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const setUsers = (username: string, password: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };
  const LoginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username === User.username && password === User.password) {
      setUsers(username, password);
      navigate('/home')
      return alert("correct");
    } else {
      return alert("Email or password incorrect");
    }
  };

  return (
    <>
      <form>
        <h1>Login</h1>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => usernameOnChange(e)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => passwordOnChange(e)}
          />
        </div>
        <div>
          <button onClick={(e) => LoginSubmit(e)}>Login</button>
        </div>
      </form>
    </>
  );
}
