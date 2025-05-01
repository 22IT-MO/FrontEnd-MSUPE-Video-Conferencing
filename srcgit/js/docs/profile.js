document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница профиля загружена');
    
    // Получаем элементы
    const avatar = document.getElementById('avatar');
    const avatarInput = document.getElementById('avatar-input');
    const initialsSpan = document.querySelector('.initials');
    const nameInput = document.querySelector('.name-input');

    // Функция для обновления инициалов
    function updateInitials(fullName) {
        const trimmedName = fullName.trim();
        if (trimmedName === '') {
            initialsSpan.textContent = 'ИФ';
            return;
        }

        const names = trimmedName.split(' ');
        if (names.length >= 2) {
            initialsSpan.textContent = (names[0][0] + names[1][0]).toUpperCase();
        } else if (names.length === 1 && names[0]) {
            initialsSpan.textContent = names[0][0].toUpperCase();
        } else {
            initialsSpan.textContent = 'ИФ';
        }
    }

    // Загружаем имя из localStorage
    const savedName = localStorage.getItem('userName');
    console.log('Загруженное имя из localStorage:', savedName);
    
    if (savedName && savedName.trim() !== '') {
        nameInput.value = savedName;
        updateInitials(savedName);
        console.log('Имя установлено:', nameInput.value);
    }

    // Загружаем аватар из localStorage
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
        avatar.src = savedAvatar;
        avatar.style.display = 'block';
        initialsSpan.style.display = 'none';
        console.log('Аватар загружен');
    }

    // Обработчик изменения имени
    nameInput.addEventListener('input', function() {
        const newName = this.value;
        console.log('Ввод имени:', newName);
        
        // Сохраняем в localStorage при каждом изменении
        localStorage.setItem('userName', newName);
        console.log('Имя сохранено в localStorage');
        
        // Обновляем инициалы
        updateInitials(newName);
    });

    // Дополнительно сохраняем при потере фокуса
    nameInput.addEventListener('blur', function() {
        const newName = this.value.trim();
        console.log('Потеря фокуса, имя:', newName);
        
        // Сохраняем в localStorage
        localStorage.setItem('userName', newName);
        console.log('Имя сохранено в localStorage (blur)');
    });

    // Обработчик загрузки аватара
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('Выбран файл:', file.name);
            
            const reader = new FileReader();
            reader.onload = function(event) {
                console.log('Файл прочитан');
                avatar.src = event.target.result;
                avatar.style.display = 'block';
                initialsSpan.style.display = 'none';
                
                // Сохраняем в localStorage
                localStorage.setItem('avatar', event.target.result);
                console.log('Аватар сохранен в localStorage');
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Обработчик удаления аватара
    avatar.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (confirm('Удалить аватар?')) {
            avatar.style.display = 'none';
            avatar.src = '';
            initialsSpan.style.display = 'block';
            localStorage.removeItem('avatar');
            console.log('Аватар удален');
        }
    });

    // Обновим имя и в localStorage и на странице при загрузке
    if (savedName) {
        nameInput.value = savedName;
        localStorage.setItem('userName', savedName);
        updateInitials(savedName);
        console.log('Имя обновлено при загрузке страницы');
    }

    // Кнопки управления
    const audioBtn = document.querySelector('.audio-btn');
    const videoBtn = document.querySelector('.video-btn');
    const settingsBtn = document.querySelector('.settings-btn');
    const connectBtn = document.querySelector('.connect-btn');

    // Обработчики для кнопок аудио и видео
    audioBtn.addEventListener('click', function() {
        this.classList.toggle('muted');
        const icon = this.querySelector('i');
        if (this.classList.contains('muted')) {
            icon.classList.remove('fa-microphone');
            icon.classList.add('fa-microphone-slash');
        } else {
            icon.classList.remove('fa-microphone-slash');
            icon.classList.add('fa-microphone');
        }
    });

    videoBtn.addEventListener('click', function() {
        this.classList.toggle('muted');
        const icon = this.querySelector('i');
        if (this.classList.contains('muted')) {
            icon.classList.remove('fa-video');
            icon.classList.add('fa-video-slash');
        } else {
            icon.classList.remove('fa-video-slash');
            icon.classList.add('fa-video');
        }
    });

    // Добавляем обработчик для кнопки подключения с эффектом загрузки
    connectBtn.addEventListener('click', function() {
        // Меняем текст кнопки
        const originalText = this.textContent;
        this.textContent = 'Подключение...';
        
        // Добавляем класс для анимации
        this.classList.add('loading');
        
        // Отключаем кнопку
        this.disabled = true;
        
        // Переходим на страницу конференции через небольшую задержку
        setTimeout(() => {
            window.location.href = 'conference.html';
        }, 1000);
    });
}); 