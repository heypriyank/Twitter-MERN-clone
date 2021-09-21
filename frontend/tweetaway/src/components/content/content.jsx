import React, { useState, useEffect } from "react";
import PeopleBar from "./peopleBar/PeopleBar";
import FeedAndTweet from "./feed/feed";
import "./content.css";
import { getRequest, postRequest } from "../../api/requests";
import { useStateValue } from "../../contextAPI/StateProvider";
import FriendsBar from "./friendsBar/FriendsBar";
import LoadingGif from "../../assets/YHlm.gif";

const Content = () => {
  const [{ triggerChange, isLoading }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    const getData = async () => {
      const res = await getRequest("/home");
      if (res) {
        dispatch({
          type: "SET_PEOPLE",
          data: res.people,
        });
        dispatch({
          type: "SET_TWEETS",
          data: res.tweets,
        });
        dispatch({
          type: "SET_FRIENDS",
          data: res.friends,
        });
        dispatch({
          type: "SET_IS_LOADING",
          data: false,
        });
      } else {
        alert("Network error occured");
      }
    };
    getData();
  }, [triggerChange]);

  return (
    <div className="content__flex">
      {!isLoading ? (
        <>
          <PeopleBar />
          <FeedAndTweet />
          <FriendsBar />
        </>
      ) : (
        <div className="custom__loading">
          <img src={LoadingGif} alt="LoadingGif" />
        </div>
      )}
    </div>
  );
};

export default Content;
