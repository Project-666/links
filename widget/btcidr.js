async function fetchData() {
    try {
        const response = await fetch("https://indodax.com/api/ticker/btcidr");
        const data = await response.json();
        const ticker = data.ticker;
        const btc = document.getElementById("btc");
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        });
        const serverTime = new Date(ticker.server_time * 1000);
        const formattedTime = serverTime.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });

        btc.textContent = formatter.format(ticker.last);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
setInterval(fetchData, 1000);