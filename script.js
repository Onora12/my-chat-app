document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendBtn');
    const clearButton = document.getElementById('clearBtn');

    // Подключаемся к WebSocket серверу (без библиотек)
    const socket = new WebSocket('wss://ws.itty.io/room/мой-чат');

    // Когда соединение открыто
    socket.addEventListener('open', () => {
        console.log('✅ Подключено к чату');
    });

    // Получаем сообщение от сервера
    socket.addEventListener('message', (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                addMessage(data.data.text, false);
            }
        } catch (e) {
            console.error('Ошибка обработки сообщения:', e);
        }
    });

    // Ошибка соединения
    socket.addEventListener('error', () => {
        addMessage('⚠️ Ошибка подключения к серверу', false);
    });

    // Добавление сообщения на экран
    function addMessage(text, isMy) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isMy ? 'my-message' : 'other-message'}`;
        const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        messageDiv.innerHTML = `${text}<span class="time">${time}</span>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Отправка сообщения
    function sendMessage(text) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'message',
                room: 'мой-чат',
                data: { text }
            }));
            addMessage(text, true);
        } else {
            addMessage('⚠️ Соединение потеряно, обновите страницу', false);
        }
    }

    // Обработчик отправки
    function handleSend() {
        const text = messageInput.value.trim();
        if (text) {
            sendMessage(text);
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // События кнопок
    sendButton.addEventListener('click', handleSend);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Очистка чата
    clearButton.addEventListener('click', () => {
        if (confirm('Удалить все сообщения?')) {
            messagesContainer.innerHTML = '';
        }
    });

    messageInput.focus();
});
