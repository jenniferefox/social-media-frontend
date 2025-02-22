import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProfile from "./components/Profile";

// TODO: handlelogintoggle - toggles once user has logged in successfully. needs to be created in parent component

function App() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  const handleLoginToggle = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {loggedIn ? (
          <MyProfile handleLoginToggle={handleLoginToggle} />
        ) : (
          <Login handleLoginToggle={handleLoginToggle} />
        )}
      </div>
    </>
  );
}

export default App;
