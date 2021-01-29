import "./App.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { useState } from "react";

axios.create({
	baseURL: "http://localhost:5000/",
});

function App() {
	const [shortURL, setShortURL] = useState("");
	const [realURL, setRealURL] = useState("");
	async function getShorterURL(event) {
		event.preventDefault();
		let input = document.getElementById("urlInput").value;
		input = input.trim()
		
		input = input.replace("http://www.",'')
		input = input.replace("https://www.",'')
		input = input.replace("www.","")
		if(input[input.length-1] === "/") input = input.slice(0,-1)
		try {
			let response = await axios.get(`/check/${encodeURIComponent(input)}`);
			setShortURL(`localhost:3000/${response.data}`);
			setRealURL(input);
		} catch (err) {
			console.log(err);
		}
	}

	const content = () => (
		<div>
			<form>
				<label htmlFor="urlInput">URL to make short</label>
				<input id="urlInput" type="text" />
				<button onClick={getShorterURL}>get shorter URL</button>
			</form>
			<p>Short URL:</p>
			<a id="shortURL" href={`https://${realURL}`} target="_blank" rel="noreferrer">
				{shortURL}
			</a>
		</div>
	);

	return (
		<Router>
			<div className="App">
				<Route path="/"  component={content}></Route>
			</div>
		</Router>
	);
}

export default App;
