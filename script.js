const clues = {
    0: "Последняя цифра года, когда не проводился Golden Like?",
    1: "Сколько лет исполнилось факультету? (первая цифра)",
    2: "Последняя цифра самого популярного направления на ИСиТе?",
    3: "Сколько нужно букв, чтобы составить слово ИСиТ?",
    4: "Первая цифра аудитории деканата ИСиТ",
    5: "Последняя цифра года основания факультета ИСиТ",
    6: "Сколько профилей на ИСиТе?",
    7: "Последняя цифра года, когда ИСиТ впервые взял Кубок Ректора",
    8: "Сколько мероприятий в год проводит ИСиТ?",
    9: "Сколько лет исполнилось факультету? (вторая цифра)",
};

let previousPasswords = [];
let currentPassword;

function generatePassword() {
    let password = '';
    let cluesUsed = [];

    while (cluesUsed.length < 4) {
        let randomNumber = Math.floor(Math.random() * 10);

        if (!cluesUsed.includes(randomNumber)) {
            password += randomNumber;
            cluesUsed.push(randomNumber);
        }
    }

    if (previousPasswords.includes(password)) {
        return generatePassword();
    }

    previousPasswords.push(password);
    return password;
}

function displayClues(password) {
    let count = 1;
    for (let i = 0; i < password.length; i++) {
        document.getElementById(`clue-${i + 1}`).innerText = `Подсказка для цифры ${count}: ${clues[password[i]]}`;
        count++;
    }
}

function checkPassword() {
    const inputs = [
        document.getElementById('pin1'),
        document.getElementById('pin2'),
        document.getElementById('pin3'),
        document.getElementById('pin4')
    ];
    const inputPassword = inputs.map(input => input.value).join('');

    let resultElement = document.getElementById('result');
    let owerflowElement = document.getElementById('owerflow');

    if (inputPassword === currentPassword) {
        resultElement.innerText = 'Молодец, пароль верен!';
        resultElement.className = 'correct';
        inputs.forEach(input => input.style.backgroundColor = ''); // Сброс цвета фона
        currentPassword = generatePassword();
        displayClues(currentPassword);
        inputs.forEach(input => input.value = ''); // Сброс значений
    } else {
        resultElement.innerText = 'Пароль не верен, попробуйте еще раз';
        resultElement.className = '';

        // Установка фона инпута в красный, если цифра неправильная
        inputs.forEach((input, index) => {
            if (input.value !== currentPassword[index]) {
                input.style.backgroundColor = '#ff6161';
            } else {
                input.style.backgroundColor = ''; // Сброс цвета фона, если цифра правильная
            }
        });
    }

    owerflowElement.className = 'active';

    setTimeout(function() {
        owerflowElement.className = '';
    }, 2000);
}




currentPassword = generatePassword();
displayClues(currentPassword);

document.getElementById('check-button').addEventListener('click', checkPassword);

// Добавляем проверку ввода для каждого инпута
document.getElementById('pin1').addEventListener('input', function (e) {
    if (isNaN(e.data)) {
        e.target.value = '';
    } else {
        this.nextElementSibling.focus();
    }
});

document.getElementById('pin2').addEventListener('input', function (e) {
    if (isNaN(e.data)) {
        e.target.value = '';
    } else {
        this.nextElementSibling.focus();
    }
});

document.getElementById('pin3').addEventListener('input', function (e) {
    if (isNaN(e.data)) {
        e.target.value = '';
    } else {
        this.nextElementSibling.focus();
    }
});

document.getElementById('pin4').addEventListener('input', function (e) {
    if (isNaN(e.data)) {
        e.target.value = '';
    }
});
