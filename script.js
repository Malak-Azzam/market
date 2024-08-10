// تعريف المنتجات
const products = [
    { name: 'كرز', price: 5, quantity: 0, productId: 100, image: 'images/cherry.jpg' },
    { name: 'برتقال', price: 3, quantity: 0, productId: 101, image: 'images/orange.jpg' },
    { name: 'موز', price: 4, quantity: 0, productId: 102, image: 'images/banana.jpg' },
    { name: 'فراولة', price: 4, quantity: 0, productId: 103, image: 'images/strawberry.jpg' }
  ];
  
  let cart = [];
  let remainingBalance = 0; // المتغير العالمي لتخزين الرصيد المتبقي
  
  // إضافة المنتج إلى السلة
  function addProductToCart(productId) {
    const product = products.find(p => p.productId === productId);
    const cartItem = cart.find(item => item.productId === productId);
  
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
  }
  
  // زيادة الكمية
  function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    }
    renderCart();
  }
  
  // تقليل الكمية
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
            removeProductFromCart(productId);
        }
    }
    renderCart();
  }
  
  // إزالة المنتج من السلة
  function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
  }
  
  // عرض السلة
  function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - ${item.price} دولار</p>
            <p>الكمية: ${item.quantity}</p>
            <div class="cart-controls">
                <button onclick="increaseQuantity(${item.productId})">+</button>
                <button onclick="decreaseQuantity(${item.productId})">-</button>
                <button onclick="removeProductFromCart(${item.productId})">إزالة</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    updateCartTotal();
  }
  
  // حساب المجموع الكلي للسلة
  function cartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  // تحديث المجموع الكلي في الواجهة
  function updateCartTotal() {
    const total = cartTotal();
    document.getElementById('cartTotal').innerText = `المجموع الكلي: ${total} دولار`;
  }
  
  // إتمام عملية الشراء
  function pay(amount) {
    const total = cartTotal();
    const change = amount - total;
    let receiptMessage;
  
    if (change >= 0) {
        receiptMessage = `شكراً لك! المتبقي لك: ${change.toFixed(2)} دولار.`;
        cart = []; // إفراغ السلة بعد الدفع
    } else {
        receiptMessage = `المبلغ المتبقي للدفع: ${(-change).toFixed(2)} دولار.`;
    }
  
    remainingBalance = change >= 0 ? 0 : -change;
    document.getElementById('receipt').innerText = receiptMessage;
    renderCart();
  }
  
  // إتمام الشراء
  function completePurchase() {
    const cashReceived = parseFloat(document.getElementById('cashReceived').value);
    pay(cashReceived);
  }
  