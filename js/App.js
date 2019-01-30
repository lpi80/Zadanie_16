const prefix = "https://cors-anywhere.herokuapp.com/";
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
	'X-Client-Id': '3592',
	'X-Auth-Token': '9062d06ea6cee1c4f6ce0f65ab7f868c'
};

fetch(prefix + baseUrl + '/board', { headers: myHeaders, cache: "no-store" })
	.then(function (resp) {
		return resp.json();
	})
	.then(function (resp) {
		setupColumns(resp.columns);
	});

function setupColumns(columns) {
	columns.forEach(function (column) {
		let col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		let cardObj = new Card(card.id, card.name);
		col.addCard(cardObj);
	});
}

// OGÓLNA FUNKCJA
function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '', i;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}
