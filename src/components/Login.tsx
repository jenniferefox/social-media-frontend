import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import axios from 'axios';

const LOCAL_BASE_URL = "http://localhost:5000"

interface FormInput {
    email: string,
    password: string
  }

const Login: React.FC = () => {

  const [loginDetails, setLoginDetails] = useState<FormInput>({
    email: "",
    password: "",
  });
  const [toggleSignUp, setToggleSignUp] = useState<Boolean>(true);

  // useEffect(() => {
  //   axios.get(`${LOCAL_BASE_URL}/login`)
  //   .then(response => {
  //    console.log(response.data)
  //     })
  //   },[]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    const email = loginDetails.email;
    const password = loginDetails.password;

    const dataToSend = {
      email: `${email}`,
      password: `${password}`
    };

    console.log('Email:', email);
    console.log('Password:', password);
    console.log(e)
    if (toggleSignUp) {
      axios.post(`${LOCAL_BASE_URL}/login`, dataToSend)
      .then(response => {
        console.log(response.data)
        });
    } else {
      axios.get(`${LOCAL_BASE_URL}/users`)
      .then(response => {
        console.log(response.data)
      });
    };
  };

  return (
  <div className='login-container'>
    <h2>{toggleSignUp? "Sign Up" : "Log in" }</h2>
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={loginDetails.email}
        onChange={handleInputChange}
        placeholder="Enter your username"
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <Tooltip title="This should be your email address!">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <br />
      <br />
      <Input
        name="password"
        type="password"
        value={loginDetails.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      <br />
      <br />
      <Button htmlType="submit">{toggleSignUp? "Create Account" : "Sign In" }</Button>
    </form>
    <br />
    <Button type="link" onClick ={() => setToggleSignUp(!toggleSignUp)}>
      Already have an account? Sign in instead.
    </Button>
  </div>
  )
};

export default Login;
