const clues = {
    0: [
        "9-9",
        "4-4",
        "8-8",
        "1-1"
    ],
    1: [
        "Сколько лет исполнилось факультету? (первая цифра)",
        "1",
        "8-7",
        "4-3"
    ],
    2: [
        "1+1",
        "2-0",
        "3-1",
        "4-2"
    ],
    3: [
        "0+3",
        "1+2",
        "2+1",
        "3+0"
    ],
    4: [
        "Первая цифра аудитории деканата ИСиТ",
        "1+3",
        "2+2",
        "3+1"
    ],
    5: [
        "Последняя цифра года основания факультета ИСиТ",
        "1+4",
        "2+3",
        "3+2"
    ],
    6: [
        "7-1",
        "9-3",
        "8-2",
        "2+4"
    ],
    7: [
        "Последняя цифра года, когда ИСиТ впервые взял Кубок Ректора",
        "6+1",
        "2+5",
        "9-2"
    ],
    8: [
        "6+2",
        "9-1",
        "1+7",
        "7+1"
    ],
    9: [
        "Сколько лет исполнилось факультету? (вторая цифра)",
        "5+4",
        "6+3",
        "1+8"
    ],
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
        let randomNumber = Math.floor(Math.random() * 4);
        document.getElementById(`clue-${i + 1}`).innerText = `Подсказка для цифры ${count}: ${clues[password[i]][randomNumber]}`;
        count++;
    }
}

function checkPassword() {
    const inputPassword = document.getElementById('pin1').value +
                          document.getElementById('pin2').value +
                          document.getElementById('pin3').value +
                          document.getElementById('pin4').value;

    let resultElement = document.getElementById('result');
    let owerflowElement = document.getElementById('owerflow');

    if (inputPassword === currentPassword) {
        resultElement.innerText = 'Молодец, пароль верен!';
        resultElement.className = 'correct';
        currentPassword = generatePassword();
        displayClues(currentPassword);
        document.getElementById('pin1').value = '';
        document.getElementById('pin2').value = '';
        document.getElementById('pin3').value = '';
        document.getElementById('pin4').value = '';
    } else {
        resultElement.innerText = 'Пароль не верен, попробуйте еще раз';
        resultElement.className = '';
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
