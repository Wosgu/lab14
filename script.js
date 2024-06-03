// Обработчик события для кнопки "Открыть чат"
document.getElementById('openChatButton').addEventListener('click', function() {
    // При нажатии кнопки "Открыть чат" делаем контейнер чата видимым
    document.getElementById('chatContainer').style.display = 'block';
});

// Обработчик события для кнопки "Закрыть чат"
document.getElementById('closeChatButton').addEventListener('click', function() {
    // При нажатии кнопки "Закрыть чат" скрываем контейнер чата
    document.getElementById('chatContainer').style.display = 'none';
});

// Обработчик события для кнопки "Отправить сообщение"
document.getElementById('sendMessageButton').addEventListener('click', function() {
    // Получаем текст сообщения, введенный пользователем
    var userMessage = document.getElementById('userMessage').value;
    // Получаем контейнер для сообщений чата
    var chatMessages = document.getElementById('chatMessages');

    // Добавляем сообщение пользователя в окно чата
    addMessage('user', userMessage);
    // Очищаем поле ввода сообщения
    document.getElementById('userMessage').value = '';

    // Получаем ответ бота на сообщение пользователя
    var botResponse = getBotResponse(userMessage);
    // Добавляем ответ бота в окно чата
    addMessage('bot', botResponse);

    // Обновляем варианты сообщений, если такие есть
    updateOptions();
});

// Определение вариантов сообщений пользователя
var userResponses = {
    'Привет': 'Здравствуйте!',
    'Как дела?': 'Отлично, чем могу помочь?',
    'Где ты?': 'Я тут',
};

// Функция для инициализации вариантов сообщений
function initOptions() {
    // Создаем контейнер для вариантов сообщений
    var optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    // Перебираем варианты сообщений пользователя и создаем кнопки
    for (var option in userResponses) {
        if (userResponses.hasOwnProperty(option)) {
            var optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.addEventListener('click', function(e) {
                // Обработчик для выбора варианта сообщения
                var selectedOption = e.target.textContent;
                selectOption(selectedOption);
            });
            optionsDiv.appendChild(optionButton);
        }
    }
    
    // Добавляем контейнер с вариантами сообщений в окно чата
    chatMessages.appendChild(optionsDiv);
}

// Инициализация: создать варианты сообщений
initOptions();

// Функция для добавления сообщения в окно чата
function addMessage(sender, message) {
    // Создаем элемент для сообщения с указанием отправителя (user/bot) и текстом сообщения
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    messageDiv.innerHTML = '<p><strong>' + sender + ':</strong> ' + message + '</p';
    
    // Добавляем элемент сообщения в контейнер сообщений чата
    chatMessages.appendChild(messageDiv);
    // Прокручиваем окно чата вниз для отображения новых сообщений
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция для получения ответа бота на сообщение пользователя
function getBotResponse(userMessage) {
    // Здесь можно добавить логику для генерации ответа бота на основе сообщения пользователя
    // Например, вы можете использовать объект с ключевыми фразами и соответствующими ответами
    var responses = {
        'привет': 'Привет! Как я могу вам помочь?',
        'как дела?': 'У меня всё отлично, спасибо!',
        'что ты умеешь?': 'Я могу отвечать на ваши вопросы. Просто напишите их.'
    };
    // Проверяем, есть ли ключевая фраза в объекте, и возвращаем соответствующий ответ, если он есть
    return responses[userMessage.toLowerCase()] || 'Извините, я не понимаю ваш запрос.';
}

// Функция для обновления вариантов сообщений
function updateOptions() {
    // Удаляем старые варианты сообщений
    var optionsDiv = document.querySelector('.options');
    if (optionsDiv) {
        optionsDiv.parentNode.removeChild(optionsDiv);
    }

    // Получаем новые варианты из пользовательских вариантов
    var newOptions = Object.keys(userResponses);

    if (newOptions.length > 0) {
        // Создаем новый блок с вариантами сообщений
        var newOptionsDiv = document.createElement('div');
        newOptionsDiv.className = 'options';
        newOptions.forEach(function(option) {
            var optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.addEventListener('click', function(e) {
                // Обработчик для выбора варианта сообщения
                var selectedOption = e.target.textContent;
                selectOption(selectedOption);
            });
            newOptionsDiv.appendChild(optionButton);
        });

        // Добавляем новые варианты в окно чата
        chatMessages.appendChild(newOptionsDiv);
    }
}

// Функция для обработки выбора варианта сообщения
function selectOption(option) {
    // Отправляем выбранный вариант сообщения в окно чата как сообщение пользователя
    addMessage('user', option);
    // Очищаем поле ввода сообщения
    document.getElementById('userMessage').value = '';

    // Получаем ответ бота на выбранный вариант из объекта userResponses
    var botResponse = userResponses[option];
    // Добавляем ответ бота в окно чата
    addMessage('bot', botResponse);

    // Обновляем варианты сообщений
    updateOptions();
}