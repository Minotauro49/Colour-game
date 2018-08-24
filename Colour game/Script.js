var colors = [],
	numMatch = [],
	colorsMatch = [],
	colorsCnt = -1,
	moveMade = 0,
	initialStartTime = [],
	time = null,
	endGame = false,
	holdVal1,
	holdVal2,
	holdVal3 = false,
	holdID1,
	holdID2,
	randArray1,
	randArray2,
	randomN = 0,
	randHold = 0,
	level = 2;
	squareNum = [];
	squareNum[0] = [4,16,36,64,128];
	squareNum[1] = [200,400,600,750,1450];

window.onload = function Main(){
	let time = new Date();
	initialStartTime[0] = time.getHours();
	initialStartTime[1] = time.getMinutes();
	initialStartTime[2] = time.getSeconds();

	var container = document.getElementById('gameContainer')
	container.style.width = squareNum[1][level]+"px";

	for (var i = 0; i < squareNum[0][level]; i++) {
		if (i < squareNum[0][level]/2) {
			// picks random colors
			var R = Math.floor(Math.random()*200);
			var G = Math.floor(Math.random()*200);
			var B = Math.floor(Math.random()*200);
			colors[i] = "rgb("+R+","+G+","+B+")";
			colors[i+(squareNum[0][level]/2)] = "rgb("+R+","+G+","+B+")";

			// random numbers 
			randHold = Math.floor(Math.random()*80);
			numMatch[i]=(i+randHold);
			numMatch[i+(squareNum[0][level]/2)]=(i+randHold);
		}else{
			// shuffles colors and numbers around the array
			randArray1 = Math.floor(Math.random()*squareNum[0][level]);
			randArray2 = Math.floor(Math.random()*squareNum[0][level]);
			holdVal1 = colors[randArray1];
			holdVal2 = colors[randArray2];
			colors[randArray1] = holdVal2;
			colors[randArray2] = holdVal1;

			holdID1 = numMatch[randArray1];
			holdID2 = numMatch[randArray2];
			numMatch[randArray1] = holdID2;
			numMatch[randArray2] = holdID1;
		}
		// Rest
		holdVal1 = null;
		holdVal2 = null;
		holdID1 = null;
		holdID2 = null;

		// creates square on screen
		var box = document.createElement('LI');
		var clone = box.cloneNode(true);
		clone.setAttribute("id",i)
		container.appendChild(clone);
	}


	container.addEventListener('mousedown',function(e){
		var gameBoxes = document.getElementsByTagName('LI')[Number(e.path[0].id)];
		if (colorsMatch.includes(colors[Number(e.path[0].id)])!=true ) { // filters detected colors
			gameBoxes.style.transform="scale(0.5,0.5)";
			gameBoxes.style.background=colors[Number(e.path[0].id)]
			gameBoxes.innerHTML= numMatch[Number(e.path[0].id)];
			setTimeout(function(){
				gameBoxes.style.transform="scale(1,1)translateY(14px)";
			},50)

			if (holdVal1 == null) {
				holdVal1 = colors[Number(e.path[0].id)];//gameBoxes.style.backgroundColor;
				holdID1 = Number(e.path[0].id);
			}else if (holdVal2 == null && holdID1 != Number(e.path[0].id)) {
				holdVal2 = colors[Number(e.path[0].id)];// gameBoxes.style.backgroundColor;
				holdVal3 = true;
				holdID2 = Number(e.path[0].id);
			}
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
				 	if (check == true) {alert("Ok then! Next to the next level!");}
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

	})
}