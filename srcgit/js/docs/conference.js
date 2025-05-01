document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные текущего пользователя из localStorage
    const savedName = localStorage.getItem('userName');
    const savedAvatar = localStorage.getItem('avatar');

    // Находим первую карточку участника (это текущий пользователь)
    const firstParticipant = document.querySelector('.participant-card');
    if (firstParticipant) {
        const nameElement = firstParticipant.querySelector('.participant-name');
        const initialsElement = firstParticipant.querySelector('.participant-initials');
        const avatarImg = firstParticipant.querySelector('.participant-img');

        // Устанавливаем имя пользователя
        if (savedName && savedName !== 'Имя Фамилия') {
            nameElement.textContent = savedName;
            
            // Обновляем инициалы
            const names = savedName.split(' ');
            if (names.length >= 2) {
                initialsElement.textContent = (names[0][0] + names[1][0]).toUpperCase();
            } else if (names.length === 1 && names[0]) {
                initialsElement.textContent = names[0][0].toUpperCase();
            }
        }

        // Устанавливаем аватар пользователя
        if (savedAvatar) {
            avatarImg.src = savedAvatar;
            avatarImg.style.display = 'block';
            initialsElement.style.display = 'none';
        }
    }

    // Обработчики для кнопок управления
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('mic-btn') || 
                this.classList.contains('cam-btn') ||
                this.classList.contains('raise-hand-btn') ||
                this.classList.contains('mute-btn') ||
                this.classList.contains('video-btn')) {
                
                this.classList.toggle('muted');
                const icon = this.querySelector('i');
                
                if (this.classList.contains('muted')) {
                    if (icon.classList.contains('fa-microphone')) {
                        icon.classList.replace('fa-microphone', 'fa-microphone-slash');
                    } else if (icon.classList.contains('fa-video')) {
                        icon.classList.replace('fa-video', 'fa-video-slash');
                    } else if (icon.classList.contains('fa-hand')) {
                        icon.classList.replace('fa-hand', 'fa-hand-paper');
                    }
                } else {
                    if (icon.classList.contains('fa-microphone-slash')) {
                        icon.classList.replace('fa-microphone-slash', 'fa-microphone');
                    } else if (icon.classList.contains('fa-video-slash')) {
                        icon.classList.replace('fa-video-slash', 'fa-video');
                    } else if (icon.classList.contains('fa-hand-paper')) {
                        icon.classList.replace('fa-hand-paper', 'fa-hand');
                    }
                }
            }
        });
    });

    // Добавляем случайных участников для демонстрации
    addRandomParticipants(3);

    // Обработчик для кнопки демонстрации экрана
    const shareScreenBtn = document.querySelector('.share-screen-btn');
    shareScreenBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        alert('Демонстрация экрана ' + (this.classList.contains('active') ? 'включена' : 'выключена'));
    });

    // Обработчик для кнопки участников
    const participantsBtn = document.querySelector('.participants-btn');
    participantsBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        alert('Список участников: ' + document.querySelectorAll('.participant-card').length);
    });
});

// Функция для добавления случайных участников
function addRandomParticipants(count) {
    const names = ['Анна Иванова', 'Петр Сидоров', 'Ольга Смирнова', 'Иван Петров', 'Мария Козлова'];
    const grid = document.querySelector('.participants-grid');
    const template = document.querySelector('.participant-card').cloneNode(true);
    
    for (let i = 0; i < count; i++) {
        const newParticipant = template.cloneNode(true);
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        const nameElement = newParticipant.querySelector('.participant-name');
        const initialsElement = newParticipant.querySelector('.participant-initials');
        
        nameElement.textContent = randomName;
        
        // Устанавливаем инициалы
        const nameParts = randomName.split(' ');
        initialsElement.textContent = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        
        grid.appendChild(newParticipant);
    }
} 