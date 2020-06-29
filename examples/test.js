repo("seattleowl/deck-master").then(async (repository) => {
	let master = await repository.branch("master");
	document.getElementById("results").innerHTML = await master.file(
		"assets/scripts/engine.js"
	);
});
