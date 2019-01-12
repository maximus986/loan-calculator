(function IIFE() {


    document.getElementById("loan-form").addEventListener("submit", calculateLoan);

    function calculateLoan(e) {
        const amount = document.getElementById("amount");
        const interest = document.getElementById("interest");
        const years = document.getElementById("years");
        const monthlyPayment = document.getElementById("monthly-payment");
        const totalPayment = document.getElementById("total-payment");
        const totalInterest = document.getElementById("total-interest");

        const principal = parseFloat(amount.value);
        const calculatedPayments = parseFloat(years.value * 12);
        const calculatedInterest = parseFloat((interest.value / 100) / 12);
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        } else {
            showError("Please checkout your numbers.");
            if (monthlyPayment.value.length != 0) {
                monthlyPayment.value = "";
                totalPayment.value = "";
                totalInterest.value = "";
            }
        }

        setTimeout(() => {
            amount.value = "";
            interest.value = "";
            years.value = "";
        }, 5000);

        e.preventDefault();
    }


    function showError(error) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger";
        errorDiv.append(document.createTextNode(error));
        const card = document.querySelector(".card");
        const heading = document.querySelector(".heading");
        card.insertBefore(errorDiv, heading);

        setTimeout(clearError, 3000);
    }

    function clearError() {
        document.querySelector(".alert").remove();
    }
})();









