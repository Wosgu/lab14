// Функция для обновления числа товаров в корзине
function updateCartItemCount() {
    // Получите данные о товарах в корзине из localStorage
    const cartItems = Object.keys(localStorage).filter(key => key.startsWith('product_'));
    
    // Найдите элемент для отображения количества товаров
    const cartItemCount = document.getElementById('cartItemCount');

    if (cartItemCount) {
        // Если элемент найден, обновите значение счетчика
        cartItemCount.textContent = cartItems.length;
    }
}

// Обработчик события DOMContentLoaded
document.addEventListener('DOMContentLoaded', updateCartItemCount);