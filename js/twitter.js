const handleTweet = () => {
    const tweet = "I just filled out a form for a potential WL in game project @Un1verseNFT.%0A%0AJoin me for a chance to be an OG - https://universe-weld.vercel.app/index.html!%0A%0ADon't forget to interact with the post 👇";
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, `_blank`);
}

// twitter.js

// login.js
document.addEventListener("DOMContentLoaded", function () {
    // Обработчик события для кнопки логина
    document.getElementById("loginButton").addEventListener("click", function () {
        // Отправка запроса fetch на ваш бекенд
        fetch("http://localhost:3001/api/gettwiterlink", {
            method: "GET",
            credentials: "include", // Добавляем credentials: "include" для передачи куки
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Если запрос успешен, перенаправляем пользователя на страницу авторизации Twitter
            if (data.data && data.data.auth_url) {
                localStorage.setItem('oauthToken', data.data.oauthToken);
                localStorage.setItem('oauthSecret', data.data.oauthSecret);
                // Добавляем вывод в консоль для проверки
                console.log('oauthToken saved:', data.data.oauthToken);
                console.log('oauthSecret saved:', data.data.oauthSecret);
                window.location.href = data.data.auth_url;
            } else {
                // Обработка ошибки при необходимости
                console.error("Ошибка аутентификации в Twitter");
            }
        })
        .catch(error => {
            // Обработка ошибки при необходимости
            console.error('Error:', error);
        });
    });
});

// twitter.js
document.addEventListener("DOMContentLoaded", function () {
    // Обработчик события для кнопки confirm
    const confirmButton = document.getElementById("confirmButton");
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
        // Получаем введенный реферальный код
        const codeInput = Array.from(document.querySelectorAll('.code input')).map(input => input.value).join('');

        // Отправка запроса fetch на добавление реферального кода
        fetch("http://localhost:3001/api/addreferralcode", {
            method: "POST",
            credentials: "include", // Добавляем credentials: "include" для передачи куки
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                referralCode: codeInput,
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // Обработка успешного добавления реферального кода
            if (response.message === 'Referral code added successfully.') {
                alert('Referral code added successfully.');
                window.location.href = "http://localhost:5500/missions.html";
                // Дополнительные действия при успешном добавлении кода, если необходимо
            } else {
                // Обработка ошибки при необходимости
                alert('Error adding referral code: ' + response.message);
            }
        })
        .catch(error => {
            // Обработка ошибки при необходимости
            console.error('Error:', error);
        });
    })};
});
