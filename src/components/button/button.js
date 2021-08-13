import React from 'react';

const button = (props) => {
	return(
		<button className={props.theeClass} onClick={props.clickFunct}>
			{props.num}
		</button>
	);
}

export default button;