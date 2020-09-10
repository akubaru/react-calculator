import React from "react";
import Display from "./Display";
import Button from "./Button";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "0",
            prevVal: "0",
            equation: "",
            lastClick: "",
            currentSign: "pos"
        }
        this.negativeHandler = this.negativeHandler.bind(this);
        this.positiveHandler = this.positiveHandler.bind(this);
        this.lockOp = this.lockOp.bind(this);
        this.maxDigWarn = this.maxDigWarn.bind(this);
    }
    
    negativeHandler(equation, display) {
        this.setState({
            display: '-' + this.state.equation.match(/(\d*\.?\d*)$/)[0],
            equation: equation.replace(/(\d*\.?\d*)$/,'(-' + this.state.equation.match(/(\d*\.?\d*)$/)[0]),
            currentSign: 'neg'
        });
    }

    positiveHandler(equation, lastOpen, display) {
        this.setState({
            currentSign: 'pos'
        });
        if (this.state.lastClick == 'CE') {
            this.setState({
                display: this.state.equation.match(/(\d+\.?\d*)$/)[0],
                equation: equation.substring(0, lastOpen) + equation.substring(lastOpen + 2)
            });
        } else if (display == '-') {
            this.setState({
                display: '0',
                equation: equation.substring(0, lastOpen) + equation.substring(lastOpen + 2)
            });
        } else {
            this.setState({
                display: display.slice(display.indexOf('-') + 1),
                equation: equation.substring(0, lastOpen) + equation.substring(lastOpen + 2)
            });
        }
    }

    lockOp(equation, display) {
        return equation.lastIndexOf('.') == equation.length - 1 || equation.lastIndexOf('-') == equation.length - 1 || display.indexOf('Met') != -1
    }

    maxDigWarn() {
        this.setState({
            display: 'Digit telah mencapai batas',
            prevVal: this.state.display
        });
        setTimeout(() => this.setState({
            display: this.state.prevVal
        }), 1000)
    }

    evalHandler() {
        if (!this.lockOp(this.state.equation, this.state.display)) {
            let exp = this.state.equation;
            if ((/[x+‑/]$/).test(exp)) {
                exp = exp.slice(0, -1);
            }
            exp = exp.replace(/x/g, "*").replace(/-/g, "-");
            exp = exp.lastIndexOf('(') > exp.lastIndexOf(')') ? exp + ')' : exp;
            let result = Math.round(10000000000000 * eval(exp)) / 10000000000000;
            this.setState({
                display: result.toString(),
                equation: exp.replace(/\*/g, '⋅').replace(/-/g, '-') + '=' + result,
                prevVal: result,
                currentSign: result[0] == '-' ? 'neg' : 'pos',
                lastClick: 'evaluated'
            });
        }
    }

    operatorHandler(e) {
        if (!this.lockOp(this.state.equation, this.state.display)) {
            if (this.state.equation.lastIndexOf('(') > this.state.equation.lastIndexOf(')')) {
                this.setState({
                    equation: this.state.equation + ')' + e.target.value,
                    prevVal: this.state.equation + ')'
                });
            } else if (this.state.equation.indexOf('=') != -1) {
                this.setState({
                    equation: this.state.prevVal + e.target.value
                });
            } else {
                this.setState({
                    prevVal: !(/[x/+‑]/).test(this.state.display) ? this.state.equation : this.state.prevVal,
                    equation: !(/[x/+‑]/).test(this.state.display) ? this.state.equation += e.target.value : this.state.prevVal += e.target.value
                });
            }
            this.setState({
                currentSign: 'pos',
                display: e.target.value,
                lastClick: 'operator'
            });
        }
    }

    signHandler() {
        this.setState({
            lastClick: 'sign'
        });
        if (this.state.lastClick == 'evaluated') {
            this.setState({
                display: this.state.display.indexOf('-') > -1 ? this.state.display.slice(1) : '-' + this.state.display,
                equation: this.state.display.indexOf('-') > -1 ? this.state.display.slice(1) : '(-' + this.state.display,
                currentSign: this.state.display.indexOf('-') > -1 ?
                'pos' : 'neg'
            });
        } else if (this.state.currentSign == 'neg') {
            this.positiveHandler(
                this.state.equation,
                this.state.equation.lastIndexOf('(-'),
                this.state.display
            )
        } else {
            this.negativeHandler(
                this.state.equation,
                this.state.display
            )
        }
    }

    // numbersHandler() {}
    
    render() {
        return (
            <div className="container">
                <Display equation={this.state.equation} display={this.state.display} />
                <Button id="clear" value="clear" display="AC" class="row-3 col-1" click={this.inputClear} />
                <Button id="sign" value="+/-" display="±" class="row-3 col-2" />
                <Button id="percent" value="%" display="%" class="row-3 col-3" />
                <Button id="divide" value="/" display="÷" class="oper row-3 col-4" click={this.inputOper} />
                <Button id="seven" value="7" display="7" class="num row-4 col-1" click={this.inputNum} />
                <Button id="eight" value="8" display="8" class="num row-4 col-2" click={this.inputNum} />
                <Button id="nine" value="9" display="9" class="num row-4 col-3" click={this.inputNum} />
                <Button id="multiply" value="*" display="×" class="oper row-4 col-4" click={this.inputOper} />
                <Button id="four" value="4" display="4" class="num row-5 col-1" click={this.inputNum} />
                <Button id="five" value="5" display="5" class="num row-5 col-2" click={this.inputNum} />
                <Button id="six" value="6" display="6" class="num row-5 col-3" click={this.inputNum} />
                <Button id="subtract" value="-" display="−" class="oper row-5 col-4" click={this.inputOper} />
                <Button id="one" value="1" display="1" class="num row-6 col-1" click={this.inputNum} />
                <Button id="two" value="2" display="2" class="num row-6 col-2" click={this.inputNum} />
                <Button id="three" value="3" display="3" class="num row-6 col-3" click={this.inputNum} />
                <Button id="add" value="+" display="+" class="oper row-6 col-4" click={this.inputOper} />
                <Button id="zero" value="0" display="0" class="num row-7 col-1-2" click={this.inputNum} />
                <Button id="decimal" value="." display="." class="num row-7 col-3" click={this.inputDec} />
                <Button id="equals" value="=" display="=" class="oper row-7 col-4" click={this.calculate} />
            </div>
        )
    }
}

export default App;