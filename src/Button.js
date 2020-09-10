import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button 
                    type="button" 
                    id={this.props.id} 
                    value={this.props.value} 
                    className={this.props.class}
                    onClick={this.props.click}>
                        {this.props.display}
                </button>
            </div>
        )
    }
}