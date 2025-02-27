import React, { useEffect, useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import axios from "axios";
import Navbar from "../Navbar";
import { LoginProps } from "../props";
import { InputForm } from "./InputForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface FormInput {
  email: string;
  password: string;
  name: string;
  favouriteColour: string;
  favouriteAnimal: string;
  favouriteSnack: string;
}

const Login: React.FC<LoginProps> = ({ onChange, userId }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<Boolean>(false);

  useEffect(() => {
    setErrorMessage(null);
  }),
    [];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrorMessage(null);

    console.log("Reached here!");

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const favouriteColour = formData.get("favouriteColour") as string;
    const favouriteAnimal = formData.get("favouriteAnimal") as string;
    const favouriteSnack = formData.get("favouriteSnack") as string;

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    if (
      !hasAccount &&
      (!name || !favouriteColour || !favouriteAnimal || !favouriteSnack)
    ) {
      setErrorMessage("All fields are required for sign-up.");
      return;
    }

    const loginDataToSend = { email, password };
    const signupDataToSend = {
      email,
      password,
      name,
      favouriteColour,
      favouriteAnimal,
      favouriteSnack,
    };

    if (!hasAccount) {
      axios
        .post(`${API_BASE_URL}/signup`, signupDataToSend)
        .then((response) => {
          if (response.data.userId) {
            console.log(response.data);
            // localStorage.setItem("userId", response.data.userId);
            onChange(response.data.userId);
            console.log(userId)
          }
        })
        .catch((error) => {
          if (!error.response) {
            setErrorMessage("Network error. Please check your connection.");
          } else if (error.response.status === 400) {
            setErrorMessage("Invalid request. Please check your input.");
          } else if (error.response.status === 500) {
            setErrorMessage("Server error. Try again later.");
          } else if (error.response.status === 409) {
            setErrorMessage("User already exists, please sign in instead.");
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        });
    } else {
      axios.post(`${API_BASE_URL}/login`, loginDataToSend).then((response) => {
        console.log(response.data);
        if (response.data.userId) {
          // localStorage.setItem("userId", response.data.userId);
          onChange(response.data.userId);
          console.log(userId)

        }
      })
      .catch((error) => {
        setErrorMessage("Login failed. Please check your credentials")
      })
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>{!hasAccount ? "Sign Up" : "Sign In"}</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            className="Input"
            name="email"
            autoComplete="on"
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            suffix={
              <Tooltip title="This should be your email address!">
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
          <Input
            className="Input"
            name="password"
            type="password"
            autoComplete="on"
            placeholder="Enter your password"
            prefix={<UserOutlined />}
          />

          {!hasAccount ? <InputForm /> : <></>}
          <Button className="Button" htmlType="submit">
            {!hasAccount ? "Create Account" : "Go to My Account"}
          </Button>
        </form>
        <Button type="link" onClick={() => setHasAccount(!hasAccount)}>
          {!hasAccount
            ? "Already have an account? Sign in instead"
            : "Don't have an account? Sign up here!"}
        </Button>
      </div>
    </>
  );
};

export default Login;
