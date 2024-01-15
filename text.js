const messageInput = document.getElementById('message');
    const counter = document.getElementById('counter');
    const sendButton = document.getElementById('sendButton');

    messageInput.addEventListener('input', updateCounter);

    function updateCounter() {
      const currentLength = messageInput.value.length;
      counter.textContent = `${currentLength}/500 characters`;
      sendButton.disabled = currentLength === 0 || currentLength > 500;
    }