console.log("accessed");
document.addEventListener("DOMContentLoaded", function() {
    // Define the initial conversion to be performed
    const fromCurrency = "PLN";
    const toCurrency = "GBP";
    let amount = 100;
  
    // Call the convertCurrency() function to perform the initial conversion
    convertCurrency(fromCurrency, toCurrency, amount);
  
    // Add an event listener to the input field to update the conversion on change
    const amountInput = document.getElementById("amount");
    amountInput.addEventListener("input", function() {
      amount = amountInput.value;
      convertCurrency(fromCurrency, toCurrency, amount);
    });
  
    // Add an event listener to the select fields to update the conversion on change
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");
    fromCurrencySelect.addEventListener("change", function() {
      fromCurrency = fromCurrencySelect.value;
      convertCurrency(fromCurrency, toCurrency, amount);
    });
    toCurrencySelect.addEventListener("change", function() {
      toCurrency = toCurrencySelect.value;
      convertCurrency(fromCurrency, toCurrency, amount);
    });
  });
  
  function convertCurrency(fromCurrency, toCurrency, amount) {
    const apiUrl = `http://api.nbp.pl/api/exchangerates/rates/a/${toCurrency}/?format=json`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const exchangeRate = data.rates[0].mid;
        let resultAmount;
        if (fromCurrency === "PLN") {
          resultAmount = amount / exchangeRate;
          const result = `${amount} PLN is ${resultAmount.toFixed(2)} ${toCurrency} at the current exchange rate of ${exchangeRate}.`;
          displayResult(result);
        } else if (toCurrency === "PLN") {
          resultAmount = amount * exchangeRate;
          const result = `${amount} ${fromCurrency} is ${resultAmount.toFixed(2)} PLN at the current exchange rate of ${exchangeRate}.`;
          displayResult(result);
        } else {
          const plnAmount = amount / exchangeRate;
          const resultAmount = plnAmount * exchangeRate;
          const result = `${amount} ${fromCurrency} is ${resultAmount.toFixed(2)} ${toCurrency} at the current exchange rate of ${exchangeRate}.`;
          displayResult(result);
        }
      })
      .catch(error => console.error(error));
  }
  
  function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = result;
  }