import React, { useState } from 'react';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';

const Login: React.FC = () => {

  // const [loginDetails, setLoginDetails] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = (e) => {
  //   // setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value})
  //   console.log('submitted!')
  // }

  return (
  <>
    <Input
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
      placeholder="Enter your password"
      prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
    <br />
    <br />
    <Button onSubmit={handleSubmit}>Log me in
    </Button>
  </>
  )
};

export default Login;
