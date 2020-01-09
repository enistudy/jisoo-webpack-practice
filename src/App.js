import React from "react";
import apple from "apple";
import banana from "banana";
import logo from "assets/logo.svg";

import "style.css";
import "style.scss";

const App = () => {
	apple();
	console.log(banana);

	return (
		<>
			<img className={"react-logo"} src={logo}></img>
			<h1 className={"title"}>react</h1>
		</>
	);
};

export default App;
