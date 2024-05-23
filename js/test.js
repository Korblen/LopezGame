// ################################## PROJET RPG ###############################################

// Step 1: Create character class with the 5 subclasses of character ############################

// 1.a Create Character class
class Character {
  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = 'playing'; // playing, winner, loser
  }

  // 1.b Create methods for takeDamage and dealDamage
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'loser';
      console.log(`${this.name} est éliminé(e) et ne peut plus jouer.`);
    }
  }

  dealDamage(victim) {
    console.log(`${this.name} attaque ${victim.name}. Il lui inflige ${this.dmg} dégâts.`);
    victim.takeDamage(this.dmg);
    if (victim.status === 'loser') {
      this.mana += 20;
      console.log(`${this.name} regagne 20 points de mana pour avoir éliminé ${victim.name}.`);
    }
  }
}

// Step 2: Create subclasses of Character ########################################################

// Fighter subclass //
class Fighter extends Character {
  constructor(name) {
    super(name, 12, 4, 40);
    this.specialAttackManaCost = 20; // Coût de l'attaque spéciale
  }

  // Special attack method for the Fighter
  darkVision(victim) {
    if (this.mana >= 20) {
      console.log(`${this.name} utilise Dark Vision sur ${victim.name} et inflige 5 dégâts.`);
      this.mana -= 20;
      victim.takeDamage(5);
      this.damageReduction = 2; // Prépare la réduction de dégâts pour le prochain tour
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser Dark Vision.`);
    }
  }

  // Surcharge de la méthode takeDamage pour inclure la réduction de dégâts
  takeDamage(damage) {
    const effectiveDamage = damage - (this.damageReduction || 0);
    super.takeDamage(effectiveDamage); // Appel de la méthode parent avec le dégât effectif
    this.damageReduction = 0; // Réinitialise la réduction de dégâts après l'avoir appliquée
  }
}

// Paladin subclass //
class Paladin extends Character {
  constructor(name) {
    super(name, 16, 3, 160);
    this.specialAttackManaCost = 40; // Coût de l'attaque spéciale
  }

  // Special attack method for the Paladin
  healingLighting(victim) {
    if (this.mana >= 40) {
      console.log(`${this.name} utilise Healing Lighting sur ${victim.name}, infligeant 4 dégâts et se soignant de 5 points de vie.`);
      this.mana -= 40;
      victim.takeDamage(4);
      this.hp += 5;
      console.log(`${this.name} a maintenant ${this.hp} points de vie.`);
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser Healing Lighting.`);
    }
  }
}

// Monk subclass //
class Monk extends Character {
  constructor(name) {
    super(name, 8, 3, 200);
    this.specialAttackManaCost = 25; // Coût de l'attaque spéciale
  }

