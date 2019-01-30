// KLASA KANBAN CARD
function Card(id, name) {
	let self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('card-template', { description: self.name }, 'li');
			
	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}

		if (event.target.classList.contains('card-description')) {
			let newName = prompt("Enter the name of the card");
			var data = new FormData();
			data.append('id', self.id);
			data.append('name', newName);
			data.append('bootcamp_kanban_column_id', self.element.parentNode.id);

			fetch(prefix + baseUrl + '/card/' + self.id, {
				method: 'PUT',
				headers: myHeaders,
				cache: 'no-store',
				body: data,
			})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					console.log(self);
					self.element.querySelector('.card-description').innerText = newName;	
					self.name = newName;
				});
		}
	});
}

Card.prototype = {
	removeCard: function () {
		let self = this;

		fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders, cache: 'no-store' })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			})
	}
}