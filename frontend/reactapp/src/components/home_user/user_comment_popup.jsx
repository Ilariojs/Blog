import React from "react";


const User_comment_popup = (props) => {
    return(props.trigger) ? (
        <div className="popup">
            <div className="popup_inner">
                { props.children }
            </div>
        </div>
    ) : null
}

export default User_comment_popup