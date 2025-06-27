async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  const chatBox = document.getElementById("chat-box");

  const userMessage = document.createElement("p");
  userMessage.textContent = "You: " + userInput;
  chatBox.appendChild(userMessage);

  const aiResponse = document.createElement("p");
  aiResponse.textContent = "AI: Thinking...";
  chatBox.appendChild(aiResponse);
  chatBox.scrollTop = chatBox.scrollHeight;

  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("https://wazid-658m.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    aiResponse.textContent = "AI: " + data.reply;
  } catch (error) {
    aiResponse.textContent = "AI: Error getting response.";
  }
}
