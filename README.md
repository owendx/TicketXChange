# TicketXChange
**Author: Oluwaseun Talabi**

An online ticket exchange platform that allows users to buy and sell tickets.
Powered by Node.js, Express, MongoDB, HTML, and CSS

### Contents

- TicketXChange Description
- Screenshots
- Technologies Used
- Getting Started
- Roadmap and Planned Features
- Wireframe
- Game Flow

- Pseudocode

### Slot Machine Description
A slot machine is a gambling device in which the player must match a set of three symbols to win. In some locales, slot machines are known as "one-armed bandits" because of the handle that is used to pull the lever on traditional slot machines, and the tendency for users to lose all their money playing them.

### Screenshots
<img src="https://hedonic.life/wp-content/uploads/2022/07/mainui.png" />
<img src="https://hedonic.life/wp-content/uploads/2022/07/jackpotscreenshot.png" />
<img src="https://hedonic.life/wp-content/uploads/2022/07/cashoutmessage.png" />

### Symbol List
There are **9 symbols** that may appear in the reels when the slot machine is played:
<img src="https://hedonic.life/wp-content/uploads/2022/07/slot-machine-symbols-5.png" />

### Technologies Used
- HTML
- CSS including CSS animations, CSS grid and CSS flexbox
- JavaScript
- Google Fonts
- Adobe Illustrator and Photoshop to edit art assets
- Ableton Live to edit audio assets

### Slot Machine Description

The slot machine is rendered on the page using a design powered by CSS Grid and Flexbox. The slot machine features 3 reels, each reel loaded with 9 symbols.

When the page is first loaded, a tutorial sequence is played. After the tutorial sequence, the user is prompted to enter their starting balance via a number input on the screen.

Once the user enters their starting balance, the slot machine become active, and the player's current balance is displayed. The player can now play the slot machine by clicking the 'SPIN' button. When the 'SPIN' button is pressed, the player's balance is deducted by the bet amount, and the 3 reels will begin to spin for a few seconds, gradually coming to a stop on a random symbol. If all 3 reels have matching symbols, the player's balance is credited in the amount of 10 times their current bet.

The player can cash out and redeem any winnings earned by clicking the 'CASHOUT' button. When the 'CASHOUT' button is pressed, the players balance plus any winnings are redeemed.

The player may continue playing the slot machine until their balance reaches 0. When this happens, a message displays informing the player that they can no longer play the slot machine due to insufficient balance, and to cash out.

For convenience, an 'AUTO PLAY' option has been included for players who want the slot machine reels to automatically spin on their own. Pressing the 'AUTO PLAY' options enables the auto play feature, pressing the 'AUTO PLAY' button once more disables auto play.

### Getting Started
[The latest version of the slot machine game can be accessed and played here: https://incredible-duckanoo-8842a5.netlify.app/ ](https://incredible-duckanoo-8842a5.netlify.app/)


### Roadmap and Planned Features
There are several features planned to be implemented to the slot machine in the future, including:

* Incorporating 'wildcard' symbols on the reels to increase the chance of winning
* Incorporating a 'bonus' symbol on the reels to increase the payout of winning
* Implementation of a 'cheat code' feature that enables several hidden functions on the slot machine, including:
    1. Free play by not requiring a bet or not decreasing the user balance on each spin.
    2. Force the reels to match, resulting in jackpot
    3. Freezing one or multiple reels to prevent them from spinning
* Implementation of a cash voucher function which allows users to cash out their winnings in the form of code voucher, which can be entered back into the slot machine as a credit balance for continued play.
* Animating the jackpot message image to make it more aesthetically pleasing

### Wireframe
<img src="https://hedonic.life/wp-content/uploads/2022/07/slot-machine-wireframe.png" />

[Link to view wireframe on Whimsical: https://whimsical.com/olu-s-slot-machine-YQNJ3geosQsdeWZVZGAAdx](https://whimsical.com/olu-s-slot-machine-YQNJ3geosQsdeWZVZGAAdx)

### Game Flow
<img src="https://hedonic.life/wp-content/uploads/2022/07/Slot-Machine-Game-Flow-4.png" />








### JavaScript Pseudocode


```
All variables represent default values on initialization
// Constants
const playerName = "";

// State Variables
let playerBalance = 100,000;
let winnings = 0;
let bet = 10,000;
let autoPlay = false;
let reel1 = null;
let reel2 = null;
let reel3 = null;
let reel4 = null;
let symbolList = ['bar.jpg', 'spade.jpg', '7.jpg', 'diamond.jpg', 'clover.jpg', 'star.jpg', '3leaf.jpg']
let payoutAmount = null;
let voucherCodes = [];
let cheatCodes = ["forceMatch", "creditBoost", "freePlay"];
let userInput = "";

// Cached Elements
const spinButtonEl = document.querySelector("#spinButton");
const payoutButtonEl = document.querySelector("#payoutButton");
const autoPlayButtonEl = document.querySelector("#autoPlayButton");
const resetButtonEl = document.querySelector("#resetButton");
const enterButtonEl = document.querySelector("#enterButton");
const liveConsoleEl = document.querySelector("#liveConsole");
const userInputEl = document.querySelector("#userInput");
const enterButton = document.querySelector("#enterButton");

// Event Listeners
spinButtonEl.addEventListener("click", play);
payoutButtonEl.addEventListener("click", payout);
autoPlayButtonEl.addEventListener("click", autoPlay);

// Functions
function play(){
	// activate reel spin
	// using javascript math/floor methods to generate random numbers
	// use the random numbers to determine what symbol each spinning reel should land on
	// decrease playerBalance by amount of bet
	playerBalance +- bet;
	
	if (autoPlay === true){
	//run play() function again
	}
	else{}
}

function match(){
	// this function checks if all 4 reels match, and if so,
	// increases the player's winnings by four times the player's bet.
	if (reel1 === reel2 === reel3 === reel4){
		winnings += (bet * 4);
	}


function payout(){
	// return value of (balance + winnings)
	// create a voucherCode with value (balance + winnings)
	// print voucherCode info to live console/info box
	// set value of playerBalance to 0
	// set value of winnings to 0
}

function autoPlay(){
	// if autoPlay === false, set it to true
	// else, set autoPlay back to false


function autoPlayScript(){
	// trigger play() function automatically
}	
	
function reset(){
	// clear all variables back to their default states (except for voucherCodes)
}

function cheatCommand(userInput){
	// alter the flow of the slot machine if certain user input strings are received
	if (userInput === 'forceMatch'){
		// the next reel spin will 100% result in a match, no matter what
		}
	else if (userInput === 'creditBoost'){
		// instant credit of $100,000 to playerBalance
		}
	else if (userInput === 'freePlay'){
		// playing the slot machine will no longer cause decrease in playerBalance
		}
	else {}
}
	

```

