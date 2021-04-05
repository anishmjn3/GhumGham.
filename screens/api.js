// const apiUrl = 'https://en.wikipedia.org/';
// const searchUri = "w/api.php?format=json&action=query&prop=extracts&titles="
const apiUrl= 'https://ghumgham-909e9.firebaseio.com/places/';
export default function wikiApi(term) {
	return fetch(apiUrl + term+'.json')
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			let article = {};
			let results = json.query.pages;
			for (let i in results) {
				if (i > 0) {
					let result = results[i];
					article.title = result.title;
					article.content = result.extract;
					break;
				}
			}
			return article;
		});
}
