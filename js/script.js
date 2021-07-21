(function(){ 
  const addToCartElems = document.querySelectorAll('.product-box__btn')  
  const cart = document.querySelectorAll('.top-cart-info__item .red-info')
  const select = document.querySelectorAll('.select-control')
  const gridBox = document.querySelector('.grid-box')
  let arrParent = [...gridBox.children]

  const selectCategory = select[0]
  const selectPrice = select[1]
  const list = [
    {'Завтраки': ['Овсяная каша с фруктами', 'Яичница глазунья с овощами на сковородке', 'Сет азербайджанский завтрак', 'Сырники со сметаной', ]},
    {'Первые блюда': ['Шпинатный крем-суп', 'Суп Пити', 'Борщ украинский', 'Суп Кюфта Бозбаш']},  
    {'Гарниры': ['Рис с овощами', 'Яичница с помидорами по-бакински',  'Картофель по-домашнему', 'Картофель фри']}
  ]

  const itemAmount = cart[0]
  const itemPrice = cart[1]
  let count = 0
  let price = 0
  

  addToCartElems.forEach(item => item.addEventListener('click', addToCart))
  function addToCart(e){
    const elem = e.target
    const itemCurrentAmount = elem.previousElementSibling.children[0].value
    const itemCurrentPrice = elem.previousElementSibling.previousElementSibling.textContent.split(/\D/).join('')
    count += +itemCurrentAmount
    itemAmount.textContent = count
    console.log(itemCurrentPrice)
    price += +itemCurrentPrice
    itemPrice.textContent = price
  }
  selectCategory.addEventListener('change', chooseCategory)
  function chooseCategory(e){
    removeChildElem(arrParent)
    let category = e.target.options[e.target.selectedIndex].text
    category === 'Все' ? showAllItems() : renderFilterItems(category)
  }

  function renderFilterItems(category){
    let filterObj = list.filter(item => item[category])
    let choosenCategory = filterObj[0][category]
    const arrTitle = []
    for(let i = 0; i < arrParent.length; i++){
      const elem = arrParent[i].children[0].textContent
      arrTitle.push(elem)
      if(choosenCategory.indexOf(elem) >= 0){
        arrParent[i].style.display = 'block'
      }
    }
  }
  
  function showAllItems(){
    arrParent.forEach(i => i.style.display = 'block')
  }
  function removeChildElem(parentElem){
    parentElem.forEach(i => i.style.display = 'none' )
  }
}())