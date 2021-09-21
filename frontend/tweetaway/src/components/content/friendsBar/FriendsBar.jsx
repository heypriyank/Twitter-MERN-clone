import React from "react";
import "./FriendsBar.css";
import Avatar from "react-nice-avatar";
import { useStateValue } from "../../../contextAPI/StateProvider";
import { postRequest } from "../../../api/requests";

const FriendsBar = () => {
  const [{ friends, triggerChange }, dispatch] = useStateValue();
  const handleUnfollow = async (id) => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    const res = await postRequest("/remove-friend", { id });
    if (res) {
      dispatch({
        type: "SET_TRIGGER_CHANGE",
        data: !triggerChange,
      });
    }
  };
  return (
    <div className="friends__bar__parent">
      <div className="friends__bar">
        {friends.length ? (
          friends.map((person, key) => {
            return (
              <div key={key} className="friends__container">
                <div className="avatarAnd__name">
                  <Avatar
                    id="avatar"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                  <span>{person.name}</span>
                </div>
                <button
                  id={person._id}
                  onClick={(e) => handleUnfollow(e.target.id)}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  Unfollow
                </button>
                <hr className="rounded"></hr>
              </div>
            );
          })
        ) : (
          <h1>No friends yet :-/</h1>
        )}
      </div>
    </div>
  );
};

export default FriendsBar;
