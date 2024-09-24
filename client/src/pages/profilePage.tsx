import ProfilePic from "../components/profilePic/profilePic";
import '../styles/profilePage.css'
const ProfilePage = () => {

  return (
    <div>
      <div className="profile-container">

      <div className="profile-pic">
        <ProfilePic />
      </div>
      <button className="change">Change profile picture</button>
      </div>
    </div>
  )
}

export default ProfilePage;