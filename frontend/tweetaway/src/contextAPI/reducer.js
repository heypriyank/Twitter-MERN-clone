export const initialState = {
  token: null,
  triggerChange: false,
  people: [],
  tweets: [],
  friends: [],
  tweetText: [],
  userName: [],
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.data,
      };
    case "SET_PEOPLE":
      return {
        ...state,
        people: action.data,
      };
    case "SET_TWEETS":
      return {
        ...state,
        tweets: action.data,
      };
    case "SET_FRIENDS":
      return {
        ...state,
        friends: action.data,
      };
    case "SET_TWEET_TEXT":
      return {
        ...state,
        tweetText: action.data,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.data,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.data,
      };
    case "SET_TRIGGER_CHANGE":
      return {
        ...state,
        triggerChange: action.data,
      };

    default:
      return state;
  }
}

export default reducer;
