// Load the cart from localStorage or initialize it if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count display
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart').innerHTML = `Cart (${cartCount})`;
}

// Function to save the cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart
function addToCart(productIndex) {
  const productItems = document.querySelectorAll('.product-item');
  const productItem = productItems[productIndex - 1];
  const productName = productItem.querySelector('h3').textContent;
  const productPrice = productItem.querySelector('.new-price').textContent;

  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  alert(`Added ${productName} to cart. Price: ${productPrice}`);
}

// Function to display the cart items in the modal
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Clear previous items

  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} (x${item.quantity})`;
    cartItemsContainer.appendChild(listItem);
    total += parseFloat(item.price.replace('Rs.', '').replace('PKR', '')) * item.quantity;
  });

  cartTotalContainer.textContent = `Total: Rs.${total.toFixed(2)} PKR`;
}

// Get the modal and the close button
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');

// When the user clicks on the cart link, open the modal
document.querySelector('.cart a').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link behavior
  displayCartItems();
  modal.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Initial update of the cart count when the page loads
updateCartCount();
console.log(cart); // Add this to see cart updates

