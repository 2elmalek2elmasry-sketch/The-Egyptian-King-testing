// cart-engine.js
let cartItems = [];

function addToCart(product) {
  cartItems.push(product);
  updateCartUI();
}

function updateCartUI() {
  // Update cart icon badge or UI if needed
}

function showCheckout() {
  // Populate checkout modal with cart items
  const modal = document.getElementById('checkout-modal');
  const summaryContainer = document.getElementById('step-1-summary');

  // Clear previous
  summaryContainer.innerHTML = '';

  let total = 0;
  cartItems.forEach(item => {
    total += item.price;
    summaryContainer.innerHTML += `
      <div style="display:flex; align-items:center; margin-bottom:10px;">
        <img src="${item.image}" style="width:50px; margin-right:10px;">
        <div>
          <div>${item.name}</div>
          <div>EGP ${item.price}</div>
        </div>
      </div>
    `;
  });

  // Set total
  document.getElementById('modal-product-price').innerText = `EGP ${total}`;
  document.getElementById('checkout-modal').style.display = 'flex';
  showStep(1);
}

function handleCheckout() {
  // Collect billing info
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const address = document.getElementById('billingAddress').value.trim();
  const payMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

  if (!firstName || !lastName || !address || !payMethod) {
    alert('Please fill all billing info and select payment method.');
    return;
  }

  // Generate order summary
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const orderBody = `
    Product(s): ${cartItems.map(i => i.name).join(', ')}
    Total: EGP ${totalPrice}
    Billing: ${firstName} ${lastName}, ${address}
    Payment Method: ${payMethod}
  `;

  // Send email order (simulate)
  window.location.href = `mailto:2el.malek.2el.masry@gmail.com?subject=Order from The Egyptian King&body=${encodeURIComponent(orderBody)}`;

  // Redirect to PayPal if selected
  if (payMethod === 'paypal') {
    window.open('https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID', '_blank');
  } else {
    alert('Order placed with COD.');
  }
  // Clear cart
  cartItems = [];
  closeModal();
}
