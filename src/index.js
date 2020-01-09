import apple from "./apple";
import banana from "./banana";
import logo from "./assets/logo.svg";

import "./style.css";

console.log("Hello webpack");
apple();
console.log(logo);

const rootElement = document.getElementById("root");
rootElement.innerHTML = `<img src=${logo}>`;