  // Special attack method for the Monk
  heal() {
    if (this.mana >= 25) {
      console.log(`${this.name} utilise son pouvoir de guérison Heal et récupère 8 points de vie.`);
      this.mana -= 25;
      this.hp += 8;
      console.log(`${this.name} a maintenant ${this.hp} points de vie et ${this.mana} points de mana.`);
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser son pouvoir de guérison Heal.`);
    }
  }
}

// Berzerker subclass //
class Berzerker extends Character {
  constructor(name) {
    super(name, 8, 4, 0);
    this.specialAttackManaCost = 0; // Coût de l'attaque spéciale
  }

  // Special attack method for the Berzerker
  rage() {
    console.log(`${this.name} entre dans une Rage, augmentant son attaque de +1 mais perdant 1 point de vie.`);
    this.dmg += 1; // Augmente l'attaque de +1
    this.takeDamage(1); // Le Berzerker perd 1 point de vie
    console.log(`${this.name} a maintenant ${this.dmg} attaque et ${this.hp} points de vie.`);
  }
}

// Assassin subclass //
class Assassin extends Character {
  constructor(name) {
    super(name, 6, 6, 20);
    this.specialAttackManaCost = 20; // Coût de l'attaque spéciale
    this.shadowHitUsed = false; // Pour vérifier si Shadow Hit a été utilisé
  }

  // Special attack method for the Assassin
  shadowHit(victim) {
    if (this.mana >= 20 && !this.shadowHitUsed) {
      console.log(`${this.name} utilise Shadow Hit sur ${victim.name}, infligeant 7 dégâts.`);
      this.mana -= 20;
      victim.takeDamage(7);
      this.shadowHitUsed = true; // Marque Shadow Hit comme utilisé
      // Applique l'effet de ne pas prendre de dégâts au prochain tour dans la méthode takeDamage
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser Shadow Hit ou l'a déjà utilisé.`);
    }
  }

  // Surcharge de la méthode takeDamage pour inclure l'effet de Shadow Hit
  takeDamage(damage) {
    if (this.shadowHitUsed) {
      console.log(`${this.name} esquive l'attaque grâce à Shadow Hit.`);
      this.shadowHitUsed = false; // Réinitialise l'effet de Shadow Hit
      // L'Assassin perd 7 hp si l'adversaire n'est pas mort après Shadow Hit
      this.hp -= 7;
      if (this.hp <= 0) {
        this.hp = 0;
        this.status = 'loser';
        console.log(`${this.name} est éliminé(e) et ne peut plus jouer.`);
      }
    } else {
      super.takeDamage(damage);
    }
  }
}

// Wizard subclass //
class Wizard extends Character {
  constructor(name) {
    super(name, 10, 2, 200);
    this.specialAttackManaCost = 25; // Cout de l'attaque spéciale
  }

  // Special attack method for the Wizard
  fireball(victim) {
    if (this.mana >= 25) {
      console.log(`${this.name} lance une Fireball sur ${victim.name}, infligeant 7 dégâts.`);
      this.mana -= 25;
      victim.takeDamage(7);
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser Fireball.`);
    }
  }
}

// Thief subclass //
class Thief extends Character {
  constructor(name) {
    super(name, 14, 5, 50);
    this.specialAttackManaCost = 15; // Cout de l'attaque spéciale
    this.stealManaAmount = 10; // Nombre de points de mana à voler
  }

  // Special attack method for the Thief
  backstab(victim) {
    if (this.mana >= 15) {
      console.log(`${this.name} effectue un Backstab sur ${victim.name}, infligeant 8 dégâts.`);
      this.mana -= 15;
      victim.takeDamage(8);
      this.stealMana(victim);
    } else {
      console.log(`${this.name} n'a pas assez de mana pour utiliser Backstab.`);
    }
  }

  // Method to steal mana from the victim
  stealMana(victim) {
    if (victim.mana >= this.stealManaAmount) {
      victim.mana -= this.stealManaAmount;
      this.mana += this.stealManaAmount;
      console.log(`${this.name} vole ${this.stealManaAmount} points de mana à ${victim.name}.`);
    } else {
      console.log(`${victim.name} n'a pas assez de mana à voler.`);
    }
  }
}

// Step 3: Create Game class ################################################################
class Game {
  constructor() {
    this.turnLeft = 10;
    // Initialisez ici vos personnages
    this.characters = [
      new Fighter("LOPEZ Joe"),
      new Paladin("HOFFMAN de ces morts"),
      new Monk("DAVID Lopez"),
      new Berzerker("DONOVAN le Tuberculé"),
      new Assassin("HENOCK Cortes"),
      new Wizard("NEG Lopez"),
      new Thief("JENNIFER Lopez"),
    ];
    this.playerCharacter = null; // Ajout pour stocker le personnage du joueur
  }

  // Méthode pour choisir un combattant
  chooseCharacter(characterIndex) {
    // Sélectionner le personnage en fonction de l'index passé en paramètre
    this.playerCharacter = this.characters[characterIndex];
    if (this.playerCharacter) {
        console.log(`Vous avez choisi ${this.playerCharacter.name}.`);
        // Commencer le jeu
        this.startGame();
    }
  }

