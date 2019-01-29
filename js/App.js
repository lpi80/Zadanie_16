fetch(baseUrl + '/board', { headers: myHeaders})
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
	const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	let str = '', i;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function generateTemplate(name, data, basicElement) {
	const template = document.getElementById(name).innerHTML;
	let element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}
