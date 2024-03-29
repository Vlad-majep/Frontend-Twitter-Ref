const handleTweetCode = () => {
    fetch("https://playuniverse.xyz/api/me", {
        method: "GET",
        credentials: "include",
        headers: {
            origin: "https://playuniverse.xyz",
            'Content-Type': 'application/json',
          },
    })
        .then(response => response.json())
        .then(data => {

            const referralCode = data.data.referralCode || "Not available";

            const tweet = `My referral code - ${referralCode}.%0A%0Alink`;

            window.open(`https://twitter.com/intent/tweet?text=${tweet}`,`_blank`);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