  // Start game methodstartGame() {
    startGame() {
      if (!this.playerCharacter) {
          console.error("Erreur : Aucun personnage joueur n'a été sélectionné.");
          return;
      }
      
      while (this.turnLeft > 0) {
          this.startTurn();
      }
  }
  

  // Afficher les statistiques des joueurs en jeu
  displayStats() {
    // Sélectionner l'élément game-messages
    const gameMessages = document.getElementById('game-messages');
    
    // Créer un élément <div> pour afficher les statistiques
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('stats');

    // Ajouter un titre
    const title = document.createElement('h2');
    title.textContent = "Statistiques des joueurs en jeu :";
    statsDiv.appendChild(title);

    // Filtrer les personnages en fonction de leur statut et afficher leurs statistiques
    this.characters.filter(character => character.status === 'playing').forEach(character => {
        const stats = document.createElement('p');
        stats.textContent = `${character.name} : HP: ${character.hp}, DMG: ${character.dmg}, MANA: ${character.mana}, STATUS: ${character.status}`;
        statsDiv.appendChild(stats);
    });

    // Effacer le contenu précédent avant d'ajouter les nouvelles statistiques
    gameMessages.innerHTML = '';

    // Ajouter le div des statistiques à l'élément game-messages
    gameMessages.appendChild(statsDiv);
}

  // Start turn method
  startTurn() {
    console.log(`C'est le tour numéro ${11 - this.turnLeft}`);
    this.displayStats(); // Afficher les statistiques des joueurs en début de tour
    
    // Joueur humain
    const character = this.playerCharacter;
    if (character.status === 'playing') {
      console.log(`C'est votre tour, ${character.name}.`);
      // Afficher les stats du personnage pour aider à la décision
      console.log(`${character.name} a ${character.hp} points de vie, ${character.dmg} points de dégât, et ${character.mana} points de mana.`);

      let actionChoice;
      let target;
      do {
        actionChoice = prompt(`${character.name}, choisissez votre action : \n 1. Attaque classique \n 2. Attaque spéciale (coûte ${character.specialAttackManaCost} mana)`);
        // Sélectionner un adversaire
        const opponents = this.characters.filter(opponent => opponent !== character && opponent.status === 'playing');
        let targetIndex = prompt(`Qui voulez-vous attaquer ?\n` + opponents.map((opponent, index) => `${index + 1}. ${opponent.name}`).join('\n'));
        target = opponents[targetIndex - 1];

        // Vérifier si le choix et la cible sont valides
        if (!target || !(actionChoice === '1' || (actionChoice === '2' && character.mana >= character.specialAttackManaCost))) {
          console.log("Action non valide ou cible non valide, veuillez réessayer.");
        }
      } while (!target || !(actionChoice === '1' || (actionChoice === '2' && character.mana >= character.specialAttackManaCost)));

      // Exécuter l'action choisie
      if (actionChoice === '1') {
        character.dealDamage(target);
      } else if (actionChoice === '2') {
        // Adapter selon la classe du personnage et l'attaque spéciale
        if (character instanceof Fighter) {
          character.darkVision(target);
        } else if (character instanceof Paladin) {
          character.healingLighting(target);
        } else if (character instanceof Monk) {
          character.heal();
        } else if (character instanceof Berzerker) {
          character.rage();
        } else if (character instanceof Assassin) {
          character.shadowHit(target);
        } else if (character instanceof Wizard) {
          character.fireball(target);
        } else if (character instanceof Thief) {
          character.backstab(target);
        }
      }
    }

    // IA pour les autres personnages
    this.characters.filter(char => char !== this.playerCharacter && char.status === 'playing').forEach(character => {
      if (character.status === 'playing') {
        console.log(`C'est le tour de ${character.name}.`);
        const opponents = this.characters.filter(opponent => opponent !== character && opponent.status === 'playing');
        const target = opponents[Math.floor(Math.random() * opponents.length)];
        const actionChoice = Math.random() < 0.5 ? '1' : '2'; // Choix aléatoire entre attaque classique et spéciale
        if (actionChoice === '1') {
          character.dealDamage(target);
        } else {
          // Adapter selon la classe du personnage et l'attaque spéciale
          if (character instanceof Fighter) {
            character.darkVision(target);
          } else if (character instanceof Paladin) {
            character.healingLighting(target);
          } else if (character instanceof Monk) {
            character.heal();
          } else if (character instanceof Berzerker) {
            character.rage();
          } else if (character instanceof Assassin) {
            character.shadowHit(target);
          } else if (character instanceof Wizard) {
            character.fireball(target);
          } else if (character instanceof Thief) {
            character.stealMana(target);
          }
        }
      }
    });

    this.skipTurn();
    this.displayStats();
  }

