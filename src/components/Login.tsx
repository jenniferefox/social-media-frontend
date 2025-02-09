import React, { useState } from 'react';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';

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
    console.log('Email:', email);
    console.log('Hashed Password:', password);
    console.log(e)
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
    <Button type="link" onPress ={() => setToggleSignUp(!toggleSignUp)}>
      Already have an account? Sign in here
    </Button>
  </div>
  )
};

export default Login;
