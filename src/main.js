/**
 * Temporal Treasures - Main JavaScript File
 * This file handles the main functionality of the e-commerce site
 */

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initializeSite();

    // Update cart count
    updateCartCount();
});

/**
 * Initialize the site functionality
 */
function initializeSite() {
    // Check what page we're on based on the URL
    const currentPath = window.location.pathname;
    
    // Homepage
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        // Load featured products
        loadFeaturedProducts();
    }
    // Product detail page
    else if (currentPath.includes('product.html')) {
        // Get product ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            // Load product details
            loadProductDetails(productId);
        } else {
            // Redirect to homepage if no product ID
            window.location.href = '../index.html';
        }
    }
    // Cart page
    else if (currentPath.includes('cart.html')) {
        // Load cart items
        loadCartItems();
    }
    // Checkout page
    else if (currentPath.includes('checkout.html')) {
        // Load checkout summary
        loadCheckoutSummary();
        // Setup checkout form validation
        setupCheckoutForm();
    }
}

/**
 * Load featured products on the homepage
 */
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    // Exit if container doesn't exist (not on homepage)
    if (!featuredProductsContainer) return;
    
    // Get featured products
    const featuredProducts = getFeaturedProducts();
    
    // Clear container
    featuredProductsContainer.innerHTML = '';
    
    // Add each product to the container
    featuredProducts.forEach(product => {
        featuredProductsContainer.appendChild(createProductCard(product));
    });
}

/**
 * Load product details on the product page
 * @param {string} productId - The ID of the product to load
 */
function loadProductDetails(productId) {
    const productContainer = document.getElementById('product-container');
    
    // Exit if container doesn't exist (not on product page)
    if (!productContainer) return;
    
    // Get product details
    const product = getProductById(productId);
    
    // If product not found, redirect to homepage
    if (!product) {
        window.location.href = '../index.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Temporal Treasures`;
    
    // Populate product details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = `../${product.image}`;
    document.getElementById('product-time').textContent = product.timeLength;
    document.getElementById('product-material').textContent = product.material;
    document.getElementById('product-dimensions').textContent = product.dimensions;
    document.getElementById('product-color').textContent = product.color;
    
    // Setup add to cart functionality
    setupAddToCart(product);
}

/**
 * Setup the add to cart functionality on the product page
 * @param {object} product - The product to add to cart
 */
function setupAddToCart(product) {
    const addToCartBtn = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    // Exit if elements don't exist
    if (!addToCartBtn || !quantityInput || !decreaseBtn || !increaseBtn) return;
    
    // Initialize quantity
    let quantity = 1;
    quantityInput.value = quantity;
    
    // Decrease quantity button
    decreaseBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });
    
    // Increase quantity button
    increaseBtn.addEventListener('click', function() {
        quantity++;
        quantityInput.value = quantity;
    });
    
    // Quantity input change
    quantityInput.addEventListener('change', function() {
        quantity = parseInt(this.value);
        
        // Ensure quantity is at least 1
        if (quantity < 1 || isNaN(quantity)) {
            quantity = 1;
            this.value = quantity;
        }
    });
    
    // Add to cart button
    addToCartBtn.addEventListener('click', function() {
        addToCart(product, quantity);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `${product.name} added to cart!`;
        document.body.appendChild(successMsg);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 300);
        }, 3000);
        
        // Update cart count
        updateCartCount();
    });
}

/**
 * Add a product to the cart
 * @param {object} product - The product to add
 * @param {number} quantity - The quantity to add
 */
function addToCart(product, quantity) {
    // Get current cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Update the cart count in the header
 */
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    
    // Exit if element doesn't exist
    if (!cartCountElement) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count
    cartCountElement.textContent = totalItems;
}

/**
 * Load cart items on the cart page
 */
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    // Exit if containers don't exist (not on cart page)
    if (!cartItemsContainer || !cartEmptyMessage || !cartSummaryContainer) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Show empty message if cart is empty
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartSummaryContainer.style.display = 'none';
        return;
    }
    
    // Hide empty message and show cart
    cartEmptyMessage.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummaryContainer.style.display = 'block';
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Track cart totals
    let subtotal = 0;
    
    // Add each item to the container
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Create cart item element
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="../${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <div class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Calculate shipping (free over $100)
    const shipping = subtotal >= 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    // Update cart summary
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
    
    // Setup cart interaction
    setupCartInteraction();
}

/**
 * Setup cart interaction (quantity changes, item removal)
 */
function setupCartInteraction() {
    // Get all cart elements
    const decreaseBtns = document.querySelectorAll('.decrease-btn');
    const increaseBtns = document.querySelectorAll('.increase-btn');
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    // Decrease quantity buttons
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, -1);
        });
    });
    
    // Increase quantity buttons
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, 1);
        });
    });
    
    // Quantity input changes
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(this.value);
            
            if (quantity < 1 || isNaN(quantity)) {
                this.value = 1;
                updateCartItemQuantity(id, 0, 1);
            } else {
                updateCartItemQuantity(id, 0, quantity);
            }
        });
    });
    
    // Remove item buttons
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
}

/**
 * Update cart item quantity
 * @param {number} id - Product ID to update
 * @param {number} change - Amount to change quantity by (can be negative)
 * @param {number} [absolute] - Set to absolute quantity instead of changing
 */
function updateCartItemQuantity(id, change, absolute = null) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find product in cart
    const productIndex = cart.findIndex(item => item.id === id);
    
    if (productIndex === -1) return;
    
    // Update quantity
    if (absolute !== null) {
        cart[productIndex].quantity = absolute;
    } else {
        cart[productIndex].quantity += change;
    }
    
    // Ensure quantity is at least 1
    if (cart[productIndex].quantity < 1) {
        cart[productIndex].quantity = 1;
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart items
    loadCartItems();
    
    // Update cart count
    updateCartCount();
}

/**
 * Remove an item from the cart
 * @param {number} id - Product ID to remove
 */
function removeFromCart(id) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the product to remove
    cart = cart.filter(item => item.id !== id);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart items
    loadCartItems();
    
    // Update cart count
    updateCartCount();
}

/**
 * Load checkout summary on the checkout page
 */
function loadCheckoutSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const checkoutSummaryContainer = document.getElementById('checkout-summary');
    
    // Exit if containers don't exist
    if (!orderItemsContainer || !checkoutSummaryContainer) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Clear container
    orderItemsContainer.innerHTML = '';
    
    // Track cart totals
    let subtotal = 0;
    
    // Add each item to the container
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Create order item element
        const orderItemElement = document.createElement('div');
        orderItemElement.className = 'order-item';
        orderItemElement.innerHTML = `
            <div class="order-item-image">
                <img src="../${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <h4>${item.name}</h4>
                <div>Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
                <div>$${itemTotal.toFixed(2)}</div>
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItemElement);
    });
    
    // Calculate shipping (free over $100)
    const shipping = subtotal >= 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    // Update summary
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

/**
 * Setup checkout form validation
 */
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    // Exit if form doesn't exist
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zipCode = document.getElementById('zipCode').value.trim();
        
        // Check if required fields are filled
        if (!firstName || !lastName || !email || !address || !city || !zipCode) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Simulate order processing
        const orderButton = document.getElementById('place-order-btn');
        orderButton.textContent = 'Processing...';
        orderButton.disabled = true;
        
        // Simulate processing delay
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Redirect to confirmation page (for MVP, we go back to home)
            window.location.href = '../index.html?order=success';
        }, 2000);
    });
}