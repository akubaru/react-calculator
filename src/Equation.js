import React from "react";

class Equation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="formulaScreen" style={{minHeight: 20}}>
                {this.props.equation}
            </div>
        )
    }
}

export default Equation;