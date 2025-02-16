// import getUser from "../api/user"
// import { useState, useEffect } from "react";

// const User = () => {
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     fetchUser();
//   });

//   const fetchUser = async () => {
//     const data = await getUser();
//     if (data.error) {
//       console.log("There is an error")
//     } else {
//       setUser(data);
//     }
//   }

//   return (
//     <div>Welcome Users {user}</div>
//   )
// };

// export default User;
import Navbar from "./Navbar";

const MyProfile: React.FC<{ handleLoginToggle: () => void }> = ({
  handleLoginToggle,
}) => {
  return (
    <div>
      <Navbar />
      <h1>MyProfile</h1>
      <div> Details about me</div>
      <div> Create Post </div>
    </div>
  );
};

export default MyProfile;
