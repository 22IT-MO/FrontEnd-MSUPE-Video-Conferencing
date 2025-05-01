// Создаем Vue-приложение
const { createApp, ref, onMounted, onUnmounted, computed } = Vue;

const app = createApp({
    setup() {
        // Данные для формы
        const email = ref('');
        const password = ref('');
        const errors = ref({});
        const isFocused = ref(false);
        const isSmallScreen = ref(false);
        const loginSuccess = ref(false);
        
        // Проверка на мобильное устройство
        const isMobile = ref(
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
        
        // Метод для установки фокуса
        const setFocus = (value) => {
            if (isMobile.value) {
                isFocused.value = value;
            }
        };
        
        // Функция валидации формы
        const validateForm = () => {
            const newErrors = {};
            
            if (!email.value.trim()) {
                newErrors.email = 'Пожалуйста, введите email или телефон';
            }
            
            if (!password.value.trim()) {
                newErrors.password = 'Пожалуйста, введите пароль';
            }
            
            errors.value = newErrors;
            return Object.keys(newErrors).length === 0;
        };
        
        // Обработчик отправки формы
        const handleSubmit = () => {
            if (validateForm()) {
                // Здесь должен быть запрос к серверу для аутентификации
                console.log('Форма отправлена:', { email: email.value, password: password.value });
                
                // Имитация успешного входа
                loginSuccess.value = true;
                email.value = '';
                password.value = '';
            }
        };
        
        // Функция для проверки размера экрана
        const checkScreenSize = () => {
            isSmallScreen.value = window.innerWidth < 360 || window.innerHeight < 500;
        };
        
        // Хуки жизненного цикла
        onMounted(() => {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        });
        
        onUnmounted(() => {
            window.removeEventListener('resize', checkScreenSize);
        });
        
        // Возвращаем данные и методы, доступные в шаблоне
        return {
            email,
            password,
            errors,
            isFocused,
            isSmallScreen,
            isMobile,
            loginSuccess,
            handleSubmit,
            setFocus
        };
    }
});

// Монтируем приложение к DOM-элементу с id "app"
app.mount('#app');

// Добавляем обработчик для выпадающего меню
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('languageDropdown');
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
    
    // Открытие/закрытие выпадающего меню
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Выбор языка
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех элементов
            dropdownItems.forEach(el => el.classList.remove('active'));
            
            // Добавляем активный класс к выбранному элементу
            this.classList.add('active');
            
            // Закрываем меню
            dropdown.classList.remove('active');
            
            // Получаем выбранный язык
            const lang = this.getAttribute('data-lang');
            
            // Обновляем текст кнопки
            dropdownToggle.textContent = this.textContent;
            
            // Сохраняем выбранный язык
            localStorage.setItem('selectedLanguage', lang);
        });
    });
    
    // Устанавливаем язык из localStorage при загрузке страницы
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        const langItem = Array.from(dropdownItems).find(item => item.getAttribute('data-lang') === savedLang);
        if (langItem) {
            // Убираем активный класс у всех элементов
            dropdownItems.forEach(el => el.classList.remove('active'));
            
            // Добавляем активный класс к сохраненному языку
            langItem.classList.add('active');
            
            // Обновляем текст кнопки
            dropdownToggle.textContent = langItem.textContent;
        }
    }
}); 