// KLASA KANBAN CARD
function Card(id, name) {
	let self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('card-template', { description: this.name }, 'li');

	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();
		if (event.target.classList.contains('card-description')) {
			let name = prompt("Enter the name of the card");
			let data = new FormData();
			self.name = name;
			data.append('id', self.id);
			data.append('name', name);
			data.append('bootcamp_kanban_column_id', self.element.parentNode.id);
			fetch(baseUrl + '/card/' + self.id, {
				method: 'PUT',
				headers: myHeaders,
				body: data,
			})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					//if (resp.id == self.id) {
						self.element.querySelector('.card-description').innerText = name;
					//}
				});
		}
	});	
}
Card.prototype = {
	addCard: function (card) {
		this.element.querySelector('ul').appendChild(card.element);
	},

	removeCard: function () {
		let self = this;

		fetch(baseUrl + '/card/' + self.id, { method: 'DEletE', headers: myHeaders})
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			})
	}
}