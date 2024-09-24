// script.js

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the Firebase Realtime Database
const chatRef = firebase.database().ref('chats');

// YouTube video player functionality
document.getElementById('playButton').addEventListener('click', function() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        document.getElementById('youtubeFrame').src = embedUrl;
    } else {
        alert("Please enter a valid YouTube URL!");
    }
});

// Function to extract YouTube Video ID from URL
function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Chat functionality

// Get elements
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

// Function to render chat messages
function renderMessages(snapshot) {
    const data = snapshot.val();
    const messageElement = document.createElement('p');
    messageElement.textContent = data.message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Listen for new messages in real-time
chatRef.on('child_added', renderMessages);

// Function to send a message
function sendMessage() {
    const message = chatInput.value;
    if (message.trim() !== "") {
        chatRef.push().set({
            message: message,
            timestamp: Date.now()
        });
        chatInput.value = ""; // Clear the input field
    }
}

// Event listener for send button
document.getElementById('sendButton').addEventListener('click', sendMessage);
