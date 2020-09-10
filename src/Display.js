import React from "react";

export default class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="calc-display" className="row-1-2 col-1-4">
                <span id="eq">{this.props.equation}</span>
                <span id="display">{this.props.display}</span>
            </div>
        )
    }
}