/* fonction sur le bouton dans le header qui permet d'ouvrir le formulaire*/

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

/**
 * Récupération des éléments du DOM
 */

// Récupération du formulaire
let formContainer = document.querySelector(".form-container");

// Récupération du tableau qui va contenir les infos du recupéré dans le formulaire

let tableContainer = document.querySelector(".table tbody");

let afficheinfo = document.querySelector(".afficheinfo");

// Création de mon tableau fictif de produit  à vide
let stockArray = [];

let stockArrayStorage = JSON.parse(localStorage.getItem("@stockArray"));

// Création de l'addEventListener du formulaire

formContainer.addEventListener("submit", function (e) {
  // BLOQUAGE DU RECHARGEMENT DE LA PAGE
  e.preventDefault();

  // Récupération des données du formulaires grace a la technique universel new formData

  let data = new FormData(formContainer);

  // Creation des Variables du formulaire

  let nomProduit = data.get("nomProduit");
  let quantite = data.get("quantite");
  let prixAchatHT = data.get("prixAchatHT");
  let prixVenteHT = data.get("prixVenteHT");
  let margeHT = data.get("margeHT");
  let tva = data.get("TVA");
  let prixVenteTTC = data.get("prixVenteTTC");
  let typeProduit = data.get("typeProduit");
  let degresBA = data.get("degresBa");

  /*
  if (
    !nomProduit ||
    !quantite ||
    !prixAchatHT ||
    !prixVenteHT ||
    !typeProduit
  ) {
    alert("Veuillez remplir tout les champs");
  } else { }
    // création de l'objet stock vide
*/
  let stock;

  if (data.get("typeProduit") == "Boisson non alcolisée") {
    stock = new BoissonBNA(
      nomProduit,
      quantite,
      prixAchatHT,
      prixVenteHT,
      (margeHT = prixVenteHT - prixAchatHT),
      (tva = 0.2 * prixVenteHT),
      (prixVenteTTC = Number(prixVenteHT) + Number(tva)),
      typeProduit
    );
  } else if (data.get("typeProduit") == "Boisson alcolisée") {
    stock = new BoissonBA(
      nomProduit,
      quantite,
      prixAchatHT,
      prixVenteHT,
      (margeHT = prixVenteHT - prixAchatHT),
      (tva = 0.2 * prixVenteHT),
      (prixVenteTTC = Number(prixVenteHT) + Number(tva)),
      typeProduit,
      degresBA
    );
  } else {
  }

  stockArray.push(stock);

  console.log("stock", stock);

  localStorage.setItem("@stockArray", JSON.stringify(stockArray));

  ajoutproduit();

  // // Element pour que le formulaire se vide apres saisi et validation
  formContainer.reset();
});

// création de la fonction ajout produit

function ajoutproduit() {
  let stockcontent = "";
  let trLine;

  stockArray.forEach(function (element) {
    //création d'un element tr et donner un innerhtml + tr

    trLine = document.createElement("tr");

    if (element.type == "Boisson non alcolisée") {
      console.log(element.type);
      if (Number(element.quantite) <= 5) {
        stockcontent = ` <tr> 
        <td >${element.nomProduit} </td>
        <td class="tdRed"> ${element.quantite} </td>
        <td> ${element.prixAchatHT} </td>
        <td> ${element.prixVenteHT} </td>
        <td> ${element.margeHT} </td>
        <td> ${element.tva}
        <td> ${element.prixVenteTTC} </td>
        <td> ${element.typeProduit} </td>
        <td> ${element.degresBA}</td>
        <button class="deleteButton"> Supprimer </button>
         
        </tr> `;
      } else {
        stockcontent = ` <tr> 
        <td >${element.nomProduit} </td>
        <td > ${element.quantite} </td>
        <td> ${element.prixAchatHT} </td>
        <td> ${element.prixVenteHT} </td>
        <td> ${element.margeHT} </td>
        <td> ${element.tva}
        <td> ${element.prixVenteTTC} </td>
        <td> ${element.typeProduit} </td>
        <td> ${element.degresBA}</td>
    
        <button class="deleteButton"> Supprimer </button> 

        </tr> `;
      }
    } else if (element.type == "Boisson alcolisée") {
      if (Number(element.quantite) <= 5) {
        stockcontent = ` <tr> 
        <td >${element.nomProduit} </td>
        <td class="tdRed"> ${element.quantite} </td>
        <td> ${element.prixAchatHT} </td>
        <td> ${element.prixVenteHT} </td>
        <td> ${element.margeHT} </td>
        <td> ${element.tva}
        <td> ${element.prixVenteTTC} </td>
        <td> ${element.typeProduit} </td>
        <td> ${element.degresBA}</td>
        <button class="deleteButton"> Supprimer </button>
        </tr> `;
      } else {
        stockcontent = ` <tr> 
        <td >${element.nomProduit} </td>
        <td > ${element.quantite} </td>
        <td> ${element.prixAchatHT} </td>
        <td> ${element.prixVenteHT} </td>
        <td> ${element.margeHT} </td>
        <td> ${element.tva}
        <td> ${element.prixVenteTTC} </td>
        <td> ${element.typeProduit} </td>
        <td> ${element.degresBA}</td>
    
        <button class="deleteButton"> Supprimer </button>
        </tr> `;
      }
    } else {
    }
  });

  trLine.innerHTML = stockcontent;
  tableContainer.appendChild(trLine);

  editProduit(trLine);

  deleteProduit();
}

