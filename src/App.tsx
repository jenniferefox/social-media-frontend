import { SetStateAction, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
  const [userId, setUserId] = useState<string>("");

  const handleUserId = (newUserId: SetStateAction<string>) => {
    setUserId(newUserId);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {userId ? (
          <Profile userId={userId}/>
        ) : (
          <Login onChange={handleUserId} userId={userId}/>
        )}
      </div>
    </>
  );
}

export default App;
