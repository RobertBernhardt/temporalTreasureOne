/**
 * Product data for Temporal Treasures
 * This file contains the data for all sand clock products
 */

// Array of product objects
const products = [
    {
        id: 1,
        name: "Geometric Prism",
        price: 89.99,
        description: "A modern geometric sand clock with a triangular prism design. Clear glass with vibrant blue sand that creates a mesmerizing flow pattern.",
        timeLength: "15 minutes",
        material: "Glass & Polished Aluminum",
        dimensions: "6\" × 4\" × 4\"",
        color: "Blue Sand",
        featured: true,
        image: "assets/images/products/geometric-prism.jpg"
    },
    {
        id: 2,
        name: "Twisted Oak Hourglass",
        price: 129.99,
        description: "Handcrafted from a single piece of oak with a natural twisted design that showcases the wood's grain. Filled with warm amber sand.",
        timeLength: "30 minutes",
        material: "Solid Oak & Glass",
        dimensions: "8\" × 3.5\" × 3.5\"",
        color: "Amber Sand",
        featured: true,
        image: "assets/images/products/twisted-oak.jpg"
    },
    {
        id: 3,
        name: "Celestial Glow",
        price: 149.99,
        description: "A stunning hourglass with embedded LED lighting that illuminates the sand particles as they fall, creating a star-like effect in the darkness.",
        timeLength: "60 minutes",
        material: "Glass & Brass",
        dimensions: "10\" × 5\" × 5\"",
        color: "White Sand with Light Effect",
        featured: true,
        image: "assets/images/products/celestial-glow.jpg"
    },
    {
        id: 4,
        name: "Marble Tempus",
        price: 199.99,
        description: "A luxurious sand clock crafted from black and white marble, providing a stunning contrast to the red sand within. A statement piece for any office or study.",
        timeLength: "5 minutes",
        material: "Marble & Glass",
        dimensions: "7\" × 4\" × 4\"",
        color: "Red Sand",
        featured: true,
        image: "assets/images/products/marble-tempus.jpg"
    },
    {
        id: 5,
        name: "Helix Timer",
        price: 79.99,
        description: "A unique double-helix design where sand flows through spiral glass tubes, creating a hypnotic visual effect as it measures time.",
        timeLength: "15 minutes",
        material: "Borosilicate Glass & Beechwood",
        dimensions: "7.5\" × 3\" × 3\"",
        color: "Purple Sand",
        featured: true,
        image: "assets/images/products/helix-timer.jpg"
    },
    {
        id: 6,
        name: "Copper Antiquity",
        price: 159.99,
        description: "Inspired by Renaissance designs, this sand clock features a weathered copper frame with intricate engravings and emerald green sand.",
        timeLength: "30 minutes",
        material: "Aged Copper & Glass",
        dimensions: "9\" × 4.5\" × 4.5\"",
        color: "Emerald Sand",
        featured: true,
        image: "assets/images/products/copper-antiquity.jpg"
    },
    {
        id: 7,
        name: "Minimalist Cube",
        price: 69.99,
        description: "A contemporary cubic design with a suspended hourglass inside a clear acrylic frame, creating the illusion of sand floating in space.",
        timeLength: "10 minutes",
        material: "Acrylic & Glass",
        dimensions: "5\" × 5\" × 5\"",
        color: "Black Sand",
        featured: false,
        image: "assets/images/products/minimalist-cube.jpg"
    },
    {
        id: 8,
        name: "Forest Enchantment",
        price: 119.99,
        description: "Handcrafted from reclaimed walnut with moss and tiny woodland elements embedded in the wooden base. Contains earthy brown sand.",
        timeLength: "45 minutes",
        material: "Walnut, Glass & Natural Elements",
        dimensions: "8.5\" × 4\" × 4\"",
        color: "Brown Sand",
        featured: false,
        image: "assets/images/products/forest-enchantment.jpg"
    }
];

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to get all products
function getAllProducts() {
    return products;
}