    // Skip turn method
    skipTurn() {
      this.turnLeft -= 1;
      if (this.turnLeft === 0) {
        this.endGame();
      }
    }

  // End game method
  endGame() {
    // Implémentez ici la logique de fin de jeu
    const winners = this.characters.filter(character => character.status === 'playing');
    if (winners.length === 1) {
      console.log(`Le gagnant est ${winners[0].name} !`);
    }
    else {
      console.log("Aucun gagnant.");
    }
    console.log("La partie est terminée.");
  }
}
// Step 4: Start the game ################################################################
document.addEventListener('DOMContentLoaded', function() {
  const characterBtns = document.querySelectorAll('.character-btn');
  characterBtns.forEach((btn, index) => {
      btn.addEventListener('click', function() {
          // Masquer le conteneur de sélection de personnage
          document.querySelector('.charselect').style.display = 'none';
          // Afficher l'interface de jeu
          document.getElementById('game-interface').style.display = 'block';
          // Créer une instance de la classe de jeu avec le personnage choisi
          const gameInstance = new Game();
          // Vérifier si l'index du personnage est valide
          if (index >= 0 && index < gameInstance.characters.length) {
              gameInstance.chooseCharacter(index);
          } else {
              console.error("Erreur : Index de personnage invalide.");
          }
      });
  });
});


  // JavaScript pour ajouter des messages liés au jeu
  function addMessage(message) {
    const gameMessages = document.getElementById('game-messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    gameMessages.appendChild(messageElement);
}

// Exemples d'utilisation de la fonction addMessage
addMessage("Le jeu commence !");
addMessage("Le joueur attaque l'ennemi.");

document.addEventListener('DOMContentLoaded', function() {
  const attackBtn = document.getElementById('attack-btn');
  const specialAttackBtn = document.getElementById('special-attack-btn');
  const attackSound = new Audio('rafale.wav');
  const specialAttackSound = new Audio('le_sang_dvomor.wav');

  const jlo = document.getElementById('character-7');
  const jloSound = new Audio('jlo.wav');

  const start = document.querySelector('start-btn');
  const startSound = new Audio('Viens_la_toi.wav');  

  attackBtn.addEventListener('click', function() {
    // Jouer le son d'attaque classique
    attackSound.currentTime = 0; // Rembobiner l'audio au début
    attackSound.play(); // Lancer la lecture de l'audio
  });

  specialAttackBtn.addEventListener('click', function() {
    // Jouer le son d'attaque spéciale
    specialAttackSound.currentTime = 0; // Rembobiner l'audio au début
    specialAttackSound.play(); // Lancer la lecture de l'audio
  });

  jlo.addEventListener('click', function() {
    // Jouer le son d'attaque classique
    jloSound.currentTime = 0; // Rembobiner l'audio au début
    jloSound.play(); // Lancer la lecture de l'audio
  });

  start.addEventListener('click', function() {
    // Jouer le son d'attaque classique
    console.log("Bouton 'start-btn' cliqué");
    startSound.currentTime = 0; // Rembobiner l'audio au début
    startSound.play(); // Lancer la lecture de l'audio
  });
});

