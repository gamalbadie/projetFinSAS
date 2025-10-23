const prompt = require("prompt-sync")();

let livres = [];
let abonnes = [];
let emprunts = [];

let comptLivres = 1;
let comptAbonnes = 1;



function ajouterLivre() {
    
    let titre = prompt("Titre : ");
    let auteur = prompt("Auteur : ");
    let annee = parseInt(prompt("Année : "));
    livres.push({ id_livre: comptLivres++, titre, auteur, annee, disponible: "oui" });
    console.log("Le livre a été bien ajoutée !");

}



function ajouterPlusLivre() {
    
    let nLivres = prompt("Combien de livres voulez-vous ajouter ? : ");
    
    for (let i = 0; i < nLivres; i++) {
        console.log(`\nAjout du livre ${i+1} :`);
        ajouterLivre();
    }
}


function afficherLivres() {
  
    if(livres.length == 0){
    console.log("aucun livre trouvée");
    return;
  }

    console.log(" Liste des livres :");
  
    for(let i = 0; i < livres.length; i++){
    console.log(livres[i]);

  }
}



function triLivreTitre() {
    
    let nTrier = parseInt(prompt("Entrez 1 pour trier en ascendant et 2 pour trier en descendant : "));
    
    if (nTrier == 1) {
      
      livres.sort((a, b) => {
      if (a.titre < b.titre) return -1;
      if (a.titre > b.titre) return 1;
      return 0;
   
    });

    } else if (nTrier == 2) {

      livres.sort((a, b) => {
      if (a.titre < b.titre) return 1;
      if (a.titre > b.titre) return -1;
      return 0;

    });

    } else {
        
        console.log("Choix invalide. Veuillez entrer 1 ou 2.");
        return;
    
    }

    afficherLivres();

}



function triLivreAnnee() {
    
    livres.sort((a, b) => a.annee - b.annee);
    
    afficherLivres();

}



function afficheLivreDispo() {
    
    let livresDispo = false;

    console.log(" Livres disponibles :");
  
    for (let i = 0; i < livres.length; i++){
       if(livres[i].disponible == "oui"){
            console.log(livres[i].id_livre,livres[i].titre);
            livresDispo = true;
       }
    }
    
    if (!livresDispo) {
        console.log("Aucun livre disponible !");
    }
}



function rechercheID() {
    
    let idRecherche = parseInt(prompt("Entrez l'ID du livre pour rechercher : "));
    let trouvee = false;
    
    for (let i = 0; i < livres.length; i++) {
       if (livres[i].id_livre === idRecherche) {                           
           console.log("Livre trouvé :\n", livres[i]);    
           trouvee = true;
      }
     } if (!trouvee) {
           console.log("Livre introuvable");
     }
}



function ajouterAbonne() {
    
    let nom = prompt("Nom : ");
    let prenom = prompt("Prenom : ");
    let email = prompt("Email : ");
    abonnes.push ({ id : comptAbonnes++, nom, prenom, email});
    console.log("L'abonnée a été bien ajouté !");

}



function afficheAbonne() {
    if (abonnes.length == 0){
    console.log("aucun abonnée trouvée !");
    return;
  }

    console.log(" Liste des abonnes :");
  
    for (let i = 0; i < abonnes.length; i++){
    console.log(abonnes[i]);

  }
}



function enregisterEmprunt() {
    
    let idLivre = parseInt(prompt("ID du livre : "));
    let idAbonne = parseInt(prompt("ID de l'abonné : "));

    let livre = livres.find(l => l.id_livre === idLivre);
    let abonne = abonnes.find(a => a.id === idAbonne);

    if (!livre || !livre.disponible) {
        console.log("Ce livre est non disponible ou inexistant.");
        return;
    }

    if (!abonne) {
        console.log("Abonné inexistant.");
        return;
    }

    emprunts.push({ idAbonne, idLivre });
    livre.disponible = false;

    console.log(`Livre "${livre.titre}" emprunté par l'abonné ${idAbonne}.`);
}

function enregistrerRetour() {
    
    let idAbonne = parseInt(prompt("Entrez l'ID de l’abonné : "));
    let idLivre = parseInt(prompt("Entrez l'ID du livre : "));

    let indexEmprunt = emprunts.findIndex(e => e.idAbonne === idAbonne && e.idLivre === idLivre);

    if (indexEmprunt === -1) {
        console.log("Aucun emprunt trouvé pour cet abonné et ce livre.");
        return;
    }

    emprunts.splice(indexEmprunt, 1);

    let livre = livres.find(l => l.id_livre === idLivre);
    
    if (livre) {
        livre.disponible = true;
    }

    console.log("Retour enregistré.");
}



function afficherLivresParAbonne() {
    
    let idAbonne = parseInt(prompt("Entrez l'ID de l'abonné : "));

    let abonne = abonnes.find(a => a.id === idAbonne);

    if (!abonne) {
        console.log("Abonné introuvable.");
        return;
    }

    let empruntsAbonne = emprunts.filter(e => e.idAbonne === idAbonne);

    if (empruntsAbonne.length === 0) {
        console.log("Cet abonné n'a emprunté aucun livre.");
        return;
    }

    console.log(`Livres empruntés par ${abonne.prenom} ${abonne.nom} :`);

    for (let emprunt of empruntsAbonne) {
        let livre = livres.find(l => l.id_livre === emprunt.idLivre);
        if (livre) {
            console.log(`- ${livre.titre} (Auteur : ${livre.auteur}, Année : ${livre.annee})`);
        }
    }
}



//ajouterPlusLivre();
//afficheLivreDispo();
//afficherLivres();
//rechercheID();
//ajouterAbonne();
//afficheAbonne();

//enregisterEmprunt();

//enregistrerRetour();

//afficherLivresParAbonne();