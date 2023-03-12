import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContexts } from "../reducer/context";

const Users = () => {
  let { state } = useContext(GlobalContexts);
  const [togllReload, settogllReload] = useState(true);
  const [getUser, setgetUser] = useState([]);

  useEffect(() => {
    let getUsers = async () => {
      let response = await axios.get(`${state.baseUrl}/users`, {
        withCredentials: true,
      });
      let user = await response?.data?.data;
      setgetUser(user);
    };
    getUsers();
  }, [state.baseUrl]);

  return (
    <div>
      <h1>All users</h1>
      {getUser?.map((getUser,index) => getUser.role !== "admin" && (
        <div key={index}>
          <div>Email :{getUser?.email}</div>
          <button
            className="btn_style_del"
            type="submit"
            onClick={async () => {
              try {
                let deleted = await axios.delete(
                  `${state.baseUrl}/User/${getUser?._id}`,
                  {
                    withCredentials: true,
                  }
                );

                console.log("deleted: ", deleted.data);
                settogllReload(!togllReload);
              } catch (e) {
                console.log("error in api call");
                settogllReload(!togllReload);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
