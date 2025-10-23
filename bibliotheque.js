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
    livres.push({ id_livre: comptLivres++, titre, auteur, annee, disponible: true });
    console.log("Le livre a été bien ajoutée !");

}



function ajouterPlusLivre() {
    
    let nLivres = parseInt(prompt("Combien de livres voulez-vous ajouter ? : "));
    
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



function triLivreAnnee() {
    
    livres.sort((a, b) => a.annee - b.annee);
    
    afficherLivres();

}



function afficheLivreDispo() {
    
    let livresDispo = false;

    console.log(" Livres disponibles :");
  
    for (let i = 0; i < livres.length; i++){
       if(livres[i].disponible == true){
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




do {
  console.log(`\n ====== Gestion de bibliothéque ====== 
  1: Ajouter un livre 
  2: Ajouter plusieurs livres 
  3: Afficher les livres 
  4: Trier par titre (asc/desc) 
  5: Trier par année 
  6: Afficher les livres disponibles 
  7: Rechercher un livre par ID 
  8: Ajouter un abonné 
  9: Afficher les abonnés 
  10: Enregistrer un emprunt 
  11: Enregistrer un retour 
  12: Afficher les livres par abonné 
  13: Quitter`);

  choix = prompt("Entrez un choix : ");

  if (choix == 1) ajouterLivre();
  else if (choix == 2) ajouterPlusLivre();
  else if (choix == 3) afficherLivres();
  else if (choix == 4) triLivreTitre();
  else if (choix == 5) triLivreAnnee();
  else if (choix == 6) afficheLivreDispo();
  else if (choix == 7) rechercheID();
  else if (choix == 8) ajouterAbonne();
  else if (choix == 9) afficheAbonne();
  else if (choix == 10) enregistrerEmprunt();
  else if (choix == 11) enregistrerRetour();
  else if (choix == 12) afficherLivresParAbonne();
  else if (choix == 13) console.log("Merci, Au revoir !");
  else console.log("Cas introuvable. Entrez un nombre valide !");

} while (parseInt(choix) !== 13);

