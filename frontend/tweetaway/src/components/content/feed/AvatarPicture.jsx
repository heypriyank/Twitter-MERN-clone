import React from "react";
import Avatar from "react-nice-avatar";

const AvatarPicture = () => {
    return (
        <Avatar id="avatar" style={{ width: "4rem", height: "4rem" }} />
    )
}
export default React.memo(AvatarPicture)