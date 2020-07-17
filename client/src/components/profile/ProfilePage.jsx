import React from 'react';
import Photo from '../../assets/photo.jpg';
import '../../css/ProfilePage.css';
import { useState } from 'react';
import UpdatePassword from './Updatepassword';

const ProfilePage = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  if (updatePassword) {
    return <UpdatePassword />;
  } else {
    return (
      <div>
        <div className="ProfilePic"></div>
        <div className="AvatarContainer">
          <img src={Photo} alt="Profile Picture" id="Avatar" />
          <div className="ui button" id="EditAvatar">
            <i className="pencil alternate icon"></i>
            Edit
          </div>
        </div>
        {editProfile ? (
          <div className="ui small input">
            <input type="text" value={`Ashish Dev`} />
          </div>
        ) : (
          <h1 className="ui header" id="Name">
            Ashish Dev
          </h1>
        )}
        <div class="FlexedDiv">
          <div
            className="ProfileFont"
            style={{ marginRight: '.5em', fontWeight: '700' }}
          >
            Email:
          </div>
          {editProfile ? (
            <div className="ui small input">
              <input
                type="text"
                value={`ashishdevofficial@gmail.com`}
                style={{ width: '15em' }}
              />
            </div>
          ) : (
            <span className="ProfileFont"> ashishdevofficial@gmail.com</span>
          )}
        </div>
        <div class="FlexedDiv UpdateButtons">
          {editProfile ? (
            <button className="ui green button">Save Changes</button>
          ) : (
            <>
              <button
                className="ui blue button"
                onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </button>
              <button
                className="ui teal button"
                onClick={() => setUpdatePassword(true)}
              >
                Update Password
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default ProfilePage;
