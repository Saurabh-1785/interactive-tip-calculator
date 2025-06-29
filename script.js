const billInput = document.getElementById('bill');

const tipButtons = document.querySelectorAll('.tip-percent-btn');

const customTipInput = document.getElementById('custom-tip');

const peopleInput = document.getElementById('num-people');

const tipAmountDisplay = document.getElementById('tip-amount-display');

const totalAmountDisplay = document.getElementById('total-amount-display');

const resetButton = document.getElementById('reset-button');

//Event Listeners

billInput.addEventListener('input', (event) => {
  const currentBillValue = billInput.value;// or event.target.value
  console.log('Bill Input changed, current value:', currentBillValue);
})

tipButtons.forEach((button) => {
  button.addEventListener('click', (event) =>{
    const clickedButton = event.target; // or = button
    const tipPercentage = clickedButton.dataset.tip;
    //dataset Property: This is a standard way to access custom data attributes (data-*) defined on an HTML element.
    // clickedButton.dataset.tip: This specifically looks for an attribute named data-tip on the clicked button element and retrieves its value as a string.
    //Requirement: For this to work reliably, you must add data-tip attributes to your tip percentage buttons in index.html
    
    console.log('Tip Button clicked:', clickedButton.textContent);

    if (tipPercentage){
      console.log('Selected Tip Percentage (from data-tip):', tipPercentage + '%');

    } else{
      console.warn('clicked button is missing data-tip')
    }
    
  })
})

customTipInput.addEventListener('input', (event) => {
  const customTipValue = event.target.value;
  console.log('Custom Tip Input changed, current value:', customTipValue);

})

peopleInput.addEventListener('input', (event) => {
  const numberOfPeopleValue = event.target.value;
  console.log('Number of People Input changed, current value:', numberOfPeopleValue);

})