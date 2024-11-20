fetch("resources/javascript/bubble.js")
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error("Network response was not ok " + response.statusText);
    }
  })
  .then((data) => {
     const script = document.createElement("script");
    script.textContent = data;
    document.head.appendChild(script);
  })

  fetch("resources/css/styles.css")
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error("Network response was not ok " + response.statusText);
    }
  })
  .then((data) => {
     const style = document.createElement("style");
    style.textContent = data;
    document.head.appendChild(style);
  })
  
setTimeout(() => {
  fetch("resources/data.json")
    .then((response) => response.json())
    .then((data) => {
      const options = data.options;
      const displayNames = data.displayNames;

    const widget = document.createElement("div");
    widget.id = data.options.widgetProps.id;
    // Style for the widget
    widget.style.width = data.options.widgetProps.width;
    widget.style.height = data.options.widgetProps.height;
    widget.style.position = data.options.widgetProps.position;
    widget.style.top = data.options.widgetProps.top;
    widget.style.left = data.options.widgetProps.left;
    widget.style.bottom = data.options.widgetProps.bottom;
    widget.style.right = data.options.widgetProps.right;
    widget.style.cursor = "pointer";
    widget.style.zIndex = "888";
    widget.style.borderRadius = "50%";
    widget.style.transform = "translate(-20%, -20%)";
    widget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    widget.style.fontFamily = data.options.widgetProps.fontFamily;

    // Create bubble message
    const bubbleMsg = createBubbleMessage(data);
    document.body.appendChild(bubbleMsg);

    const textContent = data.options.bubbleMsg.textContent;
    const typingSpeed = 30; // Adjust typing speed in milliseconds for smoother transition

    const words = textContent.split(",");
    typeText(bubbleMsg, words, typingSpeed, data); // Call the typing function

    const defaultSvg = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#12d23d;} .st1{fill:#12d23d;} .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#ffffff;} </style> <path class="st0" d="M30,59.5c16.3,0,29.5-13.2,29.5-29.5S46.3,0.5,30,0.5S0.5,13.7,0.5,30S13.7,59.5,30,59.5"/> <path class="st1" d="M30,59.5C13.8,59.5,0.5,46.2,0.5,30S13.8,0.5,30,0.5S59.5,13.8,59.5,30S46.2,59.5,30,59.5 M30,2.3 C14.7,2.3,2.3,14.7,2.3,30S14.7,57.7,30,57.7S57.7,45.3,57.7,30S45.3,2.3,30,2.3"/> <path class="st2" d="M55.2,30c0,13.9-11.3,25.2-25.2,25.2S4.9,43.9,4.9,30S16.2,4.9,30.1,4.9S55.2,16.1,55.2,30 M45,36.6 c-0.2-0.4-0.7-0.5-1.5-0.9c-0.7-0.4-4.2-2-4.9-2.2s-1.1-0.4-1.6,0.4c-0.5,0.7-1.8,2.4-2.2,2.7c-0.4,0.5-0.9,0.5-1.6,0.2 c-0.7-0.4-3.1-1.1-5.9-3.5c-2.2-1.8-3.7-4.2-4-4.9c-0.4-0.7,0-1.1,0.4-1.5s0.7-0.9,1.1-1.3s0.5-0.7,0.7-1.3c0.2-0.5,0.2-0.9,0-1.3 s-1.6-3.8-2.2-5.3c-0.5-1.5-1.3-1.3-1.6-1.3h-1.5c-0.5,0-1.3,0.2-1.8,0.9c-0.7,0.7-2.6,2.4-2.6,6c0,3.5,2.6,7,2.9,7.3 c0.4,0.5,4.9,7.9,12.3,10.8s7.3,1.8,8.6,1.8c1.3-0.2,4.2-1.6,4.9-3.5C45.2,38.3,45.2,37,45,36.6 M59.6,30 c0,16.4-13.2,29.6-29.6,29.6S0.5,46.4,0.5,30S13.7,0.5,30.1,0.5S59.6,13.7,59.6,30"/> </svg>`;

    if (options.widgetImageUrl) {
      const img = document.createElement("img");
      img.src = options.widgetImageUrl;
      // Style for the widget image
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      widget.appendChild(img);
    } else {
      const div = document.createElement("div");
      div.innerHTML = defaultSvg;
      widget.appendChild(div);
    }

    document.body.appendChild(widget);

    const overlay = document.createElement("div");
    // Style for the overlay
    overlay.style.display = "none";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
    overlay.style.fontFamily = "system-ui";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    // Style for the modal
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.minWidth = "320px";
    modal.style.backgroundColor = options.modalBackgroundColor;
    modal.style.borderRadius = "16px";
    modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    modal.style.setProperty("padding", "15px", "important");
    modal.style.zIndex = "1000";
    modal.style.maxHeight = "90%";
    modal.style.overflowY = "auto";
    modal.style.color = "#060710";
    modal.style.fontFamily = "system-ui";
    modal.style.cursor = "move";
    modal.style.userSelect = "none";
    modal.style.setProperty("border", ".8px solid");
    modal.style.setProperty("border-color", "#00000099", "important");
    document.body.appendChild(modal);

    let isDragging = false;
    let offsetX, offsetY;

    modal.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - modal.offsetLeft;
      offsetY = e.clientY - modal.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        modal.style.left = e.clientX - offsetX + "px";
        modal.style.top = e.clientY - offsetY + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });


    

    const labelContainer = document.createElement("div");
    labelContainer.style.display = "flex";
    labelContainer.style.justifyContent = "space-between";
    labelContainer.style.alignItems = "center";
    labelContainer.style.marginBottom = "10px";
    labelContainer.style.flexWrap = "wrap";
    labelContainer.style.gap = "10px";
    const label = document.createElement("h5");
    // Style for the modal label
    label.textContent = options.text.textTitleH5;
    label.style.fontWeight = "bold";
    label.style.fontSize = "20px";
    label.style.color = options.buttonColor;
    label.style.margin = "0px";
    label.style.fontFamily = "system-ui";
    labelContainer.appendChild(label);
    const button = document.createElement("a");
    button.href = options.text.textUrlTopButton;
    button.target = "_blank";
    button.alt = "Open in new tab";
    button.style.display = "inline-block";

    button.innerHTML =
      '<svg width="20" height="20"  fill="#84848e" viewBox="0 0 0.4 0.4" xmlns="http://www.w3.org/2000/svg"><path  fill-rule="evenodd" d="M0.125 0.05a0.025 0.025 0 0 1 0 0.05H0.1v0.2h0.2v-0.025a0.025 0.025 0 1 1 0.05 0v0.025a0.05 0.05 0 0 1 -0.05 0.05H0.1a0.05 0.05 0 0 1 -0.05 -0.05V0.1a0.05 0.05 0 0 1 0.05 -0.05zm0.25 -0.025v0.125a0.025 0.025 0 1 1 -0.05 0V0.11L0.218 0.217a0.025 0.025 0 1 1 -0.035 -0.035L0.29 0.075h-0.04a0.025 0.025 0 0 1 0 -0.05z"/></svg>';
    labelContainer.appendChild(button);
    modal.appendChild(labelContainer);

    const profileDisplayContainer = document.createElement("div");
    // Style for the profile display container
    profileDisplayContainer.style.gap = "10px";
    profileDisplayContainer.style.display = "flex";
    profileDisplayContainer.style.alignItems = "center";
    profileDisplayContainer.style.fontFamily = "system-ui";
    profileDisplayContainer.style.borderRadius = "30px";
    profileDisplayContainer.style.marginLeft = "auto";
    profileDisplayContainer.style.marginBottom = "10px";
    profileDisplayContainer.style.opacity = "1";
    modal.appendChild(profileDisplayContainer);

    const profileContainer = document.createElement("div");
    // Style for the profile container
    profileContainer.style.marginTop = "8px";
    profileContainer.style.marginBottom = "8px";
    profileContainer.style.display = "flex";
    profileContainer.style.flexDirection = "column";
    profileContainer.style.gap = "8px";
    profileContainer.style.fontFamily = "system-ui";
    modal.appendChild(profileContainer);

    const selectTeam = document.createElement("select");
    Object.keys(options.team).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent =
        displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1); // Use display name
      selectTeam.appendChild(option);
    });
    

    // Style for the team select
    selectTeam.style.backgroundColor = "#f6f6f6";
    selectTeam.style.padding = "8px";
    selectTeam.style.border = "none";
    selectTeam.style.outline = "none";
    selectTeam.style.boxShadow = "0 0 0 2px transparent";
    selectTeam.style.borderRadius = "8px";
    selectTeam.style.width = "100%";
    selectTeam.style.fontFamily = "system-ui";
    selectTeam.style.fontSize = "16px";
    selectTeam.style.setProperty("color", options.textColor, "important");

    selectTeam.addEventListener("focus", () => {
      selectTeam.style.boxShadow = "0 0 0 2px #ededed";
    });
    selectTeam.addEventListener("blur", () => {
      selectTeam.style.boxShadow = "0 0 0 2px transparent";
    });
    profileContainer.appendChild(selectTeam);

    const textarea = document.createElement("textarea");
    // Style for the textarea
    textarea.style.backgroundColor = "#f6f6f6";
    textarea.style.padding = "8px";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "0 0 0 2px transparent";
    textarea.style.borderRadius = "8px";
    textarea.addEventListener("focus", () => {
      textarea.style.boxShadow = "0 0 0 2px #ededed";
    });
    textarea.addEventListener("blur", () => {
      textarea.style.boxShadow = "0 0 0 2px transparent";
    });
    textarea.placeholder = "Ingresa tu mensaje...";
    textarea.style.width = "auto";
    textarea.style.height = "150px";
    textarea.style.fontFamily = "system-ui";
    textarea.style.fontSize = "16px";
    textarea.style.setProperty("color", options.textColor, "important");
    profileContainer.appendChild(textarea);

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Ingresar email para enviar...";
    emailInput.style.backgroundColor = "#f6f6f6";
    emailInput.style.padding = "8px";
    emailInput.style.border = "none";
    emailInput.style.outline = "none";
    emailInput.style.boxShadow = "0 0 0 2px transparent";
    emailInput.style.borderRadius = "8px";
    emailInput.style.fontFamily = "system-ui";
    emailInput.style.fontSize = "16px";
    emailInput.style.setProperty("color", options.textColor, "important");
    emailInput.addEventListener("focus", () => {
      emailInput.style.boxShadow = "0 0 0 2px #ededed";
    });
    emailInput.addEventListener("blur", () => {
      emailInput.style.boxShadow = "0 0 0 2px transparent";
    });
    // Initially hide the email input
    emailInput.style.display = "none";
    profileContainer.appendChild(emailInput);

    const selectAgent = document.createElement("select");
    // Style for the agent select
    selectAgent.style.backgroundColor = "#f6f6f6";
    selectAgent.style.padding = "8px";
    selectAgent.style.border = "none";
    selectAgent.style.outline = "none";
    selectAgent.style.boxShadow = "0 0 0 2px transparent";
    selectAgent.style.borderRadius = "8px";
    selectAgent.style.width = "100%";
    selectAgent.style.fontFamily = "system-ui";
    selectAgent.style.fontSize = "16px";
    selectAgent.style.setProperty("color", options.textColor, "important");
    selectAgent.addEventListener("focus", () => {
      selectAgent.style.boxShadow = "0 0 0 2px #ededed";
    });
    selectAgent.addEventListener("blur", () => {
      selectAgent.style.boxShadow = "0 0 0 2px transparent";
    });
    selectAgent.addEventListener("change", () => {
      updateProfileDisplay();
    });
    profileContainer.appendChild(selectAgent);

    const checkboxContainer = document.createElement("div");
    // Style for the checkbox container
    checkboxContainer.style.display = "flex";
    checkboxContainer.style.gap = "10px";
    checkboxContainer.style.marginLeft = "auto";
    checkboxContainer.style.marginRight = "auto";
    checkboxContainer.style.marginTop = "10px";
    checkboxContainer.style.marginBottom = "10px";
    checkboxContainer.style.fontFamily = "system-ui";
    checkboxContainer.style.flexDirection = "row-reverse";
    checkboxContainer.style.lineHeight = "normal"; // Add line height normal
    profileContainer.appendChild(checkboxContainer);

    const whatsappCheckbox = document.createElement("input");
    whatsappCheckbox.type = "checkbox";
    whatsappCheckbox.id = "whatsapp";
    whatsappCheckbox.checked = true; // Set default checked
    const whatsappLabel = document.createElement("label");
    whatsappLabel.htmlFor = "whatsapp";
    whatsappLabel.textContent = options.text.textLabelWa;
    whatsappLabel.style.fontFamily = "system-ui";

    const formspreeCheckbox = document.createElement("input");
    formspreeCheckbox.type = "checkbox";
    formspreeCheckbox.id = "formspree";
    formspreeCheckbox.checked = false;
    const formspreeLabel = document.createElement("label");
    formspreeLabel.htmlFor = "formspree";
    formspreeLabel.textContent = options.text.textLabelForm;
    formspreeLabel.style.fontFamily = "system-ui";

    checkboxContainer.appendChild(whatsappCheckbox);
    checkboxContainer.appendChild(whatsappLabel);
    checkboxContainer.appendChild(formspreeCheckbox);
    checkboxContainer.appendChild(formspreeLabel);

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.textContent = options.text.TextSubmitButton;
    // Style for the submit button
    submitButton.style.border = "none";
    submitButton.style.width = "100%";
    submitButton.style.setProperty("padding", "14px", "important");
    submitButton.style.fontSize = "17px";
    submitButton.style.backgroundColor = options.buttonColor;
    submitButton.style.color = "white";
    submitButton.style.setProperty("border-radius", "8px", "important");
    submitButton.style.cursor = "pointer";
    submitButton.style.fontFamily = "system-ui";
    submitButton.style.boxShadow = "inset 0px 0px 5px #00000061";
    submitButton.disabled = true;
    submitButton.style.opacity = 0.4;
    submitButton.style.lineHeight = "normal";
    submitButton.innerHTML =
      options.text.TextSubmitButton +
      ' <svg width="18" height="18" style="vertical-align:middle" viewBox="0 0 0.5 0.5" xmlns="http://www.w3.org/2000/svg"><path d="M0.25 0c0.138 0 0.25 0.112 0.25 0.25s-0.112 0.25 -0.25 0.25S0 0.388 0 0.25 0.112 0 0.25 0m0.025 0.21 0.032 0.032a0.025 0.025 0 1 0 0.035 -0.035l-0.075 -0.075a0.025 0.025 0 0 0 -0.035 0l-0.075 0.075a0.025 0.025 0 0 0 0.035 0.035L0.225 0.21V0.35a0.025 0.025 0 1 0 0.05 0z" fill="white"/></svg> ';
    modal.appendChild(submitButton);

    // Create a new stylesheet element
    const style = document.createElement("style");
    // Set the text content of the stylesheet
    style.textContent = `
     .submit-button {
         padding: 14px!important;
         width: 100%;
         font-size: 16px;
         background: ${options.buttonColor}; 
         color: white;
         cursor: pointer;
         font-family: system-ui;
     }
     .submit-button:hover {
         background-color: #4a4a51;
     }
     select {
         background-color: #f6f6f6;
         border: 1px solid #ededed;
         border-radius: 8px;
         padding: 8px;
         width: 100%;
         font-family: system-ui;
         font-size: 16px; 
     }
     select:focus {
         outline: none;
         border: 1px solid #060710;
         box-shadow: 0 0 0 2px #ededed;
     }
 input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 40px; /* Reduced width */
    height: 20px; /* Reduced height */
    background-color: #ccc;
    border-radius: 30px; /* Slightly larger border-radius */
    position: relative;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

 input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 1px; /* Adjusted top position */
    left: 1px; /* Adjusted left position */
    width: 18px; /* Smaller knob */
    height: 18px; /* Smaller knob */
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
}

 input[type="checkbox"]:checked {
    background-color: ${options.buttonColor}!important;
}

input[type="checkbox"]:checked::before {
    transform: translateX(20px);  
}

 label {
    font-family: system-ui;
    color: #84848e!important;
    cursor: pointer;
}

`;

    // Append the stylesheet to the head of the document
    document.head.appendChild(style);

    let isModalOpen = false;
    const updateAgents = () => {
      const selectedTeam = selectTeam.value;
      selectAgent.innerHTML = ""; // Clear previous options

      // Add the "Cualquier Miembore del equipo"
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "Miembro del equipo";
      selectAgent.appendChild(emptyOption);

      // Dynamically access the team based on the selected value
      const teamKey = options.team[selectedTeam];
      if (teamKey) {
        teamKey.agents.forEach((agent) => {
          const option = document.createElement("option");
          option.value = agent.whatsapp.number;
          option.textContent = agent.name;
          selectAgent.appendChild(option);
        });
      }
      // Default to select "Cualquier Agente" (empty option)
      selectAgent.selectedIndex = 0; // Set the first option (empty option) as default
      updateProfileDisplay();
    };

    const updateProfileDisplay = () => {
      profileDisplayContainer.innerHTML = ""; // Clear previous profile display

      const selectedKey = selectTeam.value; // Get the currently selected team
      let selectedAgentNumber = selectAgent.value; // Get the selected agent's WhatsApp number

      // If the empty option is selected, do not show profile image or response text
      if (selectedAgentNumber === "") {
        return; // Exit early to not display the profile image
      }

      // Dynamically access the team based on the selected value
      const teamKey = options.team[selectedKey];
      if (teamKey) {
        // If a specific agent is selected, find the agent by WhatsApp number
        const whatsappOption = teamKey.agents.find(
          (agent) => agent.whatsapp.number === selectedAgentNumber
        );

        // Check if WhatsApp checkbox is checked and if agent exists
        if (whatsappCheckbox.checked && whatsappOption) {
          const profileImg = document.createElement("img");
          profileImg.src =
            whatsappOption.whatsapp.profileImage ||
            "resources/media/whatsapp.png";
          // Style for the profile image
          profileImg.style.width = "45px";
          profileImg.style.height = "45px";
          profileImg.style.borderRadius = "50%";
          profileImg.style.marginRight = "0px";
          profileImg.style.transition = "opacity 0.28s ease-in-out";
          profileImg.style.opacity = "0";
          profileDisplayContainer.appendChild(profileImg);

          // Create response time text
          const responseTimeTextDiv = document.createElement("div");
          responseTimeTextDiv.style.display = "flex";
          responseTimeTextDiv.style.flexDirection = "column";
          responseTimeTextDiv.style.gap = "2px";
          responseTimeTextDiv.style.setProperty(
            "justify-content",
            "center",
            "important"
          );
          responseTimeTextDiv.style.transition = "opacity 0.28s ease-in-out";
          responseTimeTextDiv.style.opacity = "0";

          const responseTimeText1 = document.createElement("span");
          responseTimeText1.innerHTML = `` + whatsappOption.name; // Display selected agent's name
          const responseTimeText2 = document.createElement("span");
          responseTimeText2.textContent = "Disponible";
          responseTimeText1.style.setProperty(
            "line-height",
            "20px",
            "important"
          );
          responseTimeText2.style.color = "white";
          responseTimeText2.style.fontSize = "10px";
          responseTimeText2.style.background = "black";
          responseTimeText2.style.padding = "0px 5px";
          responseTimeText2.style.borderRadius = "4px";
          responseTimeText2.style.width = "max-content";
          responseTimeText2.style.setProperty(
            "line-height",
            "16px",
            "important"
          );
          responseTimeText1.style.transition = "opacity 0.28s ease-in-out";
          responseTimeText1.style.opacity = "0";
          responseTimeText2.style.transition = "opacity 0.28s ease-in-out";
          responseTimeText2.style.opacity = "0";
          responseTimeTextDiv.appendChild(responseTimeText1);
          responseTimeTextDiv.appendChild(responseTimeText2);
          profileDisplayContainer.appendChild(responseTimeTextDiv);

          // Fade in the elements after a short delay
          setTimeout(() => {
            profileImg.style.opacity = "1";
            responseTimeTextDiv.style.opacity = "1";
            responseTimeText1.style.opacity = "1";
            responseTimeText2.style.opacity = "1";
          }, 100);
        }

        // Handle Formspree checkbox
        if (formspreeCheckbox.checked) {
          const formspreeOption = teamKey.formspree;
          const profileImg = document.createElement("img");
          // Fade in the elements after a short delay
          setTimeout(() => {
            profileImg.style.opacity = "1";
          }, 100);
        }

        // Hide or show agent select based on checkbox selection
        selectAgent.style.display = formspreeCheckbox.checked
          ? "none"
          : "block";
      }
    };

    // Check the state of the formspree checkbox on load
    if (formspreeCheckbox.checked) {
      selectAgent.style.display = "none";
    }

    selectTeam.onchange = () => {
      updateAgents();
    };

    selectAgent.onchange = () => {
      updateProfileDisplay();
    };

    whatsappCheckbox.onchange = () => {
      if (whatsappCheckbox.checked) {
        formspreeCheckbox.checked = false;
        selectAgent.style.display = "block";
        emailInput.style.display = "none";
      } else {
        formspreeCheckbox.checked = true;
        selectAgent.style.display = "none";
        emailInput.style.display = "block";
      }
      updateProfileDisplay();
    };

    formspreeCheckbox.onchange = () => {
      if (formspreeCheckbox.checked) {
        whatsappCheckbox.checked = false;
        selectAgent.style.display = "none";
        emailInput.style.display = "block";
      } else {
        whatsappCheckbox.checked = true;
        selectAgent.style.display = "block";
        emailInput.style.display = "none";
      }
      updateProfileDisplay();
    };

    widget.onclick = (event) => {
      event.stopPropagation();
      modal.style.display = "block";
      overlay.style.display = "block";
      isModalOpen = true;
      widget.style.transition = "transform 0.2s ease-in-out";
      modal.style.transition =
        "transform 0.2s ease-in-out, opacity 0.2s ease-in-out";
      widget.style.transform = "translate(-20%, -20%) scale(.9)";
      modal.style.transform = "translate(-50%, -50%) scale(.89)";
      modal.style.opacity = 0;
      setTimeout(() => {
        widget.style.transform = "translate(-20%, -20%) scale(1)";
        modal.style.transform = "translate(-50%, -50%) scale(1)";
        modal.style.opacity = 1;
      }, 100);
    };

    overlay.onclick = (event) => {
      event.stopPropagation();
      modal.style.display = "none";
      overlay.style.display = "none";
      isModalOpen = false;

      // Reset form values and select a random agent
      selectTeam.selectedIndex = 0;
      updateAgents();
      selectAgent.selectedIndex = 0;
      textarea.value = "";
      emailInput.value = "";
      whatsappCheckbox.checked = true;
      formspreeCheckbox.checked = false;
      selectAgent.style.display = "block";
      emailInput.style.display = "none";
      validateForm();
    };

    const validateForm = () => {
      if (whatsappCheckbox.checked) {
        if (textarea.value.trim().length >= 30) {
          submitButton.disabled = false;
          submitButton.style.opacity = 1;
          submitButton.style.boxShadow = "none";
          submitButton.textContent = options.text.TextSubmitButton;
        } else {
          submitButton.disabled = true;
          submitButton.style.opacity = 0.8;
          submitButton.textContent = `Faltan ${
            30 - textarea.value.trim().length
          } caracteres`;
        }
      } else if (formspreeCheckbox.checked) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          textarea.value.trim().length >= 30 &&
          emailRegex.test(emailInput.value)
        ) {
          submitButton.disabled = false;
          submitButton.style.opacity = 1;
          submitButton.textContent = options.text.TextSubmitButton;
        } else {
          submitButton.disabled = true;
          submitButton.style.opacity = 0.8;
          submitButton.textContent = `Faltan ${
            30 - textarea.value.trim().length
          } caracteres`;
        }
      }
    };

    textarea.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);

    submitButton.onclick = () => {
      const selectedKey = selectTeam.value;
      let message = textarea.value;
      const formattedMessage = message.replace(/\n/g, " ");
      const encodedMessage = encodeURIComponent(formattedMessage);

      let selectedAgentNumber = selectAgent.value;

      // If the empty option is selected, pick a random agent
      if (selectedAgentNumber === "") {
        const agents = options.team[selectedKey].agents;
        const randomAgentIndex = Math.floor(Math.random() * agents.length);
        selectedAgentNumber = agents[randomAgentIndex].whatsapp.number;
      }

      if (whatsappCheckbox.checked && !formspreeCheckbox.checked) {
        window.open(
          `https://wa.me/${selectedAgentNumber}?text=${encodedMessage}`
        );
      } else if (formspreeCheckbox.checked && !whatsappCheckbox.checked) {
        const formspreeUrl = options.team[selectedKey].formspree.url;
        const form = document.createElement("form");
        form.action = formspreeUrl;
        form.method = "POST";
        form.appendChild(
          Object.assign(document.createElement("input"), {
            type: "hidden",
            name: "message",
            value: message,
          })
        );
        form.appendChild(
          Object.assign(document.createElement("input"), {
            type: "hidden",
            name: "email",
            value: emailInput.value,
          })
        );
        document.body.appendChild(form);
        form.submit();
      }
      modal.style.display = "none";
      overlay.style.display = "none";
    };

    // Initialize the agent list on page load
    updateAgents();
  })
  .catch((error) => console.error("Error loading data:", error));
}, 888); // Delay of 1000 milliseconds (1 second)
