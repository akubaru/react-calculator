import React from "react";
import Display from "./Display";
import Button from "./Button";
import Equation from "./Equation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            prevVal: '0',
            equation: '',
            lastClick: '',
            currentSign: 'pos'
        }
        this.negativeHandler = this.negativeHandler.bind(this);
        this.positiveHandler = this.positiveHandler.bind(this);
        this.lockOp = this.lockOp.bind(this);
        this.maxDigWarn = this.maxDigWarn.bind(this);
        this.evalHandler = this.evalHandler.bind(this);
        this.operatorHandler = this.operatorHandler.bind(this);
        this.signHandler = this.signHandler.bind(this);
        this.numbersHandler = this.numbersHandler.bind(this);
        this.decimalHandler = this.decimalHandler.bind(this);
        this.initialize = this.initialize.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
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
            exp = exp.replace(/x/g, "*").replace(/‑/g, "-");
            exp = exp.lastIndexOf('(') > exp.lastIndexOf(')') ? exp + ')' : exp;
            let result = Math.round(1000000000000 * eval(exp)) / 1000000000000;
            this.setState({
                display: result.toString(),
                equation: exp.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + result,
                prevVal: result,
                currentSign: result[0] == '-' ? 'neg' : 'pos',
                lastClick: 'evaluated'
            });
        }
    }

    operatorHandler(e) {
        if (!this.state.display.includes("batas")) {
            const value = e.target.value;
            const { equation, prevVal, lastClick } = this.state;
            this.setState({ display: value, evaluated: false });
            if (lastClick == 'evaluated') {
              this.setState({ equation: prevVal + value });
            } else if (!(/[x+‑/]$/).test(equation)) {
              this.setState({
                prevVal: equation,
                equation: equation + value
              });
            } else if (!(/[x/+]‑$/).test(equation)) {
              this.setState({
                equation:
                  ((/[x/+]‑$/).test(equation + value) ? equation : prevVal) + value
              });
            } else if (value !== "‑") {
              this.setState({
                equation: prevVal + value
              });
            }
          }
    }

    signHandler() {
        this.setState({
            lastClick: 'toggleSign'
          });
          if (this.state.lastClick == 'evaluated') { // comment 3
            this.setState({
              display: this.state.display.indexOf('-') > -1 ?
                this.state.display.slice(1) : '-' + this.state.display,
              equation: this.state.display.indexOf('-') > -1 ?
                this.state.display.slice(1) : '(-' + this.state.display,
              currentSign: this.state.display.indexOf('-') > -1 ?
                'pos' : 'neg',
            });
          } else if (this.state.currentSign == 'neg') {
            this.positiveHandler(
              this.state.equation,
              this.state.equation.lastIndexOf('(-'),
              this.state.display)
          } else {
            this.negativeHandler(
              this.state.equation,
              this.state.display
            )
          }
    }

    numbersHandler(e) {
        if (this.state.display.indexOf('Limit') == -1) {
            this.setState({
                lastClick: 'num'
            });
            if (this.state.display.length > 21) {
                this.maxDigWarn();
            } else if (this.state.lastClick == "CE" && this.state.equation !== '') {
                this.setState({
                    display: !(/[x+‑/]$/).test(this.state.equation) ? this.state.equation.match(/(-?\d+\.?\d*)$/)[0] + e.target.value : e.target.value,
                    equation: this.state.equation += e.target.value
                });
            } else if (this.state.equation.indexOf('=') != -1) {
                this.setState({
                    display: e.target.value,
                    equation: e.target.value != '0' ? e.target.value : ''
                });
            } else {
                this.setState({
                    display: this.state.display == '0' || (/[x/+‑]/).test(this.state.display) ? e.target.value : this.state.display + e.target.value,
                    equation: this.state.display == '0' && e.target.value == '0' ? this.state.equation : /([^.0-9]0)$/.test(this.state.equation) ? this.state.equation.slice(0, -1) + e.target.value : this.state.equation + e.target.value
                });
            }
        }
    }

    decimalHandler() {
        if (this.state.display.indexOf('.') == -1 && this.state.display.indexOf('Limit') == -1) {
            this.setState({
                lastClick: this.state.lastClick == 'CE' ? 'CE' : 'decimal'
            });
            if (this.state.display.length > 21) {
                this.maxDigWarn();
            } else if (this.state.lastClick == 'evaluated' || (/[x+‑/]$/).test(this.state.equation) || this.state.display == '0' && this.state.display == '0' && this.state.equation === '' || (/-$/).test(this.state.equation)) {
                this.setState({
                    display: '0',
                    equation: this.state.lastClick == 'evaluated' ? '0.' : this.state.equation + '0.'
                });
            } else if (this.state.equation.match(/(\(?\d+\.?\d*)$/)[0].indexOf('.') > -1 ) {
                
            } else {
                this.setState({
                    display: this.state.equation.match(/(-?\d+\.?\d*)$/)[0] + '.',
                    equation: this.state.equation + '.'
                });
            }
        }
    }

    initialize() {
        this.setState({
            display: '0',
            prevVal: '0',
            equation: '',
            currentSign: 'pos',
            lastClick: ''
        });
    }

    deleteHandler() {
        let thisWith = new RegExp(/[x+-\/]$|\d+\.?\d*$|(\(-\d+\.?\d*)$|(\(-)$|\)[x+-\/]$/);
        if (this.state.equation.indexOf('=') != -1) {
            this.replaceState(this.getInitialState())
        } else {
            this.setState({
                equation: this.state.equation.replace(thisWith, ''),
                display: '0',
                lastClick: 'CE',
            });
        }
        setTimeout(() => {
            this.setState({
                currentSign: this.state.equation === '' || (/[x+‑/]$/).test(this.state.equation) || this.state.equation.match(/(\(?-?\d+\.?\d*)$/)[0].indexOf('-') == -1 ? 'pos' : 'neg'
            });
        }, 100);
    }
    
    render() {
        return (
            <div className="calculator">
                <Equation equation={this.state.equation.replace(/x/g,'⋅')} />
                <Display display={this.state.display} />
                <Button onClick={this.clickHandler} 
                    evalHandler={this.evalHandler}
                    operatorHandler={this.operatorHandler}
                    signHandler={this.signHandler}
                    numbersHandler={this.numbersHandler}
                    decimalHandler={this.decimalHandler}
                    deleteHandler={this.deleteHandler}
                    init={this.initialize} />
            </div>
        )
    }
}

const Author = () => (
    <div className="footer">
        Made by _<a className="button" target="_blank" href="https://github.com/akubaru">Akbar </a><FontAwesomeIcon icon={faGithub} size="lg"/>
    </div>
)

const App = () => (
    <div>
        <Calculator />
        <Author />
    </div>
)

export default App;