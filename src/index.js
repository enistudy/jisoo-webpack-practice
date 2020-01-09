import apple from "apple";
import banana from "banana";
import logo from "assets/logo.svg";

import "style.css";
import "style.scss";

console.log("Hello webpack");
apple();
console.log(banana);

const rootElement = document.getElementById("root");
rootElement.innerHTML = `<img src=${logo} alt="svg file"/><h1>webpack!</h1>`;
