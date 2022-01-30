const { fetchPrices } = require('../src/service/chainlink');
let counter = 1

const fetchPricesInIntervals = async () => {
    if(counter % 12 === 0){
        console.clear();
    }
    const { DISPLAY: responseData } = await fetchPrices();
    Object.keys(responseData).forEach(key => {
        console.info(`price of ${key} ::`, responseData[`${key}`].USD.PRICE);
    });
    console.log("============================================================");
    setTimeout(fetchPricesInIntervals, 5000);
}

console.log("Starting to Fetch the price every 5 seconds");
fetchPricesInIntervals()
