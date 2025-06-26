
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userList = document.getElementById('user-list');
    const clearFormFieldsButton = document.getElementById('clear-form-fields');
    const clearAllUsersButton = document.getElementById('clear-all-users');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let users = JSON.parse(localStorage.getItem('meuCorreUsers')) || [];

    function saveUsers() {
        localStorage.setItem('meuCorreUsers', JSON.stringify(users));
    }

    function renderUsers(filter = '') {
        userList.innerHTML = '';
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(filter.toLowerCase()) || 
            user.email.toLowerCase().includes(filter.toLowerCase())
        );

        filteredUsers.forEach((user, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('user-list-item');
            listItem.innerHTML = `
                <span>${user.date} - ${user.name} (${user.email})</span>
                <button class="delete-user-btn" data-index="${index}">Excluir</button>
            `;
            userList.appendChild(listItem);
        });
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUser = {
            name: userNameInput.value,
            email: userEmailInput.value,
            date: new Date().toLocaleString()
        };

        users.push(newUser);
        saveUsers();
        renderUsers();
        userForm.reset();
    });

    clearFormFieldsButton.addEventListener('click', () => {
        userForm.reset();
    });

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-user-btn')) {
            const indexToDelete = parseInt(e.target.dataset.index);
            users.splice(indexToDelete, 1);
            saveUsers();
            renderUsers();
        }
    });

    clearAllUsersButton.addEventListener('click', () => {
        users = [];
        saveUsers();
        renderUsers();
    });

    searchButton.addEventListener('click', () => {
        renderUsers(searchInput.value);
    });

    renderUsers();
});

