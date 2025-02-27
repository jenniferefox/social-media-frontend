import axios from "axios";
import Navbar from "./Navbar";
import { ProfileProps } from "./props";
import { useState } from "react";
import { useQuery } from "react-query";
import { Image } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile: React.FC<ProfileProps> = ({
  userId
}) => {
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ['query'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
      return {
        data: response
      }
    }
  });

  const test = query.data?.data.data.user;
  const pic = query.data?.data.data.pictureUrl.picture_url;

  return (
    <div>
      <Navbar />
      <h1>Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userId ? (
        <div>
          <Image src={pic} alt="Profile Pic" />
          <p>Name:{test.name}</p>
          <p>Favourite Colour: {test.favourite_colour}</p>
          <p>Favourite Animal: {test.favourite_animal}</p>
          <p>Favourite Snack: {test.favourite_snack}</p>
        </div>
      ) : (
      <p> Loading... </p>
      )}
    </div>
  );
};

export default Profile;
