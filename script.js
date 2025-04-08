const container = document.getElementById("product-container");

// My deployed Apps Script URL 👇
const API_URL = 'https://script.google.com/macros/s/AKfycbw9aImBgHRaDUn1T0Xu2vDyi-t4f4lmH6T5M0vuiWyg4aLj-H2zqYSQP9wX7yh1cPB7/exec';

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
    container.innerHTML = "<p>Error loading products. Please try again.</p>";
    console.error("Error:", err);
  });
