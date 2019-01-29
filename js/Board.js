let board = {
    name: 'Tablica Kanban',
    addColumn: function (column) {
        this.element.appendChild(column.element);
        initSortable(column.id); //About this feature we will tell later
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function () {
    let name = prompt('Enter a column name');
    let data = new FormData();

    data.append('name', name);
 
    fetch(baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
    })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            let column = new Column(resp.id, name);
            board.addColumn(column);
        });
});


function initSortable(id) {
    const el = document.getElementById(id);
    let sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
}