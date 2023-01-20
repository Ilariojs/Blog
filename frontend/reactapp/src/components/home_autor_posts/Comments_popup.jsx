import React from "react";

const Comments_popup = (props) => {

    return(props.trigger) ?(
        <div className="popup">
            <div className="comment_popup_inner">
                { props.children }
            </div>
        </div>
    )
    : null
}

export default Comments_popup