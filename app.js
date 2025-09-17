amount = document.getElementById("amount");
category = document.getElementById("category");
date = document.getElementById("date");
searched = document.getElementById("search-item");
// show list of expenses entered by user
function showList() {
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  let table = document.getElementById("expense-list");
  table.innerHTML = "<thead><tr><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>";
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = "₦" + expenses[i].amount;
    cell2.innerHTML = expenses[i].category;
    cell3.innerHTML = expenses[i].date;
    cell4.innerHTML = "<button onclick='deleteExpense(" + i + ")'>Delete</button>";
    total += parseInt(expenses[i].amount);
  }
  let row = table.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = "Total";
  cell2.innerHTML = "";
  cell3.innerHTML = "";
  cell4.innerHTML = "₦" + total;

 // console.log(expenses)
}

// add expense to list
function addExpense() {
  let expense = {
    amount: amount.value,
    category: category.value,
    date: date.value
  };
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  if (expenses == null) {
    expenses = [];
  }
  if (amount.value == "" || category.value == "" || date.value == "") {
    alert("Please fill all fields");
    return;
  }
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showList();
  amount.value = "";
  category.value = "";
  date.value = "";
}

// delete expense from list
function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  if (expenses == null) {
    expenses = [];
  }
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showList();
}

// clear all expenses from list
function clearList() {
  localStorage.removeItem("expenses");
  showList(); 
}

// search for expense
function searchExpense() {
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  let table = document.getElementById("expense-list");
  table.innerHTML = "<thead><tr><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>";
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (
        (amount.value === "" ||String(expenses[i].amount).toLowerCase().includes(amount.value.toLowerCase())) &&
       (category.value === "" || String(expenses[i].category).toLowerCase().includes(category.value.toLowerCase())) &&
       (date.value === "" || String(expenses[i].date).toLowerCase().includes(date.value.toLowerCase()))
            ) {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.innerHTML = "₦" + expenses[i].amount;
      cell2.innerHTML = expenses[i].category;
      cell3.innerHTML = expenses[i].date;
      cell4.innerHTML = "<button onclick='deleteExpense(" + i + ")'>Delete</button>";
      total += parseInt(expenses[i].amount);
    }

  }
  let row = table.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = "Total";
  cell2.innerHTML = "";
  cell3.innerHTML = "";
  cell4.innerHTML = "₦" + total;
}

// load expenses from local storage
showList();


