//FUNCTION PAGE CONFIRMATION PRODUCT - Afficher les informations du produit selectionné par l'utilisateur******************************************************************************
function getProductChoosen() {

    //Récupérer l'ID du produit sélectionné par Query Parameter
    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    console.log(_id);

    //Créer du contenu HTML correspondant au produit sélectionné
    fetch('http://localhost:3000/api/cameras' + '/' + _id).then(response => response.json()).then(response => detailofproduct(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}

//Fuction to Display the details of a product

function detailofproduct(Product) {

let HTMLProductlist = `<div class="productlist">
        <h2>${Product.name}</h2>
        <p class="text-center">${Product.description}</p>
        <p class="priceproductslist">Price of the article: ${Product.price / 100 + '.' + Product.price % 100}</p>
        <img class="imageproduct" src="${Product.imageUrl}">
        <p class="priceproductslist">Options for this article:</p>
        <ul id="options" class="text-center"></ul>
        
    </div>`
            
            console.log(HTMLProductlist);
            document.getElementById('productchoosen').innerHTML = HTMLProductlist;
            getoptions(Product)
}


function getoptions(Product) {
    let optionsection = document.getElementById("options");
   
    for (let i = 0; i < Product.lenses.length; i++) {
        let newOption = document.createElement('p');
        newOption.innerText = Product.lenses[i];

        optionsection.append(newOption);
        }
}

//La fonction submitProduct() permet d'enregistrer un produit dans la base LocalHost (Panier)

async function submitProduct() {

    //Récupérer l'ID du produit selectionné par Query Parameter
    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    
    fetch('http://localhost:3000/api/cameras' + '/' + _id).then(response => response.json()).then(response => pushproduct(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}

//Ajouter le produit à l'array Panier

function pushproduct(Myproduct) {

var Panier = JSON.parse(window.localStorage.getItem('Cart'));
if (Panier === null) {var Panier = []};

Panier.push(Myproduct);
console.log(Panier);

window.localStorage.setItem('Cart', JSON.stringify(Panier));
setTimeout(window.location.replace("panier.html"), 5000);
}