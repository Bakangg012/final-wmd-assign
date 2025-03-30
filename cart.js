// Function to add items to cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the item is already in the cart
    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(productName + " added to cart!");
}

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsList = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    if (cartItemsList && totalPriceElement) {
        cartItemsList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItemsList.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = "Total: $" + totalPrice;
    }
}

// Function to remove items from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function to clear cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Run displayCart when cart page loads
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}
