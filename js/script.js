class User {
    constructor (obj) {
        this.data = obj;
    }
    edit(obj) {
        this.data = obj;
    }
    get() {
        return this.data;
    }
}
class Contacts {
    constructor() {
        this.data = [];
    }
    add(data) {
        let user = new User(data);
        this.data.push(user);
    }
    edit(id, obj) {
        let user = this.data.find(function(item) {
          return item.get().id === id
        });
        user.edit(obj);
    }
    remove(id) {
        this.data = this.data.filter(function(item) {
            return item.get().id !== id
        });
    }

}

class ContactsApp extends Contacts {
    constructor() {
        super();
        this.init();
    }
    getStorage() {
        const dataString = localStorage.getItem('contactsData');
        const data = JSON.parse(dataString) || [];

        data.forEach((item) => {
            this.add(item.data);
        });
    }
    setStorage() {
        const dataString = JSON.stringify(this.data);
        localStorage.setItem('contactsData', dataString);
    }
    init() {
        this.getStorage();

        const contactsElem = document.createElement('div');
        contactsElem.classList.add('contacts');

        const contactsForm = document.createElement('div');
        contactsForm.classList.add('contacts__form');

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contacts__list');

        this.idInput = document.createElement('input');
        this.idInput.setAttribute('name', 'contacts_add');
        this.idInput.classList.add('contacts__inp');
        this.idInput.setAttribute('placeholder', 'Введите id');

        this.lastNameInput = document.createElement('input');
        this.lastNameInput.setAttribute('name', 'contacts_add');
        this.lastNameInput.classList.add('contacts__inp');
        this.lastNameInput.setAttribute('placeholder', 'Введите фамилию');
        
        this.firstNameInput = document.createElement('input');
        this.firstNameInput.setAttribute('name', 'contacts_add');
        this.firstNameInput.classList.add('contacts__inp');
        this.firstNameInput.setAttribute('placeholder', 'Введите имя');

        this.phoneNumberInput = document.createElement('input');
        this.phoneNumberInput.setAttribute('name', 'contacts_add');
        this.phoneNumberInput.classList.add('contacts__inp');
        this.phoneNumberInput.setAttribute('placeholder', 'Введите телефон');

        this.addressInput = document.createElement('input');
        this.addressInput.setAttribute('name', 'contacts_add');
        this.addressInput.classList.add('contacts__inp');
        this.addressInput.setAttribute('placeholder', 'Ваш адрес');

        this.emailInput = document.createElement('input');
        this.emailInput.setAttribute('name', 'contacts_add');
        this.emailInput.classList.add('contacts__inp');
        this.emailInput.setAttribute('placeholder', 'Ваш email');

        this.contactsBtnAdd = document.createElement('button');
        this.contactsBtnAdd.innerHTML = 'Send';
        this.contactsBtnAdd.classList.add('contacts__send');
        
        contactsElem.appendChild(contactsForm);
        contactsForm.appendChild(this.idInput);
        contactsForm.appendChild(this.lastNameInput);
        contactsForm.appendChild(this.firstNameInput);
        contactsForm.appendChild(this.phoneNumberInput);
        contactsForm.appendChild(this.addressInput);
        contactsForm.appendChild(this.emailInput);
        contactsForm.appendChild(this.contactsBtnAdd);
        contactsElem.appendChild(this.contactsList);
        document.body.appendChild(contactsElem);

        this.lastNameInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.firstNameInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.phoneNumberInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.addressInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.emailInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.contactsBtnAdd.addEventListener('click', event => {
            this.onAdd(event);
        });
        
        this.updateList();
    }

    onRemove(event) {
        const parent = event.target.closest('.contacts__item');
        const id = parent.dataset.id;
        if (!id) return;
        this.remove(id, 1);
        this.updateList();
    }

    onEdit(event) {
        const parent = event.target.closest('.contacts__item');
        const id = parent.dataset.id; 

        if (!id) return;

        const note = this.data.find(note => {
            return note.data.id == id;
        });

        this.idInput.value = note.data.id;
        this.lastNameInput.value = note.data.lastName;
        this.firstNameInput.value = note.data.firstName;
        this.phoneNumberInput.value = note.data.phoneNumber;
        this.addressInput.value = note.data.address;
        this.emailInput.value = note.data.email;

        this.idInput.dataset.action = 'edit';
        this.idInput.dataset.id = id;
    }

    updateList() {
        if (!this.data) return;
        this.contactsList.innerHTML = '';

        this.data.forEach((user, index) => {
            const contactsElem = document.createElement('div');
            contactsElem.classList.add('contacts__item');
            contactsElem.dataset.id = user.data.id;

            const contactsContainer = document.createElement('div');
            contactsContainer.classList.add('contacts__container');
            contactsElem.appendChild(contactsContainer);

            const idElement = document.createElement('div');
            idElement.innerHTML = user.data.id;

            const lastNameElement = document.createElement('div');
            lastNameElement.innerHTML = user.data.lastName;

            const firstNameElement = document.createElement('div');
            firstNameElement.innerHTML = user.data.firstName;

            const phoneNumberElement = document.createElement('div');
            phoneNumberElement.innerHTML = user.data.phoneNumber;

            const addressElement = document.createElement('div');
            addressElement.innerHTML = user.data.address;

            const emailElement = document.createElement('div');
            emailElement.innerHTML = user.data.email;

            contactsContainer.appendChild(idElement);
            contactsContainer.appendChild(lastNameElement);
            contactsContainer.appendChild(firstNameElement);
            contactsContainer.appendChild(phoneNumberElement);
            contactsContainer.appendChild(addressElement);
            contactsContainer.appendChild(emailElement);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons__container');
            contactsElem.appendChild(buttonsContainer);

            this.contactsList.appendChild(contactsElem);
            const button = document.createElement('button');
            button.id = index;
            button.innerHTML = 'delete';
            buttonsContainer.appendChild(button);
            button.classList.add('contacts__btn');

            const editButton = document.createElement('button');
            editButton.id = index;
            editButton.innerHTML = 'edit';
            buttonsContainer.appendChild(editButton);
            editButton.classList.add('contacts__btn');

            editButton.addEventListener('click', event => {
                this.onEdit(event);
            });

            button.addEventListener('click', event => {
                this.onRemove(event);
            });
        });
        this.setStorage();
    }

    onAdd(event) {
        if (event.type == 'keyup' && (event.ctrlKey != true || event.key != 'Enter')) return;
        if (this.idInput.value.length == 0) return;

        const data = {
            id: this.idInput.value,
            lastName: this.lastNameInput.value,
            firstName: this.firstNameInput.value,
            phoneNumber: this.phoneNumberInput.value,
            address: this.addressInput.value,
            email: this.emailInput.value,
        }

        if (this.idInput.dataset.action === 'edit' && this.idInput.dataset.id) {
            this.edit(this.idInput.dataset.id, data);
            this.idInput.dataset.action = '';
            this.idInput.dataset.id = '';
        } else {
            this.add(data);
        }

        this.updateList();

        this.idInput.value = '';
        this.lastNameInput.value = '';
        this.firstNameInput.value = '';
        this.phoneNumberInput.value = '';
        this.addressInput.value = '';
        this.emailInput.value = '';
    }
}

new ContactsApp();