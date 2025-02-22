import axios from "axios";
import Navbar from "./Navbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const Profile: React.FC<{ handleLoginToggle: () => void }> = ({
  handleLoginToggle,
}) => {

  axios.get(`${API_BASE_URL}/users/:id`, userId).then((response) => {
    console.log(response.data);
  });

  return (
    <div>
      <Navbar />
      <h1>Profile</h1>
      {/* <a href={generatedImage} /> */}
      <div> Details about me</div>
      <div> Create Post </div>
    </div>
  );
};

export default Profile;
