import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "myprofile",
    icon: <SmileOutlined />,
    label: <a href={"/MyProfile"}>My Profile</a>,
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Logout
      </a>
    ),
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      className="navbar-root"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
