import React from "react";

export default class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="outputScreen" id="display">
                {this.props.display}
            </div>
        )
    }
}