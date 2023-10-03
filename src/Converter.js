import {useState,useRef} from "react";
import axios from "axios";

function Converter()
{
	const rAid = useRef();
	const[aid,setAid]=useState("");
	const[msg,setMsg]=useState("");

	const hAid=(event)=>{setAid(event.target.value);}


	const conv=(event)=>{
		event.preventDefault();
		if(aid == "")
		{
			alert("You did not enter amount");
			setMsg("");
			rAid.current.focus();
			return;
		}
	
		let url ="https://api.exchangerate-api.com/v4/latest/USD";
		axios.get(url)		
		.then(res=>{
			let d = res.data.rates.INR;
			let air=aid*d;			
			setMsg("\u20B9"+air);
		})
		.catch(err => setMsg("issue"+err));
	}

	return(
	<>
	<center>
		<h1>Live Currency Converter</h1>
		<form onSubmit={conv}>
		<input type="number" step="any" placeholder="enter amt in $$"
		onChange={hAid} ref={rAid}/>
		<br/><br/>
		<input type="submit" value="Convert"/>
		</form>
		<h1>{msg}</h1>
	</center>
	</>
	);
}

export default Converter;