const form = document.querySelector('.form');
const qty = document.querySelector('.qty-input');

  
      // SHOPPING CART PLUS OR MINUS
$('a.qty-minus').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    var price = parseInt(document.querySelector('.price-product').innerHTML);
    var totalPrice = document.querySelector('.total-product');  
    if (value > 1) {
        value = value - 1;
        totalPrice.innerHTML = price * value;
    } else {
        value = 0;
    }
      
    $input.val(value);
          
});
  
$('a.qty-plus').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    var price = parseInt(document.querySelector('.price-product').innerHTML);
    var totalPrice = document.querySelector('.total-product');
    if (value < 100) {
        value = value + 1;
        totalPrice.innerHTML = price * value;
    } else {
        value = 0;
    }
    $input.val(value);
});
  
  // RESTRICT INPUTS TO NUMBERS ONLY WITH A MIN OF 0 AND A MAX 100
$('input').on('blur', function(){
    var input = $(this);
    var value = parseInt($(this).val());
  
    if (value < 0 || isNaN(value)) {
        input.val(0);
    } else if (value > 100) {
        input.val(100);
    }
});


