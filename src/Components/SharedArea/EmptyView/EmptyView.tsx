import React from "react";
import "./EmptyView.css";
interface EmptyViewProps{
    msg: string;
}
function EmptyView(props:EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
			<h1>{props.msg}</h1>
            <img src="https://media.giphy.com/media/V53jWRdPWwO0U/giphy.gif" alt="Empty View" />
        </div>
    );
}

export default EmptyView;
