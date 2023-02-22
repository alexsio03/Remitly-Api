document.addEventListener("DOMContentLoaded", function() {
  // Define the initial conversion to be performed
  let fromCurrency = "GBP";
  let amount = 20;

  // Call the convertCurrency() function to perform the initial conversion
  convertCurrency(fromCurrency, amount);

  // Attach event listeners to the input fields to update the conversion result live
  let amountField = document.getElementById("from-amount");
  let fromCurrencyField = document.getElementById("from-currency");
  let toCurrencyField = document.getElementById("to-amount");

  amountField.addEventListener("input", function() {
    amount = amountField.value;
    convertCurrency(fromCurrency, amount);
  });

  fromCurrencyField.addEventListener("change", function() {
    fromCurrency = fromCurrencyField.value;
    convertCurrency(fromCurrency, amount);
  });
});

  

function convertCurrency(fromCurrency, amount) {
  const resultElement = document.getElementById("result");
  // Fetch the exchange rate from the API using the provided URL
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${fromCurrency}/?format=json&callback=callback`)
    .then(response => response.json())
    .then(data => {
      let exchangeRate = data.rates[0].mid;
      let resultAmount = amount * exchangeRate;
      // let result = `${amount} ${fromCurrency} = <b>${resultAmount.toFixed(2)} ${toCurrency}</b>`;
      let result = `1 ${fromCurrency} = <b>${exchangeRate} PLN</b>`;
      resultElement.innerHTML = result;
      displayResult(resultAmount);
    })
    .catch(error => {
      console.error(error);
      let result = "An error occurred while fetching the exchange rate. Please try again later.";
      displayResult(result);
    });
}

function displayResult(resultAmount) {
  const resultElement = document.getElementById("to-amount");
  resultElement.value = resultAmount.toFixed(2);
}
