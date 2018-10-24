var colors = [],
	numMatch = [],
	colorsMatch = [],
	colorsCnt = -1,
	moveMade = 0,
	initialStartTime = [],
	time = null,
	endGame = false,
	randHold = [],
	level = 0,
	randDuplicate = -1,
	holdVal2,
	holdVal3 = false,
	holdVal1,
	squareNum = [];
	squareNum[0] = [4,16,36,64,128];
	squareNum[1] = [200,400,600,750,1450];

window.onload = function Main(){
 // localStorage.setItem("Level", "Smith");

	// Get level 
	if (typeof(Storage) !== "undefined") {
		try{
			level = localStorage.getItem("Level");
			if (level == null) {
				console.log("Failed to get level");
				console.log("Permission granted to start new level");
				level = 0;
			}else{
				console.log("Level has been initiated");
			}
		}catch(err){
			console.log("Failed to get level");
			console.log("Permission granted to start at Level 0");
			level = 0;
		}
	}


	let time = new Date();
	initialStartTime[0] = time.getHours();
	initialStartTime[1] = time.getMinutes();
	initialStartTime[2] = time.getSeconds();

	var container = document.getElementById('gameContainer')
	container.style.width = squareNum[1][level]+"px";

	// random unique values 
	while(numMatch.length < squareNum[0][level]){

		if (numMatch.length < squareNum[0][level]/2) {
			var randVal = Math.floor(Math.random()*90) + 10;
			var R = Math.floor(Math.random()*200);
			var G = Math.floor(Math.random()*200);
			var B = Math.floor(Math.random()*200);
			var rgb = "rgb("+R+","+G+","+B+")";

			if(numMatch.indexOf(randVal) > -1){
				if (colors.indexOf(rgb) > -1) {
					continue;
				}continue; 
			}
				numMatch[numMatch.length] = randVal;
				colors[numMatch.length-1] = rgb;
				CloneSquares();

				// if (numMatch.length > 31) {console.log(CheckDuplicates(colors))}
				
		}else{
			// shuffles colors and numbers around the array
			randDuplicate++;
			numMatch[numMatch.length] = numMatch[randDuplicate];
			colors[numMatch.length-1] = colors[randDuplicate];
			CloneSquares();
		}
	}

	let shuffledArray = Shuffle(numMatch,colors);
	numMatch = shuffledArray[0];
	colors = shuffledArray[1];

	// randomly selects and replace value to increase difficulty
	// numMatch = numMatch.map(x => {
	// 	 Math.floor(Math.random()*numMatch.length)
	// })

	container.addEventListener('mousedown',function(e){
		var gameBoxes = e.target;
		// console.log(numMatch[Number(gameBoxes.id)])
		if (colorsMatch.includes(colors[Number(gameBoxes.id)])!=true ) { // filters detected colors
			gameBoxes.style.transform="scale(0.5,0.5)";
			gameBoxes.style.background=colors[Number(gameBoxes.id)]
			gameBoxes.innerHTML= numMatch[Number(gameBoxes.id)];
			setTimeout(function(){
				gameBoxes.style.transform="scale(1,1)translateY(14px)";
			},50);

			if (holdVal1 == null) {
				holdVal1 = colors[Number(gameBoxes.id)];//gameBoxes.style.backgroundColor;
				holdID1 = Number(gameBoxes.id);

			}else if (holdVal2 == null && holdID1 != Number(gameBoxes.id)) {
				holdVal2 = colors[Number(gameBoxes.id)];// gameBoxes.style.backgroundColor;
				holdVal3 = true;
				holdID2 = Number(gameBoxes.id);
			}

		// detects matching cards
		if (holdVal3 == true) {
			var card1 = document.getElementsByTagName('LI')[holdID1];
			var card2 = document.getElementsByTagName('LI')[holdID2];
			moveMade++;
			if (holdVal2 == holdVal1) {
				// Stores detected colors 
				colorsCnt++;
				colorsMatch[colorsCnt] = holdVal2;
				setTimeout(function(){
					card1.style.transform="scale(0.7,0.7)translateY(40px)";
					card2.style.transform="scale(0.7,0.7)translateY(40px)";
					card2.style.opacity="0.5";
					card1.style.opacity="0.5";	
				},50)
			}else if ((colorsMatch.includes(holdVal1)!=true) && (colorsMatch.includes(holdVal2)!=true)){ // filters detected colors
				setTimeout(function(){
					card1.style.transform="translateY(96px)rotateX(180deg)scale(1,1)";
					card2.style.transform="translateY(96px)rotateX(180deg)scale(1,1)";
					card2.style.background="#194996";
					card1.style.background="#194996";
					card2.innerHTML="";
					card1.innerHTML="";
				},500);
			}

			setTimeout(function(){
				// Winner!!!!!!!!!!!!!!!!
				 if((colorsCnt >= (squareNum[0][level]/2)-1) && endGame == false){
				 	
				 	// Gets difference between time 
				 	let time = new Date();
				 	initialStartTime[0] = Math.abs(initialStartTime[0]-= time.getHours());
				 	initialStartTime[1] = Math.abs(initialStartTime[1]-= time.getMinutes());
				 	initialStartTime[2] = Math.abs(initialStartTime[2]-= time.getSeconds());
		
				 	let check = confirm("Congradulations You won!!!! \n\nMoves made: "+moveMade+"\nDuration: "+initialStartTime[0]+"H: "+initialStartTime[1]+"M: "+initialStartTime[2]+"S\nDo you want to beat your old record?");
				 	
				 	if (check == true) {
				 		localStorage.setItem("Level",Number(localStorage.getItem("Level"))+1);
				 	}

				 	endGame = true;
				 }else if (endGame == true) {
				 	location.reload();
				 }
			},2000);
		// Resets
		holdVal1 = null;
		holdVal2 = null;
		holdVal3 = false;
		}

	}})
}


// Reset game
function ResetGame(){
	var check = confirm("Are you sure you want to reset this game");
	if (check == true) {
		localStorage.setItem("Level",0);
		location.reload();
	}
	
}


function CheckDuplicates(duplicate,checkfor){
	var  dupCnt = {};
	duplicate.forEach(function(i) { dupCnt[i] = (dupCnt[i]||0) + 1;});

	if(checkfor == undefined){
		return dupCnt;
	}else{
		return dupCnt[checkfor];
	}	
}


var id = 0;
function CloneSquares(){
	var container = document.getElementById('gameContainer')
	var box = document.createElement('LI');
	var clone = box.cloneNode(true);
	clone.setAttribute("id",id++)
	container.appendChild(clone);
}


function Shuffle(array,colors){
	for (var i = 0; i < array.length; i++) {
		 var randArray1 = Math.floor(Math.random()*array.length);
		 var randArray2 = Math.floor(Math.random()*array.length);
		 var tempHold = array[randArray1];
		 var tempHoldC = colors[randArray1];

		 array[randArray1] = array[randArray2];
		 array[randArray2] = tempHold;
		 colors[randArray1] = colors[randArray2];
		 colors[randArray2] = tempHoldC;
	}

	let shuffledArray = []
	 	shuffledArray[0] = array
	 	shuffledArray[1]= colors

	return shuffledArray;
}

