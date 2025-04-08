const container = document.getElementById("product-container");

// My deployed Apps Script URL 👇
const API_URL = 'https://script.google.com/macros/s/AKfycbznVvCvQYwSqXq5oHTz1uq2Goh4u-O1oBvZOdJj7Ml4rcCJZrpsg7TiV9a60nKVeo4e/exec';

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product');

      const available = product.available.toString().toLowerCase() === 'true';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        ${product.discount > 0 ? `<p>Discount: ${product.discount}%</p>` : ''}
        ${available
          ? '<button>Add to Cart</button>'
          : '<p class="out-of-stock">Out of Stock</p>'
        }
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    container.innerHTML = "<p>Error loading products. Please try again later.</p>";
    console.error("Error:", err);
  });
