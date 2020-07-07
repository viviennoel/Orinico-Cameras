//*********************************************************************************************************************

function DisplayPanier() {


    //Récupérer un tableau de tous les produits enregistrés dans LocalHost (Panier)
    let ListofOrder = JSON.parse(window.localStorage.getItem('Cart'));
    if (ListofOrder === null) {
        document.getElementById('panierproducts').innerHTML = 'Your Cart is empty at the moment';
        document.getElementById('orderform').style.display = 'none';

    } else {
        console.log(ListofOrder);

        let HTMLProductlist = "";
        var TotalPrice = 0;
        for (let i = 0; i < ListofOrder.length; i++) {
            HTMLProductlist += `<div class="productlist">
                <h2>${ListofOrder[i].name}</h2>
                <p class="text-center">${ListofOrder[i].description}</p>
                <p class="priceproductslist">Price of the article: ${ListofOrder[i].price / 100 + '.' + ListofOrder[i].price % 100}</p>
                <img class="imageproduct" src="${ListofOrder[i].imageUrl}">
            </div>`
            var TotalPrice = TotalPrice + ListofOrder[i].price;
        }

        console.log(HTMLProductlist);
        document.getElementById('panierproducts').innerHTML = HTMLProductlist;
        TotalPriceEuros(TotalPrice);
    }

    function TotalPriceEuros(TotalPrice) {
        var TotalPriceEuros = TotalPrice / 100 + '.' + TotalPrice % 100;
        DisplayTotalPriceEuros(TotalPriceEuros);
    }

    function DisplayTotalPriceEuros(TotalPriceEuros) {
        let Pricesection = `<h3 class="pricetotal white text-center">The total paid price is : ${TotalPriceEuros}</h3>`
        document.getElementById("pricetotal").innerHTML = Pricesection;
    }
}

//La fonction confirmOrder() permet d'obtenir le numero d'order puis d'enregistrer tout cela dans localhost
function OrderPanier(e) {

    var inputOrder = document.getElementsByTagName("input");
    var contact = {
        firstName: inputOrder[0].value,
        lastName: inputOrder[1].value,
        address: inputOrder[2].value,
        city: inputOrder[3].value,
        email: inputOrder[4].value
    }
    console.log(contact);

    let ListofOrder = JSON.parse(window.localStorage.getItem('Cart'));
    console.log(ListofOrder);

    var products = [];
    for (let i = 0; i < ListofOrder.length; i++) {
        var _id = products.push(ListofOrder[i]._id);
    }

    console.log(products);

    let order = { contact, products };

    console.log(order);

    fetch('http://localhost:3000/api/cameras/order', { method: "POST", headers: { 'Content-Type': "application/json" }, body: JSON.stringify(order) }).then(response => response.json()).then(response => confirmorderpress(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}

//A function to save the order in localhost (in the futurte, to be connected with Mongo DB)
function confirmorderpress(response) {

    var ConfirmedOrders = JSON.parse(window.localStorage.getItem('ConfirmedOrdersUser1'));
    if (ConfirmedOrders === null) { var ConfirmedOrders = [] };

    ConfirmedOrders.push(response);
    console.log(ConfirmedOrders);

    window.localStorage.setItem('ConfirmedOrdersUser1', JSON.stringify(ConfirmedOrders));
    window.localStorage.removeItem('Cart');
    setTimeout(window.location.replace("ConfirmationOrder.html"), 5000);
}

function ClearAllOrder() {
    window.localStorage.removeItem('Cart');
    setTimeout(window.location.replace("panier.html"), 5000);
}