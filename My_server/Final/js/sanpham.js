function sortProductsByOption() {
    const selectedOption = document.getElementById('sort-select').value;
    sortProducts(selectedOption);
}

function sortProducts(order) {
    const productsContainer = document.querySelector('.items-grid');
    const products = Array.from(productsContainer.children);

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.amount').innerText.replace('đ', '').replace(',', ''));
        const priceB = parseFloat(b.querySelector('.amount').innerText.replace('đ', '').replace(',', ''));

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    // Clear existing products
    productsContainer.innerHTML = '';

    // Append sorted products
    products.forEach(product => {
        productsContainer.appendChild(product);
    });
}

  // Hàm đếm số sản phẩm và cập nhật nội dung
  function updateProductCount() {
    var products = document.querySelectorAll('.product-grid');
    var productCount = products.length;

    // Cập nhật nội dung của span
    document.getElementById('productCount').textContent = productCount;
  }

  // Gọi hàm khi trang web được tải
  window.addEventListener('DOMContentLoaded', function () {
    // Gọi hàm cập nhật số sản phẩm
    updateProductCount();
  });
/*-------------------------------------------------------*/
  //Chi tiết sản phẩm//
// Lấy các phần tử cần thiết từ DOM
// var addToCartButton = document.querySelector('.add-to-cart');
// var sizeOptions = document.querySelectorAll('.size-options a');
// var quantityInput = document.querySelector('.quantity input');

// // Gắn sự kiện click cho nút "Thêm giỏ hàng"
// addToCartButton.addEventListener('click', function(event) {
//   event.preventDefault();

//   // Kiểm tra xem đã chọn đủ size và kích thước chưa
//   var selectedSize = document.querySelector('.size-options a.selected');
//   if (!selectedSize) {
//     alert('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
//     return;
//   }

//   // Kiểm tra số lượng hợp lệ
//   var quantity = parseInt(quantityInput.value);
//   if (isNaN(quantity) || quantity <= 0) {
//     alert('Vui lòng nhập số lượng hợp lệ.');
//     return;
//   }

// //   // Hiển thị thông báo "Thêm vào giỏ hàng thành công"
// //   alert('Thêm vào giỏ hàng thành công!');
// // });

/*-------------------------------------------------------*/
document.getElementById('submit-message').addEventListener('click', function(event) {
event.preventDefault();

var comment = document.getElementById('comment').value;
var name = document.getElementById('name').value;
var email = document.getElementById('mail').value;
var rating = document.getElementById('rating').value;

var newReview = document.createElement('li');
newReview.innerHTML = `
<div class="review-body">
<div class="review-content">
<p class="review-author"><strong>${name}</strong> - ${getCurrentDateTime()}</p>
<div class="rating" data-rating="${rating}">
${getRatingStars(rating)}
</div>
<p>${comment}</p>
</div>
</div>
`;

var reviewsList = document.querySelector('.reviews-list');
reviewsList.appendChild(newReview);

document.getElementById('comment').value = '';
document.getElementById('name').value = '';
document.getElementById('mail').value = '';
document.getElementById('rating').value = '1';
});

function getCurrentDateTime() {
var now = new Date();
var date = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();
var hours = now.getHours();
var minutes = now.getMinutes();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0' + minutes : minutes;
var dateTime = date + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ' ' + ampm;
return dateTime;
}

function getRatingStars(rating) {
var stars = '';
for (var i = 1; i <= 5; i++) 
return stars;
}




