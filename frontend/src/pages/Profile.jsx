import { useEffect, useState } from "react";
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

      <div className="profile-header">
        <div className="profile-icon">
          👤
        </div>

        <div>
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>
      </div>

      {profile && (
        <div className="profile-card">

          <div className="profile-card-top">
            <div className="avatar">
              {profile.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{profile.username}</h2>
              <span className="role-badge">
                {profile.role}
              </span>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-info">

            <div className="info-item">
              <span className="info-icon">👤</span>
              <div>
                <small>Username</small>
                <strong>{profile.username}</strong>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <small>Email Address</small>
                <strong>{profile.email}</strong>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <small>Phone Number</small>
                <strong>{profile.phone || "Not provided"}</strong>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🛡️</span>
              <div>
                <small>Account Role</small>
                <strong>{profile.role}</strong>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Profile;