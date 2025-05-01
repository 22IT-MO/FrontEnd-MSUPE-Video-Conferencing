// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Получаем форму и поля ввода
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Проверка на мобильное устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Если мобильное устройство, добавляем дополнительный класс к контейнеру
    if (isMobile) {
        document.querySelector('.login-container').classList.add('mobile-device');
    }

    // Обработчик отправки формы
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем стандартную отправку формы
        
        // Получаем значения полей
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Простая валидация
        if (!email) {
            showError(emailInput, 'Пожалуйста, введите email или телефон');
            return;
        }
        
        if (!password) {
            showError(passwordInput, 'Пожалуйста, введите пароль');
            return;
        }
        
        // Здесь должна быть логика авторизации на сервере
        // Для демонстрации просто выводим данные в консоль
        console.log('Форма отправлена:', { email, password });
        
        // Имитация успешного входа
        showSuccess();
    });
    
    // Функция отображения ошибки
    function showError(input, message) {
        // Очищаем предыдущие ошибки
        clearErrors();
        
        // Добавляем класс ошибки к полю ввода
        input.classList.add('error');
        
        // Создаем элемент с сообщением об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Вставляем сообщение после поля ввода
        input.parentNode.appendChild(errorDiv);
        
        // Фокусируемся на поле с ошибкой
        input.focus();
    }
    
    // Функция очистки ошибок
    function clearErrors() {
        // Удаляем все сообщения об ошибках
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Удаляем класс ошибки у всех полей
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
    
    // Функция имитации успешного входа
    function showSuccess() {
        // Очищаем форму
        loginForm.innerHTML = '';
        
        // Создаем элемент с сообщением об успешном входе
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Вход выполнен успешно!';
        
        // Вставляем сообщение в форму
        loginForm.appendChild(successDiv);
    }
    
    // Адаптивные обработчики для мобильных устройств
    if (isMobile) {
        // Управление фокусом на полях ввода
        emailInput.addEventListener('focus', () => {
            document.querySelector('.login-box').classList.add('input-focused');
        });
        
        passwordInput.addEventListener('focus', () => {
            document.querySelector('.login-box').classList.add('input-focused');
        });
        
        emailInput.addEventListener('blur', () => {
            document.querySelector('.login-box').classList.remove('input-focused');
        });
        
        passwordInput.addEventListener('blur', () => {
            document.querySelector('.login-box').classList.remove('input-focused');
        });
    }
    
    // Добавляем обработчики для очистки ошибок при вводе
    emailInput.addEventListener('input', clearErrors);
    passwordInput.addEventListener('input', clearErrors);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Функция обработки изменения размера окна
    function handleResize() {
        // Адаптация для разных размеров экрана
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Адаптация для очень маленьких экранов
        if (viewportWidth < 360 || viewportHeight < 500) {
            document.querySelector('.login-box').classList.add('very-small-screen');
        } else {
            document.querySelector('.login-box').classList.remove('very-small-screen');
        }
    }
    
    // Вызываем обработчик при загрузке
    handleResize();
});

// Добавляем стили для ошибок и сообщений динамически
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ff3860 !important;
    }
    
    .error-message {
        color: #ff3860;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }
    
    .success-message {
        color: #fff;
        text-align: center;
        font-size: 1.5rem;
        padding: 2rem;
    }
    
    .input-focused {
        top: 40% !important;
    }
    
    .very-small-screen {
        padding: 1rem !important;
    }
    
    .very-small-screen h1 {
        font-size: 1.3rem !important;
        margin-bottom: 1rem !important;
    }
    
    .mobile-device .login-box {
        transition: top 0.3s ease;
    }
`;
document.head.appendChild(style); 