const handleTweetCode = () => {
    // Fetch data from the backend
    fetch("http://localhost:3001/api/me", {
        method: "GET",
        credentials: "include", // Include credentials for cookie
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            // Get the referral code from the fetched data
            const referralCode = data.data.referralCode || "Not available";

            // Create the tweet text with the referral code
            const tweet = `My referral code - ${referralCode}.%0A%0Alink`;

            // Open the Twitter intent window with the tweet text
            window.open(`https://twitter.com/intent/tweet?text=${tweet}`,`_blank`);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
