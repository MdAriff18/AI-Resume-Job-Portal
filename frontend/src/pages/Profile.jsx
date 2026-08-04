import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const getProfile = async () => {

      try {

        const response = await API.get("profile/");

        setProfile(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    getProfile();

  }, []);


  return (
    <div>

      <h1>AI Resume Job Portal</h1>

      <h2>Profile</h2>

      {
        profile && (
          <div>

            <p>
              Username: {profile.username}
            </p>

            <p>
              Email: {profile.email}
            </p>

            <p>
              Phone: {profile.phone}
            </p>

            <p>
              Role: {profile.role}
            </p>

          </div>
        )
      }

    </div>
  );
}

export default Profile;