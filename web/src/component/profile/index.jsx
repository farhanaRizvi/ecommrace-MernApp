import React from "react";
import { GlobalContexts } from "../reducer/context";
import { useContext, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";

import "./index.css";

const Profile = () => {
  let { state } = useContext(GlobalContexts);
  const [editprofile, seteditprofile] = useState(null);
  const [togllReload, settogllReload] = useState(true);
  const [setLoading] = useState(true);

  let updateHandler = async (e) => {
    e.preventDefault();

    try {
      let updated = await axios.put(
        `${state.baseUrl}/${editprofile?._id}`,

        {
          firstName: editprofile.firstName,
          secondName: editprofile.secondName,
        },
        {
          withCredentials: true,
        }
      );
      console.log("updated: ", updated.data);
      setLoading(false);
      settogllReload(!togllReload);
      seteditprofile(null);
    } catch (e) {
      console.log("Error in api call: ", e);
      // setLoading(false)
    }
  };

  return (
    <>
      {editprofile !== null ? (
        <div className="form-f">
          <h1>Edit Profile</h1>
          <form onSubmit={updateHandler}>
            <label> First Name</label>
            <br />
            <input
              type="text"
              value={editprofile?.firstName}
              onChange={(e) => {
                seteditprofile({ ...editprofile, firstName: e.target.value });
              }}
            />

            <br />
            <label> Second Name</label>
            <br />
            <input
              type="text"
              value={editprofile?.secondName}
              onChange={(e) => {
                seteditprofile({ ...editprofile, secondName: e.target.value });
              }}
            />

            <br />

            <button type="submit"> Proced Update </button>
          </form>

          <hr />
        </div>
      ) : null}

      <div className="user">
        <div className="user-second">
          <div>
            <CgProfile className="profile-icon" />
          </div>
          <h1>
            Name : {state?.user?.firstName} {state?.user?.secondName}
          </h1>
          <h1>Email : {state?.user?.email}</h1>

          <button
            type="submit"
            onClick={async () => {
              seteditprofile({
                _id: state?.user?._id,
                firstName: state?.user?.firstName,
                secondName: state?.user?.secondName,
              });
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
