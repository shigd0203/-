// 儲存資料
const products = [
  {
    id: '1',
    name: '經典-利姆路',
    price: 150,
    image: './image/SlimePE1-1.jpg'
  },
  {
    id: '2',
    name: '靜面具-利姆路',
    price: 200,
    image: './image/SlimePE1-2.jpg'
  },
  {
    id: '3',
    name: '暴風龍-利姆路',
    price: 250,
    image: './image/SlimePE1-3.jpg'
  },
  {
    id: '4',
    name: '國王-利姆路',
    price: 250,
    image: './image/SlimePE1-4.jpg'
  },
  {
    id: '5',
    name: '老師-利姆路',
    price: 180,
    image: './image/SlimePE1-5.jpg'
  },
  {
    id: '6',
    name: '蒼影-利姆路',
    price: 150,
    image: './image/SlimePE2-1.jpg'
  },
  {
    id: '7',
    name: '紫苑-利姆路',
    price: 120,
    image: './image/SlimePE2-2.jpg'
  },
  {
    id: '8',
    name: '音符-利姆路',
    price: 100,
    image: './image/SlimePE2-3.jpg'
  },
  {
    id: '9',
    name: '朱菜-利姆路',
    price: 140,
    image: './image/SlimePE2-4.jpg'
  },
  {
    id: '10',
    name: '紅丸-利姆路',
    price: 160,
    image: './image/SlimePE2-5.jpg'
  },
  {
    id: '11',
    name: '蜜利姆-利姆路',
    price: 150,
    image: './image/SlimePE3-1.jpg'
  },
  {
    id: '12',
    name: '靜-史萊姆',
    price: 200,
    image: './image/SlimePE3-2.jpg'
  },
  {
    id: '13',
    name: '校長-史萊姆',
    price: 100,
    image: './image/SlimePE3-3.jpg'
  },
  {
    id: '14',
    name: '蘭加-史萊姆',
    price: 210,
    image: './image/SlimePE3-4.jpg'
  },
  {
    id: '15',
    name: '哥布達-史萊姆',
    price: 120,
    image: './image/SlimePE3-5.jpg'
  },
  {
    id: '16',
    name: '蒼華-史萊姆',
    price: 150,
    image: './image/SlimePE4-1.jpg'
  },
  {
    id: '17',
    name: '戈畢爾-史萊姆',
    price: 150,
    image: './image/SlimePE4-2.jpg'
  },
  {
    id: '18',
    name: 'GiveMeFire-史萊姆',
    price: 120,
    image: './image/SlimePE4-3.jpg'
  },
  {
    id: '19',
    name: '烏蒂瑪-史萊姆',
    price: 120,
    image: './image/SlimePE4-4.jpg'
  },
  {
    id: '20',
    name: '迪亞布羅-史萊姆',
    price: 150,
    image: './image/SlimePE4-5.jpg'
  },

]

// 將商品加入到我的最愛

const favoriteKey = 'favoriteItems'; // 用於存儲我的最愛的 key

// 獲取我的最愛商品
function getFavorites() {
  return JSON.parse(localStorage.getItem('favoriteItems')) || [];
}

// 保存我的最愛商品
function saveFavorites(favorites) {
  localStorage.setItem(favoriteKey, JSON.stringify(favorites));
}

// 切換我的最愛狀態
function toggleFavorite(FHimg, productId) {
  const favorites = getFavorites();

  // 檢查商品是否已在我的最愛中
  const index = favorites.indexOf(productId);
  if (index === -1) {
    // 商品不在我的最愛中 -> 加入
    favorites.push(productId);
    FHimg.src = './image/Fheart-fill.svg'; // 切換為實心圖
    alert('商品已加入我的最愛');
  } else {
    // 商品在我的最愛中 -> 移除
    favorites.splice(index, 1);
    FHimg.src = './image/Fheart.svg'; // 切換為空心圖
    alert('商品已從我的最愛中移除');
  }

  // 同步移除「我的最愛」頁面的商品卡片
  const favoriteItemsContainer = document.getElementById('favorite-items');
  if (favoriteItemsContainer) {
    const card = favoriteItemsContainer.querySelector(`[data-id="${productId}"]`);
    if (card) {
      card.closest('.col').remove();

      // 如果「我的最愛」為空，顯示提示
      if (favorites.length === 0) {
        document.getElementById('favorite-item').innerHTML = `
          <p class="text-center">尚未收藏任何商品</p>
        `;
      }
    }
  }


  saveFavorites(favorites); // 保存到 localStorage
}


