import React from "react";
import "./profileContent.css";

function ProfileContent() {
  return (
    <div className="profile-content">
      <h2>Profile</h2>
      <div className="profile-content-photo">
        <img src="profile-content-photo-url.jpg" alt="Profile Content" />
        <div className="photo-buttons">
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>
      <form className="profile-content-form">
        <div>
          <label>First Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" />
        </div>
        <div>
          <label>Language Preference</label>
          <select>
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" placeholder="Phone Number" />
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
        <button type="button" className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProfileContent;
