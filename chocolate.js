const chocolates = [
    { name: "Milk Chocolate", price: 20.00, quantity: 0 },
    { name: "Dark Chocolate", price: 35.00, quantity: 0 },
    { name: "White Chocolate", price: 25.00, quantity: 0 }
    // Add more chocolates as needed
];

const chocolateList = document.getElementById("chocolateList");
const totalSelectedSpan = document.getElementById("totalSelected");
const totalPriceSpan = document.getElementById("totalPrice");
const addToCartButton = document.getElementById("addToCart");

function updateUI() {
    chocolateList.innerHTML = "";
    chocolates.forEach((chocolate, index) => {
        const chocolateContainer = document.createElement("div");
        chocolateContainer.className = "chocolate-container";

        const checkboxLabel = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "chocolate-checkbox";
        checkbox.value = index.toString();
        checkbox.setAttribute("data-price", chocolate.price.toFixed(2));
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(document.createTextNode(chocolate.name));
        chocolateContainer.appendChild(checkboxLabel);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.className = "quantity-input";
        quantityInput.min = "0";
        quantityInput.max = "8";
        quantityInput.value = chocolate.quantity.toString();
        chocolateContainer.appendChild(quantityInput);

        chocolateList.appendChild(chocolateContainer);

        checkbox.addEventListener("change", function() {
            chocolates[index].quantity = parseInt(quantityInput.value);
            updateTotalSelectedAndPrice();
        });

        quantityInput.addEventListener("input", function() {
            chocolates[index].quantity = parseInt(this.value);
            updateTotalSelectedAndPrice();
        });
    });
}

function updateTotalSelectedAndPrice() {
    let totalSelected = 0;
    let totalPrice = 0;

    chocolates.forEach(chocolate => {
        totalSelected += chocolate.quantity;
        totalPrice += chocolate.price * chocolate.quantity;
    });

    totalSelectedSpan.textContent = totalSelected;
    totalPriceSpan.textContent = totalPrice.toFixed(2);

    if (totalSelected > 24) {
        totalSelectedSpan.style.color = "red";
        addToCartButton.disabled = true;
    } else {
        totalSelectedSpan.style.color = "black";
        addToCartButton.disabled = false;
    }
    
}

updateUI(); // Initialize the UI
