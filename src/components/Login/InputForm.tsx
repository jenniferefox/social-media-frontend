import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export const InputForm: React.FC = () => {
  return(
    <>
    <p> We'd like to know a little more about you!</p>
    <Input
      className="Input"
      name="name"
      defaultValue="pink"
      placeholder="What's your name?"
      prefix={<UserOutlined/>}
    />
    <Input
      className="Input"
      name="favouriteColour"
      placeholder="Enter your fave colour"
      prefix={<UserOutlined/>}
    />
    <Input
      className="Input"
      name="favouriteAnimal"
      placeholder="Enter your fave animal"
      prefix={<UserOutlined/>}
    />

    <Input
      className="Input"
      name="favouriteSnack"
      placeholder="Enter your fave snack"
      prefix={<UserOutlined/>}
    />
    </>
  )
}
