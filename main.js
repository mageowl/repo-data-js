class Repository {
	/**
	 * Github Repository.
	 * @param {object} repoData Raw repository data from api.
	 */
	constructor(repoData) {
		this.data = repoData;
	}

	branch(id) {
		return new Promise((resolve) => {
			fetch(
				`https://api.github.com/repos/${this.data.full_name}/branches/${id}`
			)
				.then((response) => response.json())
				.then((data) => {
					resolve(new Branch(data, this));
				})
				.catch((error) => console.error(error));
		});
	}
}

class Branch {
	constructor(branchData, repo) {
		this.data = branchData;
		this.repo = repo;
	}

	file(path) {
		return new Promise((resolve) => {
			fetch(
				`https://raw.githubusercontent.com/${this.repo.data.full_name}/${this.data.name}/${path}`
			)
				.then((response) => response.text())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => console.error(error));
		});
	}
}

/**
 * Get GitHub repository data
 * @param {string} id Repository identifier.
 * @param {object} options
 * @returns {Promise.<Repository>} Repository object.
 */
function repo(id, options = {}) {
	return new Promise((resolve) => {
		fetch("https://api.github.com/repos/" + id)
			.then((response) => response.json())
			.then((data) => {
				resolve(new Repository(data));
			})
			.catch((error) => console.error(error));
	});
}
