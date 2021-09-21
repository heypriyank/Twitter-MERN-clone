import React, { useState } from "react";
import "./feed.css";
// import Avatar from "react-nice-avatar";
import { postRequest } from "../../../api/requests";
import { useStateValue } from "../../../contextAPI/StateProvider";
import AvatarPicture from "./AvatarPicture.jsx";

const FeedAndTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [{ triggerChange, tweets }, dispatch] = useStateValue();

  const handleTweet = async () => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    const res = await postRequest("/add-tweet", { content: tweetText });
    if (res) {
      dispatch({
        type: "SET_TRIGGER_CHANGE",
        data: !triggerChange,
      });
      setTweetText("");
    } else {
      alert("Some network error occured");
    }
  };

  const changeTweetText = (text) => {
    console.log(text);
  };

  return (
    <div className="feedAndTweet__parent">
      <div className="tweet__parent">
        <div className="profilePicture__and__input">
          <AvatarPicture />
          <input
            maxLength={200}
            className="form-control-lg"
            type="text"
            placeholder="tweet away...!"
            onChange={(e) => setTweetText(e.target.value)}
            value={tweetText}
          ></input>
        </div>
        <div className="tweet__button">
          <button
            disabled={!tweetText.length}
            onClick={() => handleTweet()}
            type="button"
            className="btn btn-primary"
          >
            Post
          </button>
        </div>
      </div>
      <div className="feeds__parent">
        {tweets.length ? (
          tweets.map((tweet) => {
            return (
              <div key={tweet._id}>
                <AvatarPicture />
                <div className="feed">
                  <p>{tweet.author.name}</p>
                  <h2>{tweet.content}</h2>
                </div>
              </div>
            );
          })
        ) : (
          <center>
            <h1>No tweets yet !</h1>
          </center>
        )}
      </div>
    </div>
  );
};

export default React.memo(FeedAndTweet);
