import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  // const { user, isAuthenticated, isloading } = useAuth0();
  

  return (
  <div>
    {/* <>
    {isAuthenticated && (
          <div className="profile-pic">
            <img src={user.picture} />
          </div>
        )}
    </> */}

    {/* Below section executes when isAthenticated value is false (for testing purposes)*/}
    <> 
      <img className="profile-pic" src="" alt="Profile" />
    </>
  </div>);
};

export default Profile;
