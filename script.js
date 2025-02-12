document.getElementById("start-game-btn").addEventListener("click", function() {
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    startGame();
});


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
    darkForest: {
        text: "You take the hidden path and enter a dark, dense forest. In the distance, you see an old wooden door standing alone. As you approach, a black bear appears, blocking your path!",
        choices: [
            { text: "Climb the nearby tree", next: "climbTreeBear" },
            { text: "Try to fight the bear", next: "fightBear" }
        ]
    },
    
    village: {
        text: "You step into the village. It seems abandoned, except for an old house and a book lying on the ground.",
        choices: [
            { text: "Go inside the empty house", next: "emptyHouse" },
            { text: "Pick up the book from the side", next: "magicBook" }
        ]
    },
    emptyHouse: {
        text: `You step inside the abandoned house. The air is cold, and the wooden floor creaks with every step. 
               Suddenly, the door slams shut behind you, locking you in!  
               A ghostly figure emerges from the shadows, standing beside an old, cracked mirror.  
               It whispers in a chilling voice:  
    
               <br><br>
               <strong>"I make two people out of one. What am I?"</strong>`,
        choices: [
            { text: "A Mirror", next: "escape" },  // Correct Answer
            { text: "A Shadow", next: "lost" }  
        ]
    },
    magicBook: {
        text: `<div style="line-height: 1.0;">
            You pick up the ancient book. As soon as you open it, glowing text appears on the pages. A deep voice echoes in your mind:<br>
            "I have cities, but no houses.<br>
            I have mountains, but no trees.<br>
            I have water, but no fish.<br>
            What am I?"
        </div>`,
        choices: [
            { text: "A Desert", next: "lost" },
            { text: "A Map", next: "escape" },  // ✅ Correct Answer
            { text: "A Dream", next: "lost" },
            { text: "A Painting", next: "lost" }
        ]
    },
    


    climbTree: {
        text: "You climb the tree and spot a river and a tall tower.",
        choices: [
            { text: "Follow the river", next: "river" },
            { text: "Go towards the tower", next: "tower" }
        ]
    },

    river: {
        text: "You reach the river. A small boat is tied to the shore with no row, and a shadow whispers from the water.",
        choices: [
            { text: "Take the boat", next: "boatRide" },
            { text: "Listen to the shadow and walk over the river", next: "death" } // Redirects to death.html
        ]
    },

    tower: {
        text: `<div style="line-height: 1.0;">
               As you enter the towering structure, a strange energy surrounds you.  
               Suddenly, the world shifts—you find yourself in a mysterious dimension!  
               The walls are covered with ancient images:  
               A locked treasure chest 🏴‍☠️
               A burning candle 🕯️
               A shadowy figure with glowing eyes 👀 
               
               A voice echoes in your mind:  
               
               <strong>"What is the hidden link between them all?"</strong>`,
        choices: [
            { text: "A Curse", next: "escape" },  // Correct Answer (Leads to Escape)
            { text: "A Secret", next: "lost" },  
            { text: "An Escape", next: "lost" }  
        ]
    },

    flickerLight: {
        text: "You follow the flickering light and reach a clearing. A lantern hangs from an old tree, swaying in the wind. Beside it, a small wooden box rests on the ground.You open the box. Inside, you find another, slightly larger box and a folded note resting beside it. Which one do you choose?",
        choices: [
            { text: "Open the second box", next: "magicBook" },
            { text: "Take the note and read it", next: "emptyHouse" }
        ]
    }
    
};

const backgrounds = {
    start: "url('images/start.jpg')",
    dirtRoad: "url('images/dirt-road.jpg')",
    climbTree: "url('images/tree.jpg')",
    village: "url('images/village.jpg')",
    river: "url('images/boat.jpg')",
    flickerLight: "url('images/light.jpg')",
    magicBook:"url('images/book.jpg')",
    emptyHouse:"url('images/emptyhouse.jpg')",
    darkForest:"url('images/door.jpg')",
    escape:"url('images/exit.jpg')",
    tower:"url('images/riddle.jpg')"
};

document.body.classList.add("background-body");

// Function to change background dynamically
function changeBackground(scenario) {
    const imageUrl = backgrounds[scenario] || "images/default.jpg";
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Start the game with the correct background
function startGame() {
    changeBackground("start");
    showStory("start");
}



function showStory(scenario) {
    if (!story[scenario]) {
        console.error("Invalid scenario:", scenario);
        return;
    }

    changeBackground(scenario);

    document.body.style.backgroundImage = backgrounds[scenario] || "url('images/default.jpg')";
    
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");

    storyText.innerHTML = story[scenario].text;
    choicesDiv.innerHTML = "";

    story[scenario].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.classList.add("choice-button");
        button.style.opacity = "0";  
        button.style.transform = "translateY(15px)";  

        button.onclick = () => makeChoice(choice);
        choicesDiv.appendChild(button);

        setTimeout(() => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
        }, 200 * index);
    });
}

function makeChoice(choice) {
    if (choice.next === "death") {
        document.getElementById("game-container").style.display = "none"; 
        document.getElementById("death-screen").style.display = "flex";   
    } else if (choice.next === "escape") {
        document.getElementById("game-container").style.display = "none"; 
        document.getElementById("escape-screen").style.display = "flex";   
    } else if (choice.next === "lost") {  
        document.getElementById("game-container").style.display = "none";
        document.getElementById("lost-screen").style.display = "flex";
    }else {
        showStory(choice.next);
    }
}

function restartGame() {
   
    document.getElementById("game-container").style.display = "none";
    document.getElementById("death-screen").style.display = "none";
    document.getElementById("escape-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
    document.getElementById("lost-screen").style.display = "none"; // ✅ Ensure lost screen is hidden
    document.getElementById("home-screen").style.display = "flex"; 
    }

function exitGame() {
    window.close();
}

 

