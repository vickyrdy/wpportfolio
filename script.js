// script.js

function convertCurrency() {
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const destinationCurrency = document.getElementById('destinationCurrency').value;
    const sourceAmount = parseFloat(document.getElementById('sourceAmount').value);

    // Check if sourceAmount is a valid positive number
    if (isNaN(sourceAmount) || sourceAmount <= 0) {
        document.getElementById('errorMessage').textContent = 'Please enter a valid positive amount.';
        document.getElementById('sourceAmount').classList.add("error");
        return;
    }

    // You can change the default currencies as per your choice
    const apiURL = `https://www.floatrates.com/daily/${sourceCurrency}.json`;
    if((sourceCurrency === destinationCurrency) || sourceAmount <= 0) {
        if(sourceAmount <=0) {
        document.getElementById('errorMessage').textContent = 'Enter a non zero / non negative amount';
        }
        else {
            document.getElementById('sourceCurrency').classList.add("error");
            document.getElementById('destinationCurrency').classList.add("error");
        document.getElementById('errorMessage').textContent = 'Both source and destination currency are same. Kindly change one';
        }
    }
    else {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data[destinationCurrency.toLowerCase()].rate;
            const calculationTimestamp = new Date().toLocaleString('en-GB', { timeZone: 'GMT' });
            const destinationAmount = (sourceAmount * exchangeRate).toFixed(2);
            document.getElementById('exchangeRate').textContent = `1 ${sourceCurrency} = ${exchangeRate} ${destinationCurrency}`;
            document.getElementById('calculationTimestamp').textContent = calculationTimestamp;
            document.getElementById('destinationAmount').textContent = `${sourceAmount} ${sourceCurrency} = ${destinationAmount} ${destinationCurrency}`;
            document.getElementById('errorMessage').textContent = ''; // Clear any previous error messages
            document.getElementById('sourceCurrency').classList.remove("error");
            document.getElementById('destinationCurrency').classList.remove("error");
            document.getElementById('sourceAmount').classList.remove("error");
    })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            document.getElementById('errorMessage').textContent = 'Error fetching exchange rate. Please try again later.';
        });
    }
}

document.getElementById('currency').addEventListener('click',()=>{
    document.getElementById('currency-container').style.display="block";
    document.getElementById('fuel-container').style.display="none";
})

document.getElementById('fuel').addEventListener('click',()=>{
    document.getElementById('currency-container').style.display="none";
    document.getElementById('fuel-container').style.display="block";
})