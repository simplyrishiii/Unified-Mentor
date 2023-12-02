// Get DOM elements
const incomeForm = document.querySelector('#income form');
const expenseForm = document.querySelector('#expenses form');
const transactionList = document.querySelector('#transaction-list');
const incomeAmount = document.querySelector('#income-amount');
const expensesAmount = document.querySelector('#expenses-amount');

// Initialize transaction data
let transactions = [];

// Add income transaction
incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = incomeForm.querySelector('#income-date').value;
  const description = incomeForm.querySelector('#income-description').value;
  const amount = parseFloat(incomeForm.querySelector('#income-amount').value);

  if (date && description && amount) {
    const transaction = {
      type: 'income',
      date,
      description,
      amount
    };

    transactions.push(transaction);
    updateTransactions();
    updateSummary();
    incomeForm.reset();
  }
});

// Add expense transaction
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = expenseForm.querySelector('#expense-date').value;
  const description = expenseForm.querySelector('#expense-description').value;
  const amount = parseFloat(expenseForm.querySelector('#expense-amount').value);

  if (date && description && amount) {
    const transaction = {
      type: 'expense',
      date,
      description,
      amount
    };

    transactions.push(transaction);
    updateTransactions();
    updateSummary();
    expenseForm.reset();
  }
});

// Delete transaction
transactionList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const transactionIndex = e.target.dataset.index;
    transactions.splice(transactionIndex, 1);
    updateTransactions();
    updateSummary();
  }
});

// Update transactions list
function updateTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${transaction.date}</span>
      <span>${transaction.description}</span>
      <span>${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    transactionList.appendChild(listItem);
  });
}

// Update summary
function updateSummary() {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  incomeAmount.textContent = `$${totalIncome.toFixed(2)}`;
  expensesAmount.textContent = `$${totalExpenses.toFixed(2)}`;
}