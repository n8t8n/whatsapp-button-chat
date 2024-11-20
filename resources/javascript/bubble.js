// bubbleMessage.js
function createBubbleMessage(data) {
    const bubbleMsg = document.createElement("span");
    bubbleMsg.style.position = "fixed";
    bubbleMsg.style.bottom = data.options.bubbleMsg.bottom;
    bubbleMsg.style.background =
      "linear-gradient(37deg, rgb(255 0 233 / 5%) 0%, rgba(37, 129, 255, 0.05) 25%, rgba(255, 42, 134, 0.05) 50%, rgba(216, 18, 171, 0.05) 75%, rgba(244, 71, 255, 0.05) 100%), linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))";
    bubbleMsg.style.color = data.options.bubbleMsg.color; // Original text color
    bubbleMsg.style.padding = "3px 9px";
    bubbleMsg.style.borderRadius = "24px";
    bubbleMsg.style.marginBottom = "5px";
    bubbleMsg.style.right = data.options.bubbleMsg.right;
    bubbleMsg.style.left = data.options.bubbleMsg.left;
    bubbleMsg.style.fontSize = "13px";
    bubbleMsg.style.inlineSize = "max-content";
    bubbleMsg.style.boxShadow = "0px 0px 2px #00000029";
    bubbleMsg.style.fontFamily = "system-ui";
    bubbleMsg.style.zIndex = "889";
  
    // Store the original background, padding, and text color
    const originalBackground = bubbleMsg.style.background;
    const originalPadding = bubbleMsg.style.padding;
    const originalColor = bubbleMsg.style.color;  
  
    // Ensure event listener is not added multiple times
    bubbleMsg.addEventListener("click", () => {
      if (bubbleMsg.textContent === "1") {
        // Reset to original styles and show "2" on click of "1"
        bubbleMsg.style.background = originalBackground;
        bubbleMsg.style.padding = originalPadding;
        bubbleMsg.textContent = "2";
        bubbleMsg.style.color = originalColor;  
  
        // Restart the typing function after showing "2"
        typeText(
          bubbleMsg,
          data.options.bubbleMsg.textContent.split(","),
          data.options.bubbleMsg.typingSpeed || 30,
          data
        );
      } else if (bubbleMsg.textContent === "") {
        typingText = "";
        typeText(
          bubbleMsg,
          data.options.bubbleMsg.textContent.split(","),
          data.options.bubbleMsg.typingSpeed || 30,
          data
        );
  
        // Reset bubble style after click
        bubbleMsg.style.background = originalBackground;  
        bubbleMsg.style.padding = originalPadding;        
        bubbleMsg.style.color = originalColor;      
      }
    });
  
    return bubbleMsg;
  }
  
  // Function to handle typing text in the bubble message
  function typeText(bubbleMsg, words, typingSpeed, data) {
    if (!words || words.length === 0) {
      console.error("No words to type.");
      return; // Exit if there are no words
    }
  
    let typingText = "";
    let currentWordIndex = 0;
    let currentLetterIndex = 0;
  
    // Store the original background, padding, and text color
    const originalBackground = bubbleMsg.style.background;
    const originalPadding = bubbleMsg.style.padding;
    const originalColor = bubbleMsg.style.color; // Save original text color
  
    function type() {
      if (currentLetterIndex < words[currentWordIndex].length) {
        typingText += words[currentWordIndex][currentLetterIndex];
        bubbleMsg.textContent = typingText;
        currentLetterIndex++;
        setTimeout(type, typingSpeed);
      } else {
        currentLetterIndex = 0;
        currentWordIndex++;
        if (currentWordIndex >= words.length) {
          currentWordIndex = 0;
          setTimeout(() => {
            bubbleMsg.style.transition = "opacity 0.1s ease";
            bubbleMsg.style.opacity = "0";
            setTimeout(() => {
              bubbleMsg.textContent = "";
              bubbleMsg.style.display = "block";
              bubbleMsg.style.cursor = "pointer";
              bubbleMsg.style.background = "red"; 
              bubbleMsg.style.padding = "5px 9px";    
              bubbleMsg.textContent = "1";
              bubbleMsg.style.setProperty("color", "white"); // Change color to white
              bubbleMsg.style.lineHeight = "normal";
              bubbleMsg.style.transition = "opacity 0.1s ease";
              bubbleMsg.style.opacity = "1";
            }, 500);
          }, 1800);
        } else {
          setTimeout(() => {
            bubbleMsg.style.transition = "opacity 0.1s ease";
            bubbleMsg.style.opacity = "0";
            setTimeout(() => {
              bubbleMsg.style.display = "none";
              setTimeout(() => {
                typingText = "";
                bubbleMsg.style.display = "block";
                bubbleMsg.style.transition = "opacity 0.1s ease";
                bubbleMsg.style.opacity = "0";
  
                setTimeout(() => {
                  bubbleMsg.style.opacity = "1";
                  type();
                }, 8);
              }, data.options.bubbleMsg.waitAfterFinishTyping);
            }, 80);
          }, 1800);
        }
      }
    }
  
    type();
  }
  