import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button id="clear" value='AC' onClick={this.props.init} style={{background: '#ac3939'}}>AC</button>
                <button id="delete" value='CE' onClick={this.props.deleteHandler} style={{background: '#ac3939'}}>CE</button>
                <button id="change" value='±'  onClick={this.props.signHandler} style={{background: '#333333'}}>±</button>
                <button id="divide" value='/'  onClick={this.props.operatorHandler} style={{background: '#333333'}}>/</button>
                <button id="seven" value='7'  onClick={this.props.numbersHandler} >7</button>
                <button id="eight" value='8'  onClick={this.props.numbersHandler} >8</button>
                <button id="nine" value='9'  onClick={this.props.numbersHandler} >9</button>
                <button id="multiply" value='x'  onClick={this.props.operatorHandler} style={{background: '#333333'}}>x</button>
                <button id="four" value='4'  onClick={this.props.numbersHandler} >4</button>
                <button id="five" value='5'  onClick={this.props.numbersHandler} >5</button>
                <button id="six" value='6'  onClick={this.props.numbersHandler} >6</button>
                <button id="subtract" value='‑'  onClick={this.props.operatorHandler} style={{background: '#333333'}}>-</button>
                <button id="one" value='1'  onClick={this.props.numbersHandler} >1</button>
                <button id="two" value='2'  onClick={this.props.numbersHandler} >2</button>
                <button id="three" value='3'  onClick={this.props.numbersHandler} >3</button>
                <button id="add" value='+'  onClick={this.props.operatorHandler} style={{background: '#333333'}}>+</button>
                <button id="zero" value='0'  onClick={this.props.numbersHandler} className='zero'>0</button>
                <button id="decimal" value='.'  onClick={this.props.decimalHandler} >.</button>
                <button id="equals" value='='  onClick={this.props.evalHandler} style={{background: '#004466'}}>=</button>
            </div>
        )
    }
}