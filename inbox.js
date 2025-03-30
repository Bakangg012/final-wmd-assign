document.addEventListener("DOMContentLoaded", function () {
    let user = localStorage.getItem("loggedInUser");
    let welcomeMessage = document.getElementById("welcomeMessage");
    
    if (user && welcomeMessage) {
        welcomeMessage.innerHTML = `<p>Welcome, <strong>${user}</strong>! Here are your messages:</p>`;
        loadMessages(user);
    }

    // Check logout time and redirect logic
    let logoutTime = sessionStorage.getItem("logoutTime");

    if (logoutTime) {
        let timeElapsed = Date.now() - parseInt(logoutTime, 10);
        let redirectTime = 30000; // 30 seconds

        if (timeElapsed >= redirectTime) {
            console.log("Time exceeded. Redirecting to home page...");
            window.location.href = "eazys_cars.html"; // Redirect immediately
        } else {
            let remainingTime = redirectTime - timeElapsed;
            console.log(`Redirecting in ${remainingTime / 1000} seconds...`);

            setTimeout(function () {
                console.log("Redirecting to home page...");
                window.location.href = "eazys_cars.html";
            }, remainingTime);
        }
    }
});

// Load messages from localStorage
function loadMessages(user) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let messageList = document.getElementById("messageList");

    if (!messageList) return; // Ensure element exists

    messageList.innerHTML = ""; // Clear list

    messages.forEach(msg => {
        if (msg.recipient === user) {
            let li = document.createElement("li");
            li.textContent = `From ${msg.sender}: ${msg.content}`;
            messageList.appendChild(li);
        }
    });
}

// Send a message
function sendMessage(event) {
    event.preventDefault();

    let sender = localStorage.getItem("loggedInUser");
    let recipient = document.getElementById("recipient").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!recipient || !message) {
        alert("Please enter a recipient and a message.");
        return false;
    }

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({ sender, recipient, content: message });
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Message sent!");
    document.getElementById("recipient").value = "";
    document.getElementById("message").value = "";
    return false;
}

// Logout function
function logout() {
    console.log("Logging out...");

    // Store logout time before redirecting
    sessionStorage.setItem("logoutTime", Date.now());

    // Redirect to login page
    window.location.href = "login.html";
}
