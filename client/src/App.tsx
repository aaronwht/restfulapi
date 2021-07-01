import React, { useEffect, useState } from "react";

function App() {
	const [people, setPeople]: any[] = useState([]);
	const [firstName, setFirstName] = useState("");

	async function handleSubmit() {
		const resp = await window.fetch(`${process.env.REACT_APP_API}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Mode: "cors",
				Accept: "application/json",
			},
			body: JSON.stringify({ firstName }),
		});

		const data = await resp.json();
		data.lastName = "";

		const existingPersons: any[] = [...people];
		existingPersons.push(data);
		setPeople(existingPersons);
	}

	useEffect(() => {
		(async () => {
			const resp = await window.fetch(`${process.env.REACT_APP_API}people`);
			const data = await resp.json();
			setPeople(data);
		})();
	}, []);

	return (
		<div>
			<input type="text" onChange={(e) => setFirstName(e.target.value)} />
			<button onClick={handleSubmit}>Submit</button>
			<br />
			{people !== null &&
				typeof people !== "undefined" &&
				people.length !== 0 &&
				people.map((person: any) => {
					return (
						<div key={person.id}>
							{person.id.toFixed(2) +
								" " +
								person.firstName.substr(0, 1) +
								". " +
								person.lastName}
						</div>
					);
				})}
		</div>
	);
}

export default App;
