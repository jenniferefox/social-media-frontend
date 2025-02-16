import React, { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import axios from "axios";
import Navbar from "./Navbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FormInput {
  email: string;
  password: string;
  name: string;
  favourite_colour: string;
  favourite_animal: string;
  favourite_snack: string;
}

const Login: React.FC<{ handleLoginToggle: () => void }> = ({
  handleLoginToggle,
}) => {
  // FIXME: Move user details to state at parent component, so that details can be sent to MyProfile component
  const [loginDetails, setLoginDetails] = useState<FormInput>({
    email: "",
    password: "",
    name: "",
    favourite_colour: "",
    favourite_animal: "",
    favourite_snack: "",
  });
  const [hasAccount, setHasAccount] = useState<Boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Reached here!");

    const email = loginDetails.email;
    const password = loginDetails.password;
    const name = loginDetails.name;
    const favourite_colour = loginDetails.favourite_colour;
    const favourite_animal = loginDetails.favourite_animal;
    const favourite_snack = loginDetails.favourite_snack;

    const loginDataToSend = {
      email: `${email}`,
      password: `${password}`,
    };

    const signupDataToSend = {
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
      favourite_colour: `${favourite_colour}`,
      favourite_animal: `${favourite_animal}`,
      favourite_snack: `${favourite_snack}`,
    };

    console.log("Email:", email);
    console.log("Password:", password);
    console.log(e);

    if (!hasAccount) {
      axios
        .post(`${API_BASE_URL}/signup`, signupDataToSend)
        .then((response) => {
          console.log(response.data);
          handleLoginToggle();
        });
    } else {
      axios.post(`${API_BASE_URL}/login`, loginDataToSend).then((response) => {
        console.log(response.data);
        handleLoginToggle();
      });
    }
  };

  return (
    // FIX ME: put inputs into .map to make code more concise
    <>
      <Navbar />
      <div className="login-container">
        <h2>{!hasAccount ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            autoComplete="on"
            value={loginDetails.email}
            onChange={handleInputChange}
            placeholder="Enter your username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={
              <Tooltip title="This should be your email address!">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <br />
          <br />
          <Input
            name="password"
            type="password"
            autoComplete="on"
            value={loginDetails.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <br />
          <br />

          {!hasAccount ? (
            <>
              <p> We'd like to know a little more about you!</p>
              <Input
                name="name"
                value={loginDetails.name}
                defaultValue="pink"
                onChange={handleInputChange}
                placeholder="What's your name?"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <br />
              <br />
              <Input
                name="favourite_colour"
                value={loginDetails.favourite_colour}
                onChange={handleInputChange}
                placeholder="Enter your fave colour"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <br />
              <br />
              <Input
                name="favourite_animal"
                value={loginDetails.favourite_animal}
                onChange={handleInputChange}
                placeholder="Enter your fave animal"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <br />
              <br />
              <Input
                name="favourite_snack"
                value={loginDetails.favourite_snack}
                onChange={handleInputChange}
                placeholder="Enter your fave snack"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <br />
              <br />
            </>
          ) : (
            <br />
          )}
          <Button htmlType="submit">
            {!hasAccount ? "Create Account" : "Go to My Account"}
          </Button>
        </form>
        <br />
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
