/**
 * Product Card Component for Temporal Treasures
 * Creates a bold, modern product card element
 */

/**
 * Create a product card element
 * @param {object} product - The product object to create a card for
 * @returns {HTMLElement} - The product card element
 */
function createProductCard(product) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create card HTML
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <div class="product-time">${product.timeLength}</div>
            <h3>${product.name}</h3>
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <p class="product-description">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
            <a href="pages/product.html?id=${product.id}" class="btn">DISCOVER</a>
        </div>
    `;
    
    return card;
}