import React, { useState, useEffect } from 'react';
import axios from 'axios';
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { useParams } from 'react-router';

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/NicholasDuenas";
	useEffect(async () => {
		// Define the API endpoint
		getList()
	}, []);

	const putNewList = async (inputValue) => {
		const newList = todos.concat([{label: inputValue, done: false}])
		// Make a PUT request
		try {
			await axios.put(apiUrl, newList)
		} catch (error) {
			console.error('Error fetching data', error)
		}
	}

	const getList = async () => {
		// Make a GET request
		try {
			const res = await axios.get(apiUrl)
			setTodos(res.data)
		} catch (error) {
			console.error('Error fetching data', error)
		}
	}

	const handleDelete = async () => {
		try {
		// Make a DELETE request using Axios
		await axios.delete(`https://playground.4geeks.com/apis/fake/todos/user/NicholasDuenas`);
	
		// Handle success, e.g., show a success message or update the UI
		console.log('User deleted successfully');
		} catch (error) {
		// Handle error, e.g., show an error message or log the error
		console.error('Error deleting user:', error);
		}
	};


	// //{item}{""}<i class="fa-solid fa-xmark" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
	return (
		<div className="container">
			<h1 className="text-center mt-5">My Todo's</h1>
			<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue}
						onKeyPress={async(e) => {
							if (e.key === "Enter") {
								await putNewList(inputValue)
								getList()
								setInputValue("");
							}
						}}
							placeholder="what do you need to do?"/>
			<ul>
				{todos.map((item, index) => (
					<li key={item.id}>
						{item.label}
					</li>
				))}
			</ul>
			<button onClick={handleDelete}>
      			Delete User
    		</button>	
			<div>{todos.length}Tasks</div>
		</div>
	);
};

export default Home;


