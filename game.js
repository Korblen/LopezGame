class Game {
    constructor() {
      this.turnLeft = 10;
      // Initialisez ici vos personnages
      this.characters = [
        new Fighter("LOPEZ Joe"),
        new Paladin("HOFFMAN de ces morts"),
        new Monk("DONOVAN le tuberculé"),
        new Berzerker("CERBERUS fend'l'anus"),
        new Assassin("CARL le skin"),
        new Wizard("PROSPERE le purineur"),
        new Thief("HENOCK Cortes"),
      ];
      this.playerCharacter = null; // Ajout pour stocker le personnage du joueur
    }
  
    // Méthode pour choisir un combattant
    chooseCharacter() {
      console.log("Choisissez votre combattant :");
      this.characters.forEach((character, index) => {
        console.log(`${index + 1}. ${character.name} (${character.constructor.name})`);
      });
  
      let choice;
      do {
        choice = prompt("Entrez le numéro de votre combattant :");
        choice = parseInt(choice, 10) - 1;
      } while (isNaN(choice) || choice < 0 || choice >= this.characters.length);
  
      this.playerCharacter = this.characters[choice];
      console.log(`Vous avez choisi ${this.playerCharacter.name}.`);
    }
  
    // Afficher les statistiques des joueurs en jeu
    displayStats() {
      console.log("Statistiques des joueurs en jeu :");
      this.characters.filter(character => character.status === 'playing').forEach(character => {
        console.log(`${character.name} (${character.constructor.name}): HP: ${character.hp}, DMG: ${character.dmg}, MANA: ${character.mana}, STATUS: ${character.status}`);
      });
    }
  
    // Skip turn method
    skipTurn() {
      this.turnLeft -= 1;
      if (this.turnLeft === 0) {
        this.endGame();
      }
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
            character.stealMana(target);
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
  
    // Start game method
    startGame() {
      this.chooseCharacter(); // Permet au joueur de choisir son personnage
      while (this.turnLeft > 0) {
        this.startTurn();
      }
    }
  }
  
  // Step 4: Start the game ################################################################
  const gameInstance = new Game();
  
  document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', function() {
        // Utilisez l'instance de Game pour démarrer le jeu
        gameInstance.startGame();
    });
  });