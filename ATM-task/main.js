// script.js
let balance = 1000; // Default balance
const correctPin = "1234";

const screens = {
  welcome: document.getElementById("welcome-screen"),
  pin: document.getElementById("pin-screen"),
  menu: document.getElementById("menu-screen"),
  transaction: document.getElementById("transaction-screen"),
  balance: document.getElementById("balance-screen"),
};

function showScreen(screen) {
  for (let key in screens) {
    screens[key].classList.add("hidden");
  }
  screens[screen].classList.remove("hidden");
}

// Initial setup
document.getElementById("insert-card-btn").addEventListener("click", () => {
  showScreen("pin");
});

document.getElementById("submit-pin-btn").addEventListener("click", () => {
  const pinInput = document.getElementById("pin-input").value;
  if (pinInput === correctPin) {
    showScreen("menu");
  } else {
    document.getElementById("pin-error").classList.remove("hidden");
  }
});

document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (action === "balance") {
      document.getElementById("balance-amount").innerText = `Your balance is $${balance}`;
      showScreen("balance");
    } else {
      const header = action === "withdraw" ? "Withdraw Funds" : "Deposit Funds";
      document.getElementById("transaction-header").innerText = header;
      showScreen("transaction");
    }
  });
});

document.getElementById("confirm-transaction-btn").addEventListener("click", () => {
  const input = parseFloat(document.getElementById("transaction-input").value);
  const action = document.getElementById("transaction-header").innerText;

  if (action === "Withdraw Funds") {
    if (input > balance) {
      alert("Insufficient funds.");
    } else {
      balance -= input;
      alert(`Withdrawal successful. New balance: $${balance}`);
    }
  } else if (action === "Deposit Funds") {
    balance += input;
    alert(`Deposit successful. New balance: $${balance}`);
  }
  showScreen("menu");
});

document.getElementById("cancel-transaction-btn").addEventListener("click", () => {
  showScreen("menu");
});

document.getElementById("exit-btn").addEventListener("click", () => {
  alert("Session ended. Please remove your card.");
  showScreen("welcome");
});

document.getElementById("return-menu-btn").addEventListener("click", () => {
  showScreen("menu");
});
