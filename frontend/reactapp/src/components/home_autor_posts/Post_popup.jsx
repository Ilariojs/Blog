import React from "react";

const Post_Popup = (props) =>{
    return(props.trigger) ? (
        <div className="popup">
            <div className="popup_inner">
                { props.children }
            </div>
        </div>
    ) : null
}

export default Post_Popup