import React from "react";
import "./ProfileScreen.css";
import Navbar from "../../components/Navbar/Navbar";
import { auth } from "../../firebase";
import PlansScreen from "../../components/PlansScreen/PlansScreen";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { user } = useSelector((store) => store.user);
  const { subscription } = useSelector((store) => store.subscription);

  return (
    <div className="profileScreen">
      <Navbar />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>

        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile Avatar"
            width={60}
          />

          <div className="profileScreen__pricing">
            <div className="profileScreen__name">
              <div>{user?.email}</div>
              <h4>
                Plans (Current Plan&nbsp;:&nbsp;
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  {subscription ? `${subscription?.role}` : "No Plan"}{" "}
                </span>{" "}
                )
              </h4>
            </div>

            <PlansScreen />

            <button className="btn" onClick={() => auth.signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
