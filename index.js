// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
  // Define the initial conversion to be performed
  let fromCurrency = "GBP";
  let amount = 20;

  // Call the convertCurrency() function to perform the initial conversion
  convertCurrency(fromCurrency, 0, amount);

  // Attach event listeners to the input fields to update the conversion result live
  let fromAmountField = document.getElementById("from-amount");
  let fromCurrencyField = document.getElementById("from-currency");
  let toAmountField = document.getElementById("to-amount");
  
  // Update the result when the user changes the 'from' amount
  fromAmountField.addEventListener("input", function() {
    amount = fromAmountField.value;
    convertCurrency(fromCurrency, 0, amount);
  });

  // Update the result when the user changes the 'from' currency
  fromCurrencyField.addEventListener("change", function() {
    fromCurrency = fromCurrencyField.value;
    convertCurrency(fromCurrency, 0, amount);
  });

  // Update the 'from' amount when the user changes the 'to' amount
  toAmountField.addEventListener("change", function() {
    amount = toAmountField.value;
    convertCurrency(fromCurrency, 1, amount);
  })
});

// Fetch the exchange rate and update the result
function convertCurrency(fromCurrency, reverse, amount) {
  // Set the flag icon based on the 'from' currency
  let flag = document.getElementById("flag"); 
  if(fromCurrency == "GBP") {
    flag.innerHTML = `<i class="flag flag-united-kingdom"></i>`;
  } else if (fromCurrency == "USD") {
    flag.innerHTML = `<i class="flag flag-us"></i>`;
  } else {
    flag.innerHTML = `<i class="flag flag-eu"></i>`;
  }

  // Get the element that displays the result
  const resultElement = document.getElementById("result");

  // Fetch the exchange rate from the API using the provided URL
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${fromCurrency}/?format=json&callback=callback`)
    .then(response => response.json())
    .then(data => {
      // Extract the exchange rate from the API response
      let exchangeRate = data.rates[0].mid;

      // Display the exchange rate in the result element
      let result = `1 ${fromCurrency} = <b>${exchangeRate.toFixed(2)} PLN</b>`;
      resultElement.innerHTML = result;

      // Convert the amount based on the whether it is 'to' or 'from'
      if(reverse) {
        let resultAmount = amount / exchangeRate;
        displayFrom(resultAmount);
      } else {
        let resultAmount = amount * exchangeRate;
        displayTo(resultAmount);
      }
    })
    .catch(error => {
      // Display an error message if the API request fails
      console.error(error);
      let result = "An error occurred while fetching the exchange rate. Please try again later.";
      resultElement.innerHTML = result;
    });
}

// Update the 'to' amount in the UI
function displayTo(resultAmount) {
  const toAmount = document.getElementById("to-amount");
  toAmount.value = resultAmount.toFixed(2);
}

// Update the 'from' amount in the UI
function displayFrom(resultAmount) {
  const fromAmount = document.getElementById("from-amount");
  fromAmount.value = resultAmount.toFixed(2);
}
