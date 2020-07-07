
//This function is used to display the confirmation that the order was well saved into the database ******************************************************************************
function confirmationOrder() {

    //Récupérer l'ID du produit sélectionné par Query Parameter
    let ConfirmOrder = JSON.parse(window.localStorage.getItem('ConfirmedOrdersUser1'));
    console.log(ConfirmOrder);

    let latestorder = ConfirmOrder.length - 1;
    console.log(latestorder);

    //Display the caractéristiques of this Order
    
    var TotalPrice = 0;

    let HTMLProductlist = "";
    var TotalPrice = 0;
    for (let i = 0; i < ConfirmOrder[latestorder].products.length; i++) {
        HTMLProductlist += `<div class="productlist">
                <h2>${ConfirmOrder[latestorder].products[i].name}</h2>
                <p class="text-center">${ConfirmOrder[latestorder].products[i].description}</p>
                <p class="priceproductslist">Price of the article: ${ConfirmOrder[latestorder].products[i].price / 100 + '.' + ConfirmOrder[latestorder].products[i].price % 100}</p>
                <img class="imageproduct" src="${ConfirmOrder[latestorder].products[i].imageUrl}">
            </div>`
        var TotalPrice = TotalPrice + ConfirmOrder[latestorder].products[i].price;
    }

    console.log(HTMLProductlist);
    document.getElementById('orderedproducts').innerHTML = HTMLProductlist;

    console.log(TotalPrice);
    TotalPriceEurosconfirm(TotalPrice);
}
//********************************************************************************************************************

function TotalPriceEurosconfirm(TotalPrice) {
    var TotalPriceEuros = TotalPrice / 100 + '.' + TotalPrice % 100;
    DisplayTotalPriceEuros(TotalPriceEuros);
}

function DisplayTotalPriceEuros(TotalPriceEuros) {
    let Pricesection = `<h3 class="pricetotal white text-center">This order of ${TotalPriceEuros} euros have been paid</h3>`
    document.getElementById("orderedproductsprice").innerHTML = Pricesection;
}
