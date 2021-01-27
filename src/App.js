import "./App.css";
import axios from "axios";
import React , {useState, useEffect} from 'react'
axios.create({
	baseURL: "http://localhost:5000/"
})

function App() {
	const [ shortURL , setShortURL ] = useState("")
	const [ hrefToShow , setHref ] = useState("/")
	
	async function getShorterURL(event) {
		event.preventDefault();
		const input = document.getElementById("urlInput").value;
		console.log(input)
		try{
			let response = await axios.get(`/check/${input}`);
			// console.log(response)
			setShortURL(`localhost:3000/${response.data}`)
			setHref(response.data)
		}
		catch(err){
			console.log(err)
			console.log("algo paso")
		}
	}
	return (
		<div className="App">
			<form>
				<label htmlFor="urlInput">URL to make short</label>
				<input id="urlInput" type="url" />
				<button onClick={getShorterURL}>get shorter URL</button>
			</form>
			<p>Short URL:</p>
			<a id="shortURL" href={hrefToShow}>{shortURL}</a>
		</div>
	);
}

export default App;