// 更新我的最愛
document.addEventListener('DOMContentLoaded', () => {
  const favorites = getFavorites();  
  const favoriteItemsContainer = document.getElementById('favorite-items');
  const FIC = document.getElementById('favorite-item')

  // 初始化商品頁面的愛心狀態
  document.querySelectorAll('.add-to-favorite').forEach(img => {
    const productId = img.getAttribute('data-id');        

    if (favorites.includes(productId)) {
      img.src = './image/Fheart-fill.svg';
    } else {
      img.src = './image/Fheart.svg';
    }
  });
  
  favoriteItemsContainer.addEventListener('click', Event => {
    if (Event.target.classList.contains('remove-favorite')) {
      const productId = Event.target.getAttribute('data-id');
      let favorites = getFavorites();

      // 更新「我的最愛」數據
      favorites = favorites.filter(id => id !== productId);
      saveFavorites(favorites);

      // 移除商品卡片
      const card = Event.target.closest('.col');
      card.remove();
    }

    // 如果「我的最愛」為空，顯示提示
    if (favorites.length === 0) {
      FIC.innerHTML = `
        <p class="text-center">尚未收藏任何商品</p>
      `;
    }

  });
  
  if (favorites.length === 0) {
    FIC.innerHTML = `
    <p class="text-center">
      尚未收藏任何商品
    </p>
    `;
    return;
  }



  // 遍歷我的最愛商品 ID
  favorites.forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // 動態插入商品
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
          <div class="card h-100 proImg" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">價格：$${product.price}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary add-to-cart" data-id="${product.id}">加入購物車</button>
              <img class="FHimg add-to-favorite remove-favorite" src="./image/Fheart-fill.svg" data-id="${product.id}" onclick="toggleFavorite(this, '${product.id}')">
            </div>
          </div>
      `;
      favoriteItemsContainer.appendChild(col);
    }
  });
});


// 購物車

const cartKey = 'shoppingCart';

// 獲取購物車數據
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// 保存購物車數據
function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

// 添加商品到購物車
function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.name} 已加入購物車`);
}

// 清空購物車
function clearCart() {
  saveCart([]);
}

// 刪除商品
function deleteItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCart();
}

// 更新商品數量
function updateQuantity(index, newQuantity) {
  const cart = getCart();
  cart[index].quantity = newQuantity;
  saveCart(cart);
  updateCart();
}

// 購物車的綁定事件
document.addEventListener('DOMContentLoaded', () => {
  updateCart();

  // 清空購物車
  document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart();
    updateCart();
    alert('購物車已清空');
  });

  // 刪除商品事件
  document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-item')) {
      const index = event.target.getAttribute('data-index');
      deleteItem(index);
    }
  });

  // 更新數量事件
  document.getElementById('cart-items').addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
      const index = event.target.getAttribute('data-index');
      const newQuantity = parseInt(event.target.value);
      if (newQuantity > 0) {
        updateQuantity(index, newQuantity);
      } else {
        alert('數量不能小於 1');
        updateCart();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cart = getCart();

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productElement = button.closest('.card');
      const product = {
        id: productElement.getAttribute('data-id'),
        name: productElement.getAttribute('data-name'),
        price: parseInt(productElement.getAttribute('data-price')),
        image: productElement.getAttribute('data-image'),
      };
      addToCart(product);
    });
  });
});

// 更新購物車內容
function updateCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">購物車是空的</td>
      </tr>
    `;
    totalElement.textContent = `總計：$0`;
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <input type="number" value="${item.quantity}" class="form-control quantity-input" data-index="${index}" min="1">
      </td>
      <td>$${itemTotal}</td>
      <td>
        <button class="btn btn-danger btn-sm delete-item" data-index="${index}">X</button>
      </td>
    `;

    cartItemsContainer.appendChild(row);
  });

  totalElement.textContent = `總計：$${total}`;
}
