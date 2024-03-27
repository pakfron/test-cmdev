import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { userLoginShema } from "../util/validator";
import { Button, TextField, Typography } from "@mui/material";
import { text } from "stream/consumers";

type Props = {};

type Users = {
  email: string;
  password: string;
};

const User: Users = {
  email: "aa@bb.cc",
  password: "1234",
};

export default function LoginPage({}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };
  const setUsers = (email: string, password: string) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  };
  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(email);
      const userValidate = await userLoginShema.validate(
        { email, password },
        { abortEarly: false }
      );
      console.log(userValidate);

      setUsers(email, password);
      navigate("/home");
      return alert("correct");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error);
        return alert("Email or password incorrect");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          LoginSubmit(e);
        }}
      >
        <Typography variant="h3">Login</Typography>
        <div>
          <TextField
            label={"email"}
            variant="filled"
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => {
              usernameOnChange(e);
            }}
          />
        </div>
        <div>
          <TextField
            label={"password"}
            variant="filled"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              passwordOnChange(e);
            }}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </div>
      </form>

      {/* <form>
        <h1>Login</h1>
        <div>
        <input
        type="text"
            value={email}
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
      </form> */}
    </>
  );
}
