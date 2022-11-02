const createGame = (player1, hour, player2) => {
	return `
        <li>
            <img src="./images/icon-${player1}.svg" />
            <strong>${hour}</strong>
            <img src="./images/icon-${player2}.svg" />
        </li>
    `;
};

const createCard = (date, day, games) => {
	return `
        <div class="card">
            <h2>${date}<span>${day}</span></h2>

            <ul>
                ${games}
            </ul>
        </div>
    `;
};

document.querySelector("#app").innerHTML = `
    <header>
		<img src="./images/logo.svg" />
	</header>
	<main id="cards">
        ${createCard(
			"02/11",
			"quarta",
			createGame("brazil", "17:00", "serbia") +
				createGame("brazil", "17:00", "serbia"),
		)}
        ${createCard(
			"03/11",
			"quinta",
			createGame("brazil", "16:00", "serbia"),
		)}
	</main>
`;
