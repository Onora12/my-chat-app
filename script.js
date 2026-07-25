document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendBtn');
    const clearButton = document.getElementById('clearBtn');

    // Подключаемся к комнате (не забудь заменить название!)
    const room = ittySockets.connect('мой-чат-2025');

    // Слушаем входящие сообщения
    room.on('message', ({ message }) => {
        addMessage(message.text, false);
    });

    // Функция добавления сообщения на экран
    function addMessage(text, isMy) {
        const messageDiv = document.createElement('div');document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendBtn');
    const clearButton = document.getElementById('clearBtn');

    // Создаём WebSocket напрямую (без библиотек)
    const socket = new WebSocket('wss://ws.itty.io/room/мой-чат-2025');

    // Подключение установлено
    socket.addEventListener('open', () => {
        console.log('✅ Подключен к чату');
    });

    // Получение сообщения от сервера
    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            addMessage(data.data.text, false);
        }
    });

    // Ошибка соединения
    socket.addEventListener('error', (error) => {
        console.error('❌ Ошибка WebSocket:', error);
        addMessage('⚠️ Не удалось подключиться к серверу', false);
    });

    // Функция добавления сообщения на экран
    function addMessage(text, isMy) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isMy ? 'my-message' : 'other-message'}`;
        const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        messageDiv.innerHTML = `
            ${text}
            <span class="time">${time}</span>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Отправка сообщения
    function sendMessage(text) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'message',
                room: 'мой-чат-2025',
                data: { text }
            }));
            addMessage(text, true);
        } else {
            console.error('❌ Соединение не открыто');
            addMessage('⚠️ Соединение потеряно', false);
        }
    }

    // Обработчик отправки
    function handleSendMessage() {
        const text = messageInput.value.trim();
        if (text !== '') {
            sendMessage(text);
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // Привязываем события
    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Очистка чата
    clearButton.addEventListener('click', () => {
        if (confirm('Удалить всю историю сообщений?')) {
            messagesContainer.innerHTML = '';
        }
    });

    // Фокус на поле ввода
    messageInput.focus();
});
        messageDiv.className = `message ${isMy ? 'my-message' : 'other-message'}`;
        const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        messageDiv.innerHTML = `
            ${text}
            <span class="time">${time}</span>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Отправка сообщения
    function sendMessage(text) {
        room.send({ text });
        addMessage(text, true);
    }

    // Обработчик отправки
    function handleSendMessage() {
        const text = messageInput.value.trim();
        if (text !== '') {
            sendMessage(text);
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // Привязываем события
    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Очистка чата
    clearButton.addEventListener('click', () => {
        if (confirm('Удалить всю историю сообщений?')) {
            messagesContainer.innerHTML = '';
        }
    });

    messageInput.focus();
});
