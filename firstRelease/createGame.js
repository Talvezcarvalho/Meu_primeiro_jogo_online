export default function createGame() {
    const state = {
      players: {},
      fruits: {},
      screen:{  
        width: 10,
        height: 10
      }
    };

    function removePlayer(command) {
      const playerId = command.playerId;
      delete state.players[playerId];
    }

    function addPlayer(command) {
      const playerId = command.playerId;
      const playerX =
        "playerX" in command
          ? command.playerX
          : Math.floor(Math.random() * state.screen.width);
      const playerY =
        "playerY" in command
          ? command.playerY
          : Math.floor(Math.random() * state.screen.height);
      state.players[playerId] = {
        x: playerX,
        y: playerY,
      };
    }
    function addFruit(command) {
      const fruitId = command.fruitId;
      const fruitX =
        "fruitX" in command
          ? command.fruitX
          : Math.floor(Math.random() * state.screen.width);
      const fruitY =
        "fruitY" in command
          ? command.fruitY
          : Math.floor(Math.random() * state.screen.height);

      state.fruits[fruitId] = {
        x: fruitX,
        y: fruitY,
      };
    }

    function removeFruit(command) {
      const fruitId = command.fruitId;
      delete state.fruits[fruitId];
      console.log(`Fruit removed: ${fruitId}`);
    }

    function movePlayer(command) {
      const aceptedMoves = {
        ArrowUp(player) {
          player.y = Math.max(player.y - 1, 0);
        },
        ArrowDown(player) {
          player.y = Math.min(player.y + 1, state.screen.height - 1);
        },
        ArrowLeft(player) {
          player.x = Math.max(player.x - 1, 0);
        },
        ArrowRight(player) {
          player.x = Math.min(player.x + 1, state.screen.width - 1);
        },
      };

      const keyPressed = command.keyPressed;
      const playerId = command.playerId;
      const player = state.players[command.playerId];
      const moveFunctions = aceptedMoves[keyPressed];

      if (player && moveFunctions) {
        moveFunctions(player);
        checkForFruitCollision(playerId);
      }

      function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
          // Certifique-se de declarar `fruitId` com `const`
          const fruit = state.fruits[fruitId];
          console.log(
            `Checking collision between ${playerId} and fruit ${fruitId}`
          );
          if (player.x === fruit.x && player.y === fruit.y) {
            console.log(`COLLISION! Removing fruit ${fruitId}`);
            removeFruit({ fruitId }); // Remove a fruta corretamente
          }
        }
      }
    }
    return {
      addFruit,
      addPlayer,
      removeFruit,
      removePlayer,
      movePlayer,
      state,
    };
  }