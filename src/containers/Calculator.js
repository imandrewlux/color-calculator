import React, {useState, useEffect} from 'react';
import Button from '../components/button/button';

const Calculator = props => {
	const numbers = ["7","8","9","4","5","6","1","2","3",".","0","c"]
	const operators = [ "/", "x", "-", "+", "="]
	const [currentNumber, setCurrentNumber] = useState('');
	const [value, setValue] = useState([]);
	const [operator, setOperator] = useState([]);
	const [hexString, setHexSting] = useState('');
	const [isEquals, setIsEquals] = useState(false);
	const [eqDisplay, setEqDisplay] = useState(false);
	const [decPress, setDecPress] = useState(false);


	let numList = numbers.map( (item, key) => {
		return <Button theeClass="num-butt" key={key} num={item} clickFunct={(event) => numberButtonFunction(event, item)}>{item}</Button>
	});

	let opList = operators.map( (operator, key) => {
		return <Button theeClass="op-butt" key={key} num={operator} clickFunct={(event) => opButtonFunction(event, operator)}>{operator}</Button>
	});

 	const hexFunct = () =>{
		if(displayNumber){
			let dongo = degMap(displayNumber);
			setHexSting( Math.round(dongo).toString(16) );
		}
	}

	const numberButtonFunction = (event, item) => {
		if(item === "c"){
			setCurrentNumber('');
			setValue([]);
			setOperator([]);
			setIsEquals(false);
			setEqDisplay(false);
			setHexSting('');
			setDecPress(false);
		}else if(item === "."){
			if(!decPress){
				setCurrentNumber(currentNumber+item);
				setDecPress(true);
			}else{
				return null;
			}
		}
		if(currentNumber.length <= 12 && item != "c"){
			setCurrentNumber(currentNumber+item);
			hexFunct();
		}else{
			return null;
		}

		}

	// document.addEventListener('keydown', function (event) {
	//   if (event.key === '1') {
	//   	numberButtonFunction(event, "1");
	//   }
	//   if (event.key === '2') {
	//   	numberButtonFunction(event, "2");
	//   }
	//   if (event.key === '3') {
	//   	numberButtonFunction(event, "3");
	//   }
	//   if (event.key === '4') {
	//   	numberButtonFunction(event, "4");
	//   }
	//   if (event.key === '5') {
	//   	numberButtonFunction(event, "5");
	//   }
	//   if (event.key === '6') {
	//   	numberButtonFunction(event, "6");
	//   }
	//   if (event.key === '7') {
	//   	numberButtonFunction(event, "7");
	//   }
	//   if (event.key === '8') {
	//   	numberButtonFunction(event, "8");
	//   }
	//   if (event.key === '9') {
	//   	numberButtonFunction(event, "9");
	//   }
	//   if (event.key === '0') {
	//   	numberButtonFunction(event, "0");
	//   }
	// });

	const opButtonFunction = (event, op) => {
		if(op === "="){
			setValue([...value, parseFloat(currentNumber)]);
			setOperator([...operator, op]);
			setIsEquals(true);
			setEqDisplay(true);
			setDecPress(false);
		}else{
		setValue([...value, parseFloat(currentNumber)]);
		setOperator([...operator, op]);
		setCurrentNumber('');
		setDecPress(false);
		if(value.length >= 1){
			setIsEquals(true);
			hexFunct();
		}}
	}

	const eqFunction = (event) => {
			if(operator[0] === "+"){
				let sum = value.reduce((a, b) => a + b);
				if(sum.toString().length <= 12){
					setValue([sum]);
				}else{setValue(["Overflow"])};
				operator.shift();
			} else if(operator[0] === "-"){
				let sum = value.reduce((a, b) => a - b);
				if(sum.toString().length <= 12){
					setValue([sum]);
				}else{setValue(["Overflow"])};
				operator.shift();
			} else if(operator[0] === "x"){
				let sum = value.reduce((a, b) => a * b);
				if(sum.toString().length <= 12){
					setValue([sum]);
				}else{setValue(["Overflow"])};
				operator.shift();
			} else if(operator[0] === "/"){
				let sum = value.reduce((a, b) => a / b);
				if(sum.toString().length <= 12){
					setValue([sum]);
				}else{setValue(["Overflow"])};
				operator.shift();
			}else if(operator[0] === "="){
				operator.shift();
				setValue([value[0]]);
				setCurrentNumber('');
				setEqDisplay(false);
			}
			setIsEquals(false);
	}

	const degMap = (OldValue) => {
	    let OldMax = 10000;
	    let OldMin = 0;
	    let NewMax = 16777215;
	    let NewMin = 1048576;

	    let OldRange = (OldMax - OldMin);
	    let NewRange = (NewMax - NewMin); 
	    let NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
	    return NewValue;
  	}

	let displayNumber = '';
	if(currentNumber && !eqDisplay){
		displayNumber = currentNumber;
	}else{
		displayNumber = value[0];
	}

	useEffect( () => {
		if(isEquals){
			eqFunction();
		}
		hexFunct();
	}, [isEquals, eqFunction]);


	return(
		<div className="whole" style={{backgroundColor: "#"+hexString }}>
			<section className="calculator" >
				<div className="display" >{displayNumber}</div>
				<div className="number-section">
					{numList}
				</div>
				<div className="operator-section">
					{opList}
				</div>
			</section>
		</div>
	)
}

export default Calculator;