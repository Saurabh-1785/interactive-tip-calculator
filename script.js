const billInput = document.getElementById('bill');

const tipButtons = document.querySelectorAll('.tip-percent-btn');

const customTipInput = document.getElementById('custom-tip');

const peopleInput = document.getElementById('num-people');

const tipAmountDisplay = document.getElementById('tip-amount-display');

const totalAmountDisplay = document.getElementById('total-amount-display');

const resetButton = document.getElementById('reset-button');

//Event Listeners

billInput.addEventListener('input', calculateTip);

tipButtons.forEach((button) => {
  button.addEventListener('click', (event) =>{
    const clickedButton = event.target; // or = button
    const tipPercentage = clickedButton.dataset.tip;
    //dataset Property: This is a standard way to access custom data attributes (data-*) defined on an HTML element.
    // clickedButton.dataset.tip: This specifically looks for an attribute named data-tip on the clicked button element and retrieves its value as a string.
    //Requirement: For this to work reliably, you must add data-tip attributes to your tip percentage buttons in index.html
    
    tipButtons.forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    clickedButton.classList.add('active');
    // Clear the custom tip input when a button is clicked
    customTipInput.value = '';

    calculateTip();
  });
});

customTipInput.addEventListener('input', () => {
  tipButtons.forEach(btn => btn.classList.remove('active'));
  console.log(`Custom tip: ${customTipInput.value}%`);

  calculateTip();

});

peopleInput.addEventListener('input', calculateTip);


//FUNCTION FOR CALCULATION LOGIC

function calculateTip() {
  console.log('--- Executing calculateTip:---');


  // --- 1. Retrieve Input Values (Strings) ---
  const billValueStr = billInput.value;
  const peopleValueStr = customTipInput.value;
  const customTipValueStr = customTipInput.value;
  let selectedButtonTipStr = null;
  const activeButton = document.querySelector('.tip-percent-btn.active');
  if (activeButton) {
    selectedButtonTipStr = activeButton.dataset.tip;
  }

  // --- 2. Convert to Numbers ---
  const billAmount = parseFloat(billValueStr);
  const numberOfPeople = parseFloat(peopleValueStr); // Note: Will need validation later (e.g., ensure integer > 0)
  const customTipPercent = parseFloat(customTipValueStr);
  // Convert selected button tip only if a button is actually active (selectedButtonTipStr is not null)
  const selectedButtonTipPercent = selectedButtonTipStr ? parseFloat(selectedButtonTipStr) : null;

  // Check if billAmount is a valid number AND is not negative.
  const isBillValid = !isNaN(billAmount) && billAmount >= 0;
  let isTipValid = false; // Placeholder
  let isPeopleValid = false; // Placeholder



  // --- 3. Determine Tip Percentage to Use ---
  let actualTipPercent = 0;

  // Check if the custom tip input has a valid, non-negative number.
  // isNaN() checks if a value is "Not a Number". !isNaN() means it IS a number.
  if (!isNaN(customTipPercent) && customTipPercent >= 0) {
    // Priority 1: Use the valid custom tip percentage.
    actualTipPercent = customTipPercent;
    console.log("Using Custom Tip Percentage:", actualTipPercent);
  }
  // Otherwise (if custom tip is invalid or empty), check the selected button.
  // We check selectedButtonTipPercent is not null (a button was selected)
  // AND it's a valid number (!isNaN) AND it's non-negative.
  else if (selectedButtonTipPercent !== null && !isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
    // Priority 2: Use the valid selected button's tip percentage.
    actualTipPercent = selectedButtonTipPercent;
    console.log("Using Selected Button Tip Percentage:", actualTipPercent);
  }
  // Default: If neither custom nor button provided a valid percentage,
  // actualTipPercent remains at its initial value of 0.
  
  // --- 4. Calculate Total Tip ---
  let totalTipPercent = 0;

  if (!isNaN(billAmount) && billAmount >= 0) {
    totalTipAmount = billAmount * (actualTipPercent / 100);
  }
  
  // --- 5. Calculate Total Bill ---
  const totalBillAmount = billAmount + totalTipAmount;

  // --- 6. Calculate Tip Per Person (with Validation) ---
  let tipAmountPerPerson = 0;
  if (!isNaN(totalTipAmount) && !isNaN(numberOfPeople) && numberOfPeople > 0) {
    tipAmountPerPerson = totalTipAmount / numberOfPeople;
  } else {
    console.warn("Cannot calculate tip per person. Invalid inputs (Tip:", totalTipAmount, ", People:", numberOfPeople, ")");
  }
 
  // --- 7. Calculate Total Per Person (with Validation) ---
  let totalAmountPerPerson = 0;
  if (!isNaN(totalBillAmount) && !isNaN(numberOfPeople) && numberOfPeople > 0) {
    // If inputs are valid, perform the division.
    totalAmountPerPerson = totalBillAmount / numberOfPeople;
  } else {
    // If numberOfPeople is invalid (0, negative, NaN) or totalBillAmount is NaN,
    // keep totalAmountPerPerson at the default 0.
    console.warn("Cannot calculate total per person. Invalid inputs (Total Bill:", totalBillAmount, ", People:", numberOfPeople, ")");
  }

  // Use toFixed(2) to ensure two decimal places. This returns a STRING.
  const formattedTipAmount = tipAmountPerPerson.toFixed(2);
  const formattedTotalAmount = totalAmountPerPerson.toFixed(2);

  // Prepend the currency symbol (e.g., '$') to the formatted strings.
  const displayTipAmount = `$${formattedTipAmount}`;
  const displayTotalAmount = `$${formattedTotalAmount}`;

  if (tipAmountDisplay) { 
    tipAmountDisplay.textContent = displayTipAmount;
  }
  if (totalAmountDisplay) {
    totalAmountDisplay.textContent = displayTotalAmount;
  }

}


document.addEventListener('DOMContentLoaded', calculateTip);