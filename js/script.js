(function(){ 
  const addToCartElems = document.querySelectorAll('.product-box__btn')  
  const cart = document.querySelectorAll('.top-cart-info__item .red-info')
  const select = document.querySelectorAll('.select-control')
  const gridBox = document.querySelector('.grid-box')
  const orderItemBtn = document.querySelector('.btn-check')
  const overlay = document.querySelector('.overlay')
  const modal = document.querySelector('.modal')
  const formInputName = document.querySelector('#user-name')
  const formInputEmail = document.querySelector('#user-email')
  const checkoutBtn = document.querySelector('.send-user-data')

  let arrParent = [...gridBox.children]

  const selectCategory = select[0]
  const selectPrice = select[1]
  const list = [
    {'Завтраки': ['Овсяная каша с фруктами', 'Яичница глазунья с овощами на сковородке', 'Сет азербайджанский завтрак', 'Сырники со сметаной', ]},
    {'Первые блюда': ['Шпинатный крем-суп', 'Суп Пити', 'Борщ украинский', 'Суп Кюфта Бозбаш']},  
    {'Гарниры': ['Рис с овощами', 'Яичница с помидорами по-бакински',  'Картофель по-домашнему', 'Картофель фри']},
    {'Все': ['Овсяная каша с фруктами', 'Яичница глазунья с овощами на сковородке', 'Сет азербайджанский завтрак', 'Сырники со сметаной',
            'Рис с овощами', 'Яичница с помидорами по-бакински',  'Картофель по-домашнему', 'Картофель фри',
            'Шпинатный крем-суп', 'Суп Пити', 'Борщ украинский', 'Суп Кюфта Бозбаш']},

  ]

  const itemAmount = cart[0]
  const itemPrice = cart[1]
  let count = 0
  let price = 0
  let priceActive = 155
  let categoryActive = 'Все'
  

  addToCartElems.forEach(item => item.addEventListener('click', addToCart))
  function addToCart(e){
    const elem = e.target
    const itemCurrentAmount = +elem.previousElementSibling.children[0].value
    const itemCurrentPrice = +elem.previousElementSibling.previousElementSibling.textContent.split(/\D/).join('')

    console.log(itemCurrentAmount, itemCurrentPrice)
    if(itemCurrentAmount === '' || itemCurrentAmount <= 0) return
    else{
      count += itemCurrentAmount
      itemAmount.textContent = count
      price += (itemCurrentAmount * itemCurrentPrice)
      itemPrice.textContent = price
    }
  }
  selectCategory.addEventListener('change', chooseCategory)
  function chooseCategory(e){
    const category = e.target.options[e.target.selectedIndex].text
    categoryActive = category
    category === 'Все' ? showAllItems() : renderFilterItems(category)
  }

  function renderFilterItems(category){
    removeChildElem(arrParent)
    const filterObj = list.filter(item => item[category])
    const choosenCategory = filterObj[0][category]
    for(let i = 0; i < arrParent.length; i++){
      const elem = arrParent[i]
      const elemText = elem.children[0].textContent
      const elemPrice = elem.lastElementChild.firstElementChild.textContent.split(/\D/).filter(Number).join()
      if(choosenCategory.indexOf(elemText) >= 0 && +priceActive > +elemPrice){
        elem.style.display = 'block'
      }
    }
  }
  
  selectPrice.addEventListener('change', choosePrice)
  function choosePrice(e){
    const price = e.target.options[e.target.selectedIndex].text.split(/\D/).filter(i => i).join()
    priceActive = price === '' ? 155 : price
    if(price === '') showAllItems()
    renderFilterPrice(priceActive)
  }

  function renderFilterPrice(price){
    removeChildElem(arrParent)
    for(let i = 0; i < arrParent.length; i++){
      const elem = arrParent[i]
      const elemText = elem.children[0].textContent
      const elemPrice = elem.lastElementChild.firstElementChild.textContent.split(/\D/).filter(Number).join()
      let filterObj = list.filter(item => item[categoryActive])
      let choosenCategory = filterObj[0][categoryActive]
      if(choosenCategory.indexOf(elemText) >= 0 && +price > +elemPrice){
        elem.style.display = 'block'
      }
    }
  }

  function showAllItems(){
    arrParent.forEach(i => i.style.display = 'block')
  }
  function removeChildElem(parentElem){
    parentElem.forEach(i => i.style.display = 'none' )
  }
  orderItemBtn.addEventListener('click', getOrderItem)
  function getOrderItem(){
    overlay.classList.add('active')
    modal.classList.remove('hide')
  }
  overlay.addEventListener('click', e => {
    const elem = e.target
    if(elem.matches('.active')) closeModal()
  })

  function closeModal(){
    overlay.classList.remove('active')
    modal.classList.add('hide')
  }

  checkoutBtn.addEventListener('click', checkout)
  function checkout(){
    if(formInputName.value.trim() !== '' && formInputEmail.value.trim() !== ''){
      alert('Ваш заказ успешно принят. В ближайшее время с вами свжется наш специалист')
      itemAmount.textContent = 'XXX'
      itemPrice.textContent = 'XXX'
      closeModal()
    }
    else{
      alert('Заполните все данные, коректно!')
    }
  }
  
}())
