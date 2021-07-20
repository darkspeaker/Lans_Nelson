(function(){ 
  const addToCartElems = document.querySelectorAll('.product-box__btn')  
  const cart = document.querySelectorAll('.top-cart-info__item .red-info')
  const itemAmount = cart[0]
  const itemPrice = cart[1]
  let count = 0
  let price = 0
  

  addToCartElems.forEach(item => item.addEventListener('click', addToCart))
  function addToCart(e){
    console.log('click')
    const elem = e.target
    const itemCurrentAmount = elem.previousElementSibling.children[0].value
    const itemCurrentPrice = elem.previousElementSibling.previousElementSibling.textContent.split(/\D/).join('')
    count += +itemCurrentAmount
    itemAmount.textContent = count
    console.log(itemCurrentPrice)
    price += +itemCurrentPrice
    itemPrice.textContent = price
    console.log(itemCount, itemPrice)
  }
}())