import { connect } from 'itty-sockets'; // Подключаем библиотеку

document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendBtn');
    const clearButton = document.getElementById('clearBtn');

    // 1. Подключаемся к общей комнате
    // Замените 'название-вашей-комнаты' на что-то уникальное
    const room = connect('название-вашей-комнаты');

    // 2. Слушаем входящие сообщения от других
    room.on('message', ({ message }) => {
        // Добавляем полученное сообщение как "чужое"
        addMessage(message.text, false);
    });

    // Функция для отправки сообщения (она же используется для "моих" сообщений)
    function sendMessage(text) {
        // Отправляем сообщение в комнату
        room.send({ text: text });
        // Показываем его у себя как "моё"
        addMessage(text, true);
    }

    // --- Остальной код (loadMessages, renderMessages, clearChat) остаётся без изменений ---
    function loadMessages() {
        // Здесь ваш код для загрузки из localStorage
        // ...
    }

    function renderMessages(messages) {
        // Здесь ваш код для отображения
        // ...
    }

    function addMessage(text, isMy) {
        // Здесь ваш код для добавления сообщения на экран
        // ...
    }

    function clearChat() {
        // Здесь ваш код для очистки чата
        // ...
    }

    // --- Настройка обработчиков ---
    function handleSendMessage() {
        const text = messageInput.value.trim();
        if (text !== '') {
            sendMessage(text); // Используем новую функцию для отправки
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // Инициализация чата
    const initialMessages = loadMessages();
    renderMessages(initialMessages);

    // Привязываем события к кнопкам
    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    clearButton.addEventListener('click', clearChat);
    messageInput.focus();
});