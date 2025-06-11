const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 5999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 14999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Laptop Stand Adjustable",
        price: 3499,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 2299,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Portable Bluetooth Speaker",
        price: 6799,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "USB-C Hub Multi-Port",
        price: 2699,
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Mechanical Gaming Keyboard",
        price: 9799,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "4K Webcam HD",
        price: 5299,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
    }
];

let cart = [];
let selectedProductId = null;

function formatIndianPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}" onclick="selectProduct(${product.id})">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatIndianPrice(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.innerHTML = createProductCard(product);
        productCard.firstElementChild.style.animationDelay = `${index * 0.1}s`;
        productCard.firstElementChild.classList.add('fade-in');
        productsGrid.appendChild(productCard.firstElementChild);
    });
}

function selectProduct(productId) {
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(card => {
        card.classList.remove('selected');
    });

    const selectedCard = document.querySelector(`[data-product-id="${productId}"]`);
    selectedCard.classList.add('selected');
    selectedProductId = productId;

    selectedCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function addToCart(productId, event) {
    event.stopPropagation();

    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartUI();
        showNotification();
        animateAddToCart(productId);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartCounter = document.getElementById('cartCounter');
    cartCounter.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartCounter.style.transform = 'scale(1)';
    }, 200);
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function animateAddToCart(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const addButton = productCard.querySelector('.add-to-cart-btn');
    
    const originalText = addButton.innerHTML;
    addButton.style.background = '#2ecc71';
    addButton.innerHTML = '<i class="fas fa-check"></i> Added!';
    
    setTimeout(() => {
        addButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        addButton.innerHTML = originalText;
    }, 1500);
}

function showCartSummary() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let cartSummary = `🛒 Cart Summary:\n\n`;
    cart.forEach(item => {
        cartSummary += `${item.name} - ${formatIndianPrice(item.price)} x ${item.quantity}\n`;
    });
    cartSummary += `\nTotal Items: ${totalItems}\nTotal Price: ${formatIndianPrice(totalPrice)}`;
    
    alert(cartSummary);
}

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    document.getElementById('cartCounter').addEventListener('click', showCartSummary);
    
    setTimeout(() => {
        document.querySelector('.header').style.animation = 'fadeInUp 0.8s ease';
    }, 500);
});