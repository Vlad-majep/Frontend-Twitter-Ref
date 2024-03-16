const handleTweet = () => {
    const tweet = "I just filled out a form for a potential WL in game project @Un1verseNFT.%0A%0AJoin me for a chance to be an OG - https://universe-weld.vercel.app/index.html!%0A%0ADon't forget to interact with the post 👇";
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, `_blank`);
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("loginButton").addEventListener("click", function () {
        
        fetch("https://playuniverse.xyz/api/gettwiterlink", {
            method: "GET",
            headers: {
                origin: "https://playuniverse.xyz",
                'Content-Type': 'application/json',
              },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.data && data.data.auth_url) {
                localStorage.setItem('oauthToken', data.data.oauthToken);
                localStorage.setItem('oauthSecret', data.data.oauthSecret);

                window.location.href = data.data.auth_url;
            } else {
                console.error("Ошибка аутентификации в Twitter");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

// twitter.js
document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = document.getElementById("confirmButton");
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
        const codeInput = Array.from(document.querySelectorAll('.code input')).map(input => input.value).join('');

        fetch("https://playuniverse.xyz/api/addreferralcode", {
            method: "POST",
            credentials: "include",
            headers: {
                origin: "https://playuniverse.xyz",
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                referralCode: codeInput,
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            if (response.message === 'Referral code added successfully.') {
                alert('Referral code added successfully.');
                window.location.href = "https://playuniverse.xyz/missions.html";
            } else {
                alert('Error adding referral code: ' + response.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })};
});
