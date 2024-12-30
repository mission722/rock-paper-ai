const history = []; // User move history
      const aiChoices = ["rock", "paper", "scissors"]; // Possible AI moves
      const pred = []; // Predicted moves
      let us = 0; // User score
      let cs = 0; // Computer score

      // Main function to handle user's move
      function addMove(userMove) {
        updateHistory(userMove);
        if (history.length >= 6) {
          predictNextMove(userMove);
        } else {
          predictRandomMove(userMove);
        }
      }

      // Update history with the user's move and keep it limited to 10 moves
      function updateHistory(userMove) {
        history.push(userMove);
        if (history.length > 10) {
          history.shift(); // Remove the first element if the history exceeds 10
        }
      }

      // Function to predict the next move based on user history
      function predictNextMove(userMove) {
        let predictedMove = getPredictedMove();
        let newMove = predictAIResponse(predictedMove);
        determineWinner(userMove, newMove);
      }

      // Function to generate a random AI move if no pattern is found
      function predictRandomMove(userMove) {
        let newMove = aiChoices[Math.floor(Math.random() * 3)];
        determineWinner(userMove, newMove);
        document.getElementById(
          "winner"
        ).innerText = `AI is making a random move: ${newMove}`;
      }

      // Get predicted move based on repeating patterns from history
      function getPredictedMove() {
        let predictedMove = null;
        for (let i = 0; i < history.length - 3; i++) {
          const currentPattern = history.slice(i, i + 3).join("-");
          const lastPattern = history.slice(history.length - 3).join("-");
          if (currentPattern === lastPattern) {
            predictedMove = history[i + 3] || null;
            break;
          }
        }
        if (!predictedMove) {
          predictedMove = aiChoices[Math.floor(Math.random() * 3)];
        }
        return predictedMove;
      }

      // Predict AI's response based on the last predicted move
      function predictAIResponse(predictedMove) {
        pred.push(predictedMove);
        let newMove;

        if (pred.length > 1) {
          let predC = pred[pred.length - 2];
          if (predC === "rock") {
            newMove = "paper";
          } else if (predC === "paper") {
            newMove = "scissors";
          } else {
            newMove = "rock";
          }
        } else {
          newMove = aiChoices[Math.floor(Math.random() * 3)];
        }
        return newMove;
      }

      // Function to determine the winner based on the user's and AI's moves
      function determineWinner(userMove, newMove) {
        let result;
        if (
          (userMove === "rock" && newMove === "paper") ||
          (userMove === "paper" && newMove === "scissors") ||
          (userMove === "scissors" && newMove === "rock")
        ) {
          result = `Computer wins! ${newMove} beats ${userMove}`;
          cs++;
        } else if (userMove === newMove) {
          result = `It's a draw! ${userMove} and ${newMove} are the same.`;
        } else {
          result = `You win! ${userMove} beats ${newMove}`;
          us++;
        }
        updateScore(result, userMove, newMove);
      }

      // Function to update the score and display result
      function updateScore(result, userMove, newMove) {
        document.getElementById("user").innerText = `You: ${userMove}`;
        document.getElementById("comp").innerText = `Ai: ${newMove}`;
        document.getElementById("winner").innerText = `Winner: ${result}`;
        document.getElementById("score").innerText = `${us} - ${cs}`;
      }