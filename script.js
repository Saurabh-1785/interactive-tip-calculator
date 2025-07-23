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

if (resetButton) {
  resetButton.addEventListener('click', () => {
    console.log('Reset button clicked!');
    resetCalculator();
  });
} else {
  console.error('Error: Reset button element not found. Cannot add event listener.');
}


//FUNCTION FOR CALCULATION LOGIC

function calculateTip() {
  console.log('--- Executing calculateTip:---');


  // --- 1. Retrieve Input Values (Strings) ---
  const billValueStr = billInput.value;
  const peopleValueStr = peopleInput.value;
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

  
  // --- 3. INPUT VALIDATION SECTION ---

  // Check if billAmount is a valid number AND is not negative.
  const isBillValid = !isNaN(billAmount) && billAmount >= 0;

  let isTipValid = false; // Placeholder

  const isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0 && Number.isInteger(numberOfPeople);

  const isCustomTipInputValid = customTipValueStr === '' || (!isNaN(customTipPercent) && customTipPercent >= 0);



  // --- 4. Determine Tip Percentage to Use ---
  let actualTipPercent = 0;

  if (customTipValueStr !== '' && !isNaN(customTipPercent) && customTipPercent >= 0) { // Prioritize valid custom input
    actualTipPercent = customTipPercent;
  } else if (customTipValueStr === '') { // If custom input is empty, check buttons
    const activeButton = document.querySelector('.tip-percent-btn.active');
    if (activeButton) {
      const selectedButtonTipPercent = parseFloat(activeButton.dataset.tip);
      if (!isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
        actualTipPercent = selectedButtonTipPercent;
      }
    }
  } 
  
  isTipValid = !isNaN(actualTipPercent) && actualTipPercent >= 0;
  console.log(`Validation - Actual Tip Percent (${actualTipPercent}) Is Valid: ${isTipValid}`);

  
  // --- 5. Calculate Total Tip ---
  let totalTipPercent = 0;

  if (!isNaN(billAmount) && billAmount >= 0) {
    totalTipAmount = billAmount * (actualTipPercent / 100);
  }
  
  // --- 6. Calculate Total Bill ---
  let totalBillAmount = 0;

  if (isBillValid) { 
    totalBillAmount = billAmount + totalTipAmount;
  }

  // --- 7. Calculate Per Person Amount (with Validation) ---
  let tipAmountPerPerson = 0;
  let totalAmountPerPerson = 0;


  if (isBillValid && isTipValid && isPeopleValid) {
    if (!isNaN(totalBillAmount)) { 
      tipAmountPerPerson = totalTipAmount / numberOfPeople;
      totalAmountPerPerson = totalBillAmount / numberOfPeople;
    }else {
      tipAmountPerPerson = 0;
      totalAmountPerPerson = 0;
      console.warn("Per-person calculation aborted: totalBillAmount was NaN despite other flags.");
    }
  } else {
      if (!isPeopleValid) {
        console.warn(`Cannot calculate per-person amounts. Number of People (${numberOfPeople}) is not a positive integer.`);

      } else if (!isBillValid) {
        console.warn("Cannot calculate per-person amounts due to invalid Bill Amount.");

      } else if (!isTipValid) {
        console.warn("Cannot calculate per-person amounts due to invalid Tip Percentage.");
      }
  }

  // --- 8. Format Results for Display ---
  const formattedTipAmount = tipAmountPerPerson.toFixed(2);
  const formattedTotalAmount = totalAmountPerPerson.toFixed(2);
  const displayTipAmount = `$${formattedTipAmount}`;
  const displayTotalAmount = `$${formattedTotalAmount}`;

  // --- 9. Update DOM Text Content ---
  if (tipAmountDisplay) { 
    tipAmountDisplay.textContent = displayTipAmount;
  }
  if (totalAmountDisplay) {
    totalAmountDisplay.textContent = displayTotalAmount;
  }

  if (billInput) {
    billInput.classList.toggle('error', !isBillValid);
  
  }

    if (peopleInput) {
      peopleInput.classList.toggle('error', !isPeopleValid);
      
    }

    if (customTipInput) {
    
    customTipInput.classList.toggle('error', !isCustomTipInputValid);
    }


}

function resetCalculator() {

  // 1. Set the value of the bill input to empty.
  if (billInput) {
    billInput.value = '';
  }

   // 2. Clear the custom tip input value.
  if (customTipInput) {
    customTipInput.value = '';
  }

  // 3. Deselect any active tip percentage buttons.

  if (tipButtons && tipButtons.length > 0) {
    tipButtons.forEach(button => {
      button.classList.remove('active');
    });
  }

  // 4. Set the value of the number of people input to empty.

  if (peopleInput) {
    peopleInput.value = '';
  }

  // 5. Reset the text content of the tip amount/person display to '$0.00'.
  if (tipAmountDisplay) {
    tipAmountDisplay.textContent = '$0.00';
  }

  // 6. Reset the text content of the total/person display to '$0.00'.
  if (totalAmountDisplay) {
    totalAmountDisplay.textContent = '$0.00';
  }

  // 7. Remove any validation error styling from input fields.

  if (billInput) {
    billInput.classList.remove('error');
  }
  if (customTipInput) {
    customTipInput.classList.remove('error');
  }
  if (peopleInput) {
    peopleInput.classList.remove('error');
  }




}


document.addEventListener('DOMContentLoaded', () =>{
  calculateTip()
});