const addToShoppingCarButtons = document.querySelectorAll('.agregar')
addToShoppingCarButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartCardContainer = document.querySelector('.shoppingCartCardContainer');

function addToCartClicked(event) {
      const button = event.target;
    const   card1 =  button.closest('.card');
    


    const cardTitle = card1.querySelector('.card-text').textContent;
    const cardPrice = card1.querySelector('.text-muted').textContent;
    addItemToShoppingCart(cardTitle, cardPrice);
};

//}
//function addItemToShoppingCart(cardTitle,cardPrice){
//}