async function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += <p>You: ${userInput}</p>;
  chatBox.innerHTML += <p>AI: ...</p>;
  chatBox.scrollTop = chatBox.scrollHeight;

  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("https://wazid-658m.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const lastMessage = chatBox.querySelectorAll("p")[chatBox.querySelectorAll("p").length - 1];
    lastMessage.textContent = "AI: " + (data.reply || "No reply from AI.");
  } catch (error) {
    console.error(error);
    chatBox.innerHTML += <p>AI: Error connecting to server.</p>;
  }
}
