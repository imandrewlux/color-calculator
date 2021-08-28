import React, {useState, useEffect} from 'react';
import Button from '../components/button/button';
import ColorNames from '../colorArr';

const Calculator = props => {
	const numbers = ["7","8","9","4","5","6","1","2","3",".","0","c"]
	const operators = [ "/", "x", "-", "+", "="]
	const [currentNumber, setCurrentNumber] = useState('');
	const [value, setValue] = useState([]);
	const [operator, setOperator] = useState([]);
	const [hexString, setHexSting] = useState('000000');
	const [isEquals, setIsEquals] = useState(false);
	const [eqDisplay, setEqDisplay] = useState(false);
	const [decPress, setDecPress] = useState(false);
	let textcontainer = document.querySelector('.bg-text');


	let numList = numbers.map( (item, key) => {
		return <Button theeClass="num-butt" key={key} num={item} clickFunct={(event) => numberButtonFunction(event, item)}>{item}</Button>
	});

	let opList = operators.map( (operator, key) => {
		return <Button theeClass="op-butt" key={key} num={operator} clickFunct={(event) => opButtonFunction(event, operator)}>{operator}</Button>
	});

 	const hexFunct = () =>{
		if(displayNumber){
			let dongo = degMap(displayNumber);

			if(dongo < 0){
				dongo = Math.abs(dongo);
			}

			if(dongo <= 15.5 ){
				setHexSting("00000" + Math.round(dongo).toString(16));
			}else if(dongo <= 255.5){
				setHexSting("0000" + Math.round(dongo).toString(16));
			}else if(dongo <= 4095.5){
				setHexSting("000" + Math.round(dongo).toString(16));
			}else if(dongo <= 65535.5){
				setHexSting("00" + Math.round(dongo).toString(16));
			}else if(dongo <= 1048575.5){
				setHexSting("0" + Math.round(dongo).toString(16));
			}else{
				setHexSting( Math.round(dongo).toString(16));
			}
			textcontainer.innerHTML = '';
			ColorNames.forEach( (el) => {
					if(hexString === el.hex){
						for(let i = 0; i <= 500; i++){
						textcontainer.append(` ${el.colorName} `);
					}
				}
			})
		}
	}

	const numberButtonFunction = (event, item) => {
		let allButtons = document.querySelectorAll('button');
		allButtons.forEach( element => element.classList.remove("ON") );
		event.target.classList.add("ON");

		if(item === "c" ){
			setHexSting('000000');
			setCurrentNumber('');
			setValue([]);
			setOperator([]);
			setIsEquals(false);
			setEqDisplay(false);
			setDecPress(false);
			hexFunct();
			textcontainer.innerHTML = '';
		}else if(item === "."){
			if(!decPress){
				setCurrentNumber(currentNumber+item);
				setDecPress(true);
			}else{
				return null;
			}
		}
		if(currentNumber.length < 6 && item !== "c"){
			setCurrentNumber(currentNumber+item);
			hexFunct();
		}else{
			return null;
		}

	}


// useEffect( () => {
// 	document.addEventListener('keydown', event => {
// 		if(!event.repeat ){
// 			if(event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51 || event.keyCode === 52 || event.keyCode === 53 || event.keyCode === 54 || event.keyCode === 55 || event.keyCode === 56 || event.keyCode === 57 || event.keyCode === 58){
// 				numberButtonFunction(event, event.key);
// 				//console.log("SHITBRAINS");
// 			}
// 		}
// 	});
// }, []);



	const opButtonFunction = (event, op) => {
		if(op === "="){
			if(currentNumber){
			setValue([...value, parseFloat(currentNumber)]);
			setOperator([...operator, op]);
			setIsEquals(true);
			setEqDisplay(true);
			setDecPress(false);
			}else{}
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
				if(sum.toString().length <= 9 && sum < 999999){
					setValue([sum]);
				}else if(sum.toString().length >= 9 && sum < 999999)
					{setValue([Math.round(sum * 10000) / 10000])
				}else if(sum.toString().length >= 9 && sum > 999999){
					setValue(["Overflow"]);
				}
				operator.shift();
			} else if(operator[0] === "-"){
				let sum = value.reduce((a, b) => a - b);
				if(sum.toString().length <= 6 && sum < 999999){
					setValue([sum]);
				}else if(sum.toString().length >= 6 && sum < 999999)
				{setValue([Math.round(sum * 10000) / 10000])
				}else if(sum.toString().length >= 6 && sum > 999999){
					setValue(["Overflow"]);
				}
				operator.shift();
			} else if(operator[0] === "x"){
				let sum = value.reduce((a, b) => a * b);
				if(sum.toString().length <= 6 && sum < 999999){
					setValue([sum]);
				}else if(sum.toString().length >= 6 && sum < 999999)
				{setValue([Math.round(sum * 10000) / 10000])
				}else if(sum.toString().length >= 6 && sum > 999999){
					setValue(["Overflow"]);
				}
				operator.shift();
			} else if(operator[0] === "/"){
				let sum = value.reduce((a, b) => a / b);
				if(sum.toString().length <= 6 && sum < 999999){
					setValue([sum]);
				}else if(sum.toString().length >= 6 && sum < 999999)
				{setValue([Math.round(sum * 10000) / 10000])
				}else if(sum.toString().length >= 6 && sum > 999999){
					setValue(["Overflow"]);
				}
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
	    let OldMax = 999999;
	    let OldMin = 0;
	    let NewMax = 16777215;
	    let NewMin = 0;

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
			<div className="hex">#{hexString}</div>
			<section className="calculator" >
				<div className="display" >{displayNumber}</div>
				<div className="number-section">
					{numList}
				</div>
				<div className="operator-section">
					{opList}
				</div>
			</section>
			<div className="bg-text"></div>
		</div>
	)
}

export default Calculator;