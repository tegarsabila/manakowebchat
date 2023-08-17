const chatForm = document.getElementById('chat-form');
const userMessageInput = document.getElementById('user-message');
const chatBox = document.querySelector('.chat-box');

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const userMessage = userMessageInput.value;
    if (userMessage.trim() !== '') {
        sendUserMessage(userMessage);
        userMessageInput.value = ''; // Clear input
    }
});

function showTypingIndicator() {
    const botTypingMessage = "Bot sedang mengetik...";
    displayMessage(botTypingMessage, 'bot typing');

    setTimeout(function () {
        const botResponse = "Ini adalah respons dari bot setelah mengetik.";
        const botTimestamp = getCurrentTime();
        displayMessage(botResponse, 'bot', botTimestamp);
    }, 1500);
}

function sendUserMessage(message) {
    const timestamp = getCurrentTime();
    displayMessage(`${message}`, 'user', timestamp);
    fetch('/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response;
        const botTimestamp = getCurrentTime();
        displayMessage(botResponse, 'bot', botTimestamp);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function displayMessage(message, type, timestamp) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);

    const bubbleElement = document.createElement('div');
    bubbleElement.classList.add('message-bubble');
    bubbleElement.textContent = message;
    messageElement.appendChild(bubbleElement);

    const timestampElement = document.createElement('div');
    timestampElement.classList.add('message-timestamp');
    timestampElement.textContent = timestamp;
    messageElement.appendChild(timestampElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
