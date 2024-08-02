async function fetchOHLC() {
    const from = Math.floor(Date.now() / 1000) - 24 * 60 * 60; // 24 hours ago
    const to = Math.floor(Date.now() / 1000); // now
    const symbol = "btcidr";
    const tf = "1"; // 1 hour time frame

    const url = `https://indodax.com/tradingview/history_v2?from=${from}&symbol=${symbol}&tf=${tf}&to=${to}`;

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.length) return;

        // Get current price (last close price)
        const currentPrice = parseFloat(data[data.length - 1].Close);

        // Get the previous close price (24 hours ago)
        const previousPrice = parseFloat(data[0].Close);

        document.getElementById("btc").innerText =
            formatter.format(currentPrice);

        const changePercent =
            ((currentPrice - previousPrice) / previousPrice) * 100;
        const priceChangeElement = document.getElementById("price-change");

        if (changePercent >= 0) {
            priceChangeElement.innerText = `+${changePercent.toFixed(2)}%`;
            priceChangeElement.classList.remove("negative");
            priceChangeElement.classList.add("positive");
        } else {
            priceChangeElement.innerText = `${changePercent.toFixed(2)}%`;
            priceChangeElement.classList.remove("positive");
            priceChangeElement.classList.add("negative");
        }
    } catch (error) {
        console.error("Error fetching OHLC data:", error);
    }
}

fetchOHLC();
setInterval(fetchOHLC, 1000); // Fetch OHLC data every 1 second
