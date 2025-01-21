export default function createKeyboardListener(document) {
    const state = {
      observers: [],
    };

    function subscribe(observerFunction) {
      state.observers.push(observerFunction);
    }

    function notifyAll(comand) {
      console.log(`Notifying ${state.observers.length} observers`);
      for (const observerFunction of state.observers) {
        observerFunction(comand);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event) {
      const keyPressed = event.key;

      const comand = {
        playerId: "player1",
        keyPressed,
      };

      notifyAll(comand);
    }
    return { subscribe };
  }
