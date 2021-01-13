const toggleDisplay=(pageName) => {
    var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"
    }
    document.getElementById(pageName).style.display = "block";
}
const reservationSubmit = ()=>{
    alert('Your table has been Reserved, Thank you');
    window.location.href = ('Main.html');
}
const friedPaneer = () =>{
    const image = '../img/fried.jpg';
    document.getElementById('friedPaneer').src = image;
    document.getElementById('friedbtn').style.display = 'none';
    document.getElementById('normalbtn').style.display = 'block'; 
}
const normalPaneer = () =>{
    const image1 = '../img/Palak-Paneer.jpg';
    document.getElementById('friedPaneer').src = image1;
    document.getElementById('friedbtn').style.display = 'block';
    document.getElementById('normalbtn').style.display = 'none'; 
}
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('addbtn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('food-pic')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            
        }
    }
    var cartRowContents = `
        <div class="cart-item qrr cart-column">
        <div class='qr'><br><br>
        <span class="cart-item-title">${title}</span><br><br>
        <img class="cart-item-image" src="${imageSrc}"><br><br>
        </div>
        <div class="cart-price cent qr cart-column"><p id="cart-price-align"> Price ${price}</p></div>
        <div class="qr">
        <input class="cart-quantity-input " type="number" min="1" max="5" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
            

        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
   
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Price', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs ' + total
}
