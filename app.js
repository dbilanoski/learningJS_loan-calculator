// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e){
	
  // Hide results & show loader
  document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "block";
    
    // Init calculateResults function
    setTimeout(calculateResults, 2000);
    
    e.preventDefault();
  });
  
  // Describe Calculate Results
  function calculateResults(e){
  
  // UI Elements
  const amount = document.getElementById("amount");
  const interestRate = document.getElementById("interest");
  const time = document.getElementById("years");
  const amortisation = document.getElementById("amortisation");
  
  const monthlyDebt = document.getElementById("monthly-payment");
  const totalDebt = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  
  // Calc Elements

  /*
    - To round x variable in amortisation===false scerario, Math.round(number * 100) / 100 workaround is used to properly round number to 2 digits (Math.round rounds to closest integer in one decimal digit by default)
  */
  const principal = parseFloat(amount.value);
  const interest = parseFloat(interestRate.value) / 100 / 12;
  const periods = time.value * 12;
  
  const x = Math.pow(1 + interest, periods);
  const monthlySimple = (principal * Math.round(x * 100)/100) / periods;
  const monthlyAmortized = (principal * x * interest) / (x - 1);
    
  
  // Calculation
  if(isFinite(monthlySimple) || isFinite(monthlyAmortized)) {
    
    if(amortisation.checked === false) {
      totalInterest.innerHTML = ((monthlySimple * periods) - principal).toFixed(2);
      totalDebt.innerHTML = (principal * (Math.round(x * 100) / 100)).toFixed(2);
      monthlyDebt.textContent = monthlySimple.toFixed(2);
    } else {
        monthlyDebt.textContent = monthlyAmortized.toFixed(2);
        totalDebt.textContent = (monthlyAmortized * periods).toFixed(2);
        totalInterest.innerHTML = ((monthlyAmortized * periods) - principal).toFixed(2);
  }
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
      showError("Please check your numbers");
    }
  }
  
    
  // Describe Show Error
  function showError(error){
    // Hide results & loading animation
    document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "none";
  
    // Get UI elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    
    // Create DIV
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger alert-dismissible";
    
    // Insert error text
    errorDiv.appendChild(document.createTextNode(error));
    
    // Create & append delete button
    const closeLink = document.createElement("button");
    closeLink.className = "close";
    closeLink.setAttribute("data-dismiss", "alert");
    const textNode = document.createTextNode("X");
    closeLink.appendChild(textNode);
    
    errorDiv.appendChild(closeLink);
    
    // Inster Error Message above heading
    card.insertBefore(errorDiv, heading);
    
    // Clear Error Message after 4 seconds
    setTimeout(clearError, 4000);
  }
  
  // Define Clear Error
  function clearError(){
    if(document.querySelector(".alert")){
      document.querySelector(".alert").remove();
    }
  }