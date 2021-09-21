import React from "react";
import "./PeopleBar.css";
import Avatar from "react-nice-avatar";
import { useStateValue } from "../../../contextAPI/StateProvider";
import { postRequest } from "../../../api/requests";

const PeopleBar = () => {
  const [{ people, triggerChange }, dispatch] = useStateValue();
  const handleFollow = async (id) => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    const res = await postRequest("/add-friend", { id });
    if (res) {
      dispatch({
        type: "SET_TRIGGER_CHANGE",
        data: !triggerChange,
      });
    }
  };
  return (
    <div className="people__bar__parent">
      <div className="people__bar">
        {people.length ? (
          people.map((person, key) => {
            return (
              <div key={key} className="people__container">
                <div className="avatarAnd__name">
                  <Avatar
                    id="avatar"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                  <span>{person.name}</span>
                </div>
                <button
                  id={person._id}
                  onClick={(e) => handleFollow(e.target.id)}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  Follow
                </button>
                <hr className="rounded"></hr>
              </div>
            );
          })
        ) : (
          <h1>No new people around :-/</h1>
        )}
      </div>
    </div>
  );
};

export default PeopleBar;