function editProduit(trLine) {
  let editContent;
  let editButtonQuery = document.querySelectorAll(".editButton");
  editButtonQuery.forEach(function (editDeletes, index) {
    editDeletes.addEventListener("click", function () {
      editContent = ` <tr> 
      <input type="text" value=${stockArray[index].nomProduit} />
      <input type="number" value=${stockArray[index].quantite} />
      <input type="number" value=${stockArray[index].prixAchatHT} />
      <input type="number" value=${stockArray[index].prixVenteHT} />
      <input type="number" value=${stockArray[index].margeHT} />
      <input type="number" value=${stockArray[index].tva}/>
      <input type="number" value=${stockArray[index].prixVenteTTC} />
      <input type="number" value=${stockArray[index].typeProduit} />
      <input type="number" value=${stockArray[index].degresBA}/>
      <button class="validerButton" type="submit"> valider </buton>
      </tr> `;

      trLine.innerHTML = editContent;
    });
  });
}

function deleteProduit() {
  let deleteButtonQuery = document.querySelectorAll(".deleteButton");

  deleteButtonQuery.forEach(function (buttonDeletes, index) {
    buttonDeletes.addEventListener("click", function () {
      let ligne = deleteButtonQuery[index].parentElement;
      ligne.remove();

      stockArray.splice(index, 1);

      localStorage.setItem("@stockArray", JSON.stringify(stockArray));
    });
  });
}

// création des prototypes et de l'extension
class Boisson {
  constructor(
    nomProduit,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    tva,
    prixVenteTTC,
    typeProduit
  ) {
    this.nomProduit = nomProduit;
    this.quantite = quantite;
    this.prixAchatHT = prixAchatHT;
    this.prixVenteHT = prixVenteHT;
    this.margeHT = margeHT;
    this.tva = tva;
    this.prixVenteTTC = prixVenteTTC;
    this.typeProduit = typeProduit;
  }
}

class BoissonBNA extends Boisson {
  constructor(
    nomProduit,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    tva,
    prixVenteTTC,
    typeProduit,
    degresBA
  ) {
    super(
      nomProduit,
      quantite,
      prixAchatHT,
      prixVenteHT,
      margeHT,
      tva,
      prixVenteTTC,
      typeProduit
    );
    this.type = "Boisson non alcolisée";
    this.degresBA = "";
  }
}

class BoissonBA extends Boisson {
  constructor(
    nomProduit,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    tva,
    prixVenteTTC,
    typeProduit,
    degresBA
  ) {
    super(
      nomProduit,
      quantite,
      prixAchatHT,
      prixVenteHT,
      margeHT,
      tva,
      prixVenteTTC,
      typeProduit
    );
    this.type = "Boisson alcolisée";
    this.degresBA = degresBA;
  }
}
