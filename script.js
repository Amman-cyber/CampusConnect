// Handle login functionality
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password123') {
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Invalid username or password!';
    }
});

// Handle logout functionality
document.getElementById('logout-button')?.addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to login page
});

// Load events from localStorage
document.addEventListener('DOMContentLoaded', function () {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const eventList = document.getElementById('event-list');
    savedEvents.forEach((event) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.title} - ${event.date}`;
        eventList.appendChild(listItem);
    });
});

// Save events to localStorage when adding a new event
document.getElementById('event-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;

    if (title && date) {
        const eventList = document.getElementById('event-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${title} - ${date}`;
        eventList.appendChild(listItem);

        const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
        savedEvents.push({ title, date });
        localStorage.setItem('events', JSON.stringify(savedEvents));

        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
    }
});

// Load budget from localStorage
document.addEventListener('DOMContentLoaded', function () {
    const savedBudget = JSON.parse(localStorage.getItem('budget'));
    if (savedBudget) {
        const summary = document.getElementById('budget-summary');
        summary.innerHTML = `
            <p>Allocated Budget: $${savedBudget.allocated.toFixed(2)}</p>
            <p>Spent Budget: $${savedBudget.spent.toFixed(2)}</p>
            <p>Remaining Budget: $${savedBudget.remaining.toFixed(2)}</p>
        `;
    }
});

// Save budget to localStorage
document.getElementById('budget-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const allocated = parseFloat(document.getElementById('budget-allocated').value);
    const spent = parseFloat(document.getElementById('budget-spent').value);

    if (!isNaN(allocated) && !isNaN(spent)) {
        const remaining = allocated - spent;
        const summary = document.getElementById('budget-summary');
        summary.innerHTML = `
            <p>Allocated Budget: $${allocated.toFixed(2)}</p>
            <p>Spent Budget: $${spent.toFixed(2)}</p>
            <p>Remaining Budget: $${remaining.toFixed(2)}</p>
        `;

        const budget = { allocated, spent, remaining };
        localStorage.setItem('budget', JSON.stringify(budget));

        document.getElementById('budget-allocated').value = '';
        document.getElementById('budget-spent').value = '';
    }
});
