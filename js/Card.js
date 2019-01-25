// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	//this.description = description;
	this.element = generateTemplate('card-template', { description: this.name }, 'li');

	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}

		if (event.target.classList.contains('add-card')) {
			self.addCard(new Card(cardName));
			event.preventDefault();

			var data = new FormData();
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', self.id);

			fetch(prefix + baseUrl + '/card', {
				method: 'POST',
				headers: myHeaders,
				cache: 'no-store',
				body: data,
			})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					var card = new Card(resp.id, cardName);
					self.addCard(card);
				});
		}
	});

}
Card.prototype = {
	addCard: function(card) {
		this.element.querySelector('ul').appendChild(card.element);
	},
	
	removeCard: function () {
		let self = this;

		fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders, cache: 'no-store' })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(this.element);
			})
	}
}