document.addEventListener("DOMContentLoaded", function() {
  // Define the initial conversion to be performed
  let fromCurrency = "GBP";
  let toCurrency = "PLN";
  let amount = 20;

  // Call the convertCurrency() function to perform the initial conversion
  convertCurrency(fromCurrency, toCurrency, amount);

  // Attach event listeners to the input fields to update the conversion result live
  let amountField = document.getElementById("amount");
  let fromCurrencyField = document.getElementById("from-currency");

  amountField.addEventListener("input", function() {
    amount = amountField.value;
    convertCurrency(fromCurrency, toCurrency, amount);
  });

  fromCurrencyField.addEventListener("change", function() {
    fromCurrency = fromCurrencyField.value;
    convertCurrency(fromCurrency, toCurrency, amount);
  });
});

  

function convertCurrency(fromCurrency, toCurrency, amount) {
  // Fetch the exchange rate from the API using the provided URL
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${fromCurrency}/?format=json&callback=callback`)
    .then(response => response.json())
    .then(data => {
      let exchangeRate = data.rates[0].mid;
      let resultAmount = amount * exchangeRate;
      let result = `${amount} ${fromCurrency} = ${resultAmount.toFixed(2)} ${toCurrency}`;
      displayResult(result);
    })
    .catch(error => {
      console.error(error);
      let result = "An error occurred while fetching the exchange rate. Please try again later.";
      displayResult(result);
    });
}

function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = result;
}
