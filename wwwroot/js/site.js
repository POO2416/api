// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri = 'api/TodoItems';
let todos = [];

function getItems() {
    // <snippet_GetItems>
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
    // </snippet_GetItems>
}

function getItems1() {
    // <snippet_GetItems>
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems1(data))
        .catch(error => console.error('Unable to get items.', error));
    // </snippet_GetItems>
    // window.location.reload();
}
// <snippet_AddItem>
function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addSecreteTextbox = document.getElementById('add-secret');



    const item = {
        //isComplete: false,
        name: addNameTextbox.value.trim(),
        secret: addSecreteTextbox.value.trim(),

    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}
// </snippet_AddItem>

function deleteItem(id) {
    // <snippet_DeleteItem>
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
    window.location.reload();
    // </snippet_DeleteItem>
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-secret').value = item.secret;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        // isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        State: document.getElementById('edit-secret').value.trim()
    };

    // <snippet_UpdateItem>
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));
    // </snippet_UpdateItem>
    window.location.reload();
    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        //let isCompleteCheckbox = document.createElement('input');
        //isCompleteCheckbox.type = 'checkbox';
        //isCompleteCheckbox.disabled = true;
        //isCompleteCheckbox.checked = item.isComplete;

        //let editButton = button.cloneNode(false);
        //editButton.innerText = 'Edit';
        //editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        //let deleteButton = button.cloneNode(false);
        //deleteButton.innerText = 'Delete';
        //deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        //let td1 = tr.insertCell(0);
        //td1.appendChild(isCompleteCheckbox);

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode1 = document.createTextNode(item.secret);
        td2.appendChild(textNode1);

        //let td3 = tr.insertCell(2);
        //td3.appendChild(editButton);

        //let td4 = tr.insertCell(3);
        //td4.appendChild(deleteButton);


    });

    todos = data;
}

function _displayItems1(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        //let isCompleteCheckbox = document.createElement('input');
        //isCompleteCheckbox.type = 'checkbox';
        //isCompleteCheckbox.disabled = true;
        //isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        //let td1 = tr.insertCell(0);
        //td1.appendChild(isCompleteCheckbox);

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode1 = document.createTextNode(item.secret);
        td2.appendChild(textNode1);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);


    });

    todos = data;

}
// </snippet_SiteJs>

function retrieve_data() {
    // <snippet_GetItems>
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems1(data))
        .catch(error => console.error('Unable to get items.', error));
    // </snippet_GetItems>
    // window.location.reload();
}
