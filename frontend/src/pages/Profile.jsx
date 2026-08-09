import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import API from "../api/axios";
import "../styles/Profile.css";

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
    <div className="profile-page">
      <div className="profile-container">

        {/* Header */}
        <div className="profile-header">

          <div className="profile-icon">
            <User size={27} />
          </div>

          <div>
            <span className="profile-label">
              ACCOUNT SETTINGS
            </span>

            <h1>My Profile</h1>

            <p>
              Manage your account information
            </p>
          </div>

        </div>


        {/* Profile Card */}
        {profile && (
          <div className="profile-card">

            {/* Profile Top */}
            <div className="profile-card-top">

              <div className="avatar">
                {profile.username?.charAt(0).toUpperCase()}
              </div>

              <div className="profile-user-info">

                <h2>
                  {profile.username}
                </h2>

                <span className="role-badge">
                  {profile.role}
                </span>

              </div>

            </div>


            <div className="profile-divider"></div>


            {/* Information */}
            <div className="profile-info">

              {/* Username */}
              <div className="info-item">

                <div className="info-icon">
                  <User size={19} />
                </div>

                <div>
                  <small>Username</small>

                  <strong>
                    {profile.username}
                  </strong>
                </div>

              </div>


              {/* Email */}
              <div className="info-item">

                <div className="info-icon">
                  <Mail size={19} />
                </div>

                <div>
                  <small>Email Address</small>

                  <strong>
                    {profile.email}
                  </strong>
                </div>

              </div>


              {/* Phone */}
              <div className="info-item">

                <div className="info-icon">
                  <Phone size={19} />
                </div>

                <div>
                  <small>Phone Number</small>

                  <strong>
                    {profile.phone || "Not provided"}
                  </strong>
                </div>

              </div>


              {/* Role */}
              <div className="info-item">

                <div className="info-icon">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <small>Account Role</small>

                  <strong>
                    {profile.role}
                  </strong>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;