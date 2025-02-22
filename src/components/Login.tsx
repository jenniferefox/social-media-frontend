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
  favouriteColour: string;
  favouriteAnimal: string;
  favouriteSnack: string;
}

const Login: React.FC<{ handleLoginToggle: () => void }> = ({
  handleLoginToggle,
}) => {
  // FIXME: Move user details to state at parent component, so that details can be sent to MyProfile component
  const [loginDetails, setLoginDetails] = useState<FormInput>({
    email: "",
    password: "",
    name: "",
    favouriteColour: "",
    favouriteAnimal: "",
    favouriteSnack: "",
  });
// does this need to be handled in a state

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
    const favouriteColour = loginDetails.favouriteColour;
    const favouriteAnimal = loginDetails.favouriteAnimal;
    const favouriteSnack = loginDetails.favouriteSnack;

    const loginDataToSend = {
      email: `${email}`,
      password: `${password}`,
    };

    const signupDataToSend = {
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
      favouriteColour: `${favouriteColour}`,
      favouriteAnimal: `${favouriteAnimal}`,
      favouriteSnack: `${favouriteSnack}`,
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
        }).catch((error) => {
          if (error.response && error.response.status === 409) {
            alert("User already exists, please sign in instead.");
          } else {
            alert("An error occurred. Please try again")
          }
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
          className="Input"
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
          <Input
            className="Input"
            name="password"
            type="password"
            autoComplete="on"
            value={loginDetails.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />

          {!hasAccount ? (
            <>
              <p> We'd like to know a little more about you!</p>
              <Input
                className="Input"
                name="name"
                value={loginDetails.name}
                defaultValue="pink"
                onChange={handleInputChange}
                placeholder="What's your name?"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <Input
                className="Input"
                name="favouriteColour"
                value={loginDetails.favouriteColour}
                onChange={handleInputChange}
                placeholder="Enter your fave colour"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
              <Input
                className="Input"
                name="favouriteAnimal"
                value={loginDetails.favouriteAnimal}
                onChange={handleInputChange}
                placeholder="Enter your fave animal"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />

              <Input
                className="Input"
                name="favouriteSnack"
                value={loginDetails.favouriteSnack}
                onChange={handleInputChange}
                placeholder="Enter your fave snack"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </>
          ) : (
            <br />
          )}
          <Button className="Button" htmlType="submit">
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
