const story = {
    start: {
        text: "You find yourself at a crossroad. What do you do?",
        choices: [
            { text: "Follow the dirt road", next: "dirtRoad" },
            { text: "Climb the tree", next: "climbTree" },
            { text: "Investigate flickering light", next: "flickerLight" }
        ]
    },
    dirtRoad: {
        text: "You walk down the dirt road and see a village ahead.",
        choices: [
            { text: "Enter the village", next: "village" },
            { text: "Take a hidden path into the forest", next: "darkForest" }
        ]
    },
    village: {
        text: "You step into the village. It seems abandoned, except for an old house and a book lying on the ground.",
        choices: [
            { text: "Go inside the empty house", next: "emptyHouse" },
            { text: "Pick up the book from the side", next: "magicBook" }
        ]
    },
    climbTree: {
        text: "You climb the tree and spot a river and a tall tower.",
        choices: [
            { text: "Follow the river", next: "river" },
            { text: "Go towards the tower", next: "tower" }
        ]
    }
};

const backgrounds = {
    start: "url('images/start.jpg')",
    dirtRoad: "url('images/dirt-road.jpg')",
    climbTree: "url('images/tree.jpg')",
    village: "url('images/village.jpg')",
    flickerLight: "url('images/light.jpg')"
};

function startGame() {
    showStory("start");
}

function showStory(scenario) {
    document.body.style.backgroundImage = backgrounds[scenario] || "url('images/default.jpg')";

    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");

    storyText.innerText = story[scenario].text;
    choicesDiv.innerHTML = "";

    story[scenario].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.classList.add("choice-button");
        button.style.opacity = "0";  // Initially hidden
        button.style.transform = "translateY(15px)"; // Slight movement

        button.onclick = () => showStory(choice.next);
        choicesDiv.appendChild(button);

        // Add fade-in effect with a small delay for each button
        setTimeout(() => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
        }, 200 * index);
    });
}

startGame();
