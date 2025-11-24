const Objects = ["Padlock", "Key", "Gear", "Compass"];

const Enter = document.getElementById("Enter");
const Backspace = document.getElementById("Backspace");

let Line1 = [];
let Line2 = [];
let Line3 = [];
let Line4 = [];
let Line5 = [];
let Line6 = [];

let Won = false;

let Line = 1;
let LineArray = Line1;
let Selected = 1;

for (let i = 0; i < 4; i++) {
    document.getElementById("I" + (i+1)).src = "Images/" + Objects[i] + ".png";
}

const Images = [document.getElementById("I1").src, document.getElementById("I2").src, document.getElementById("I3").src, document.getElementById("I4").src, document.getElementById("I4").src, document.getElementById("I4").src]
let db = false;

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

let Code = ["Padlock", "Key", "Gear", "Compass"];

shuffle(Code);

function Reset() {
    shuffle(Code);

    Line1 = [];
    Line2 = [];
    Line3 = [];
    Line4 = [];
    Line5 = [];
    Line6 = [];

    Selected = 1;
    Line = 1;
    LineArray = Line1;

    Won = false;

    document.getElementById("Blur").remove();

    for (let i = 1; i < 7; i++) {
        document.getElementById("Score" + i).textContent = "";
        document.getElementById("Indent" + i).textContent = "";
    }

    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 7; j++) {
            document.getElementById("I" + i + "L" + j).src = "Images/Transparency.png";
        }
    }
}

function Close() {
    document.getElementById("Blur").remove();
}

function Clicked(O) {
    if (!db && !Won) {
        if (O < 5 && Selected < 5) {
            if (Images[O-1] == document.getElementById("I" + O).src) {
                db = true;
                document.getElementById("I" + Selected + "L" + Line).src = Images[O-1];
                document.getElementById("I" + O).src = "Images/Transparency.png";

                LineArray.push(Objects[O-1]);

                Selected += 1;
                db = false;
            }
        } else if (O == 5 && Selected > 1) {
            db = true;
            let Img = document.getElementById("I" + (Selected - 1) + "L" + Line).src;

            for (let i = 1; i<5; i++) {
                if (Img == Images[i-1]) {
                    document.getElementById("I" + i).src = Img;
                }
            }

            LineArray.pop();

            document.getElementById("I" + (Selected - 1) + "L" + Line).src = "Images/Transparency.png";
            Selected -= 1;
            db = false;
        } else if (O == 6 && Selected == 5 && Line < 7) {
            db = true;

            let Score = 0

            for (let i = 0; i<4; i++) {
                if (Code[i] == LineArray[i]) {
                    Score++;
                }
            }

            if (Score == 4) {
                Won = true;

                document.getElementById("BlurContainer").innerHTML = `        <div id="Blur" class="Blur">
            <div class="Celebration">
                <p class="CelebrationText">Congratulations!</p>
                <p class="CelebrationSubtext">You cracked the 4x6 code in ` + Line + `/6 attempts</p>
                <button class="Play" id="AgainButton" onclick="Reset()">Play Again</button>
                <button class="Play" id="CloseButton" onclick="Close()">Close</button>
            </div>
        </div>`
            } else if (Line == 6) {
                document.getElementById("BlurContainer").innerHTML = `        <div id="Blur" class="Blur">
            <div class="Celebration">
                <p class="CelebrationText">Failed!</p>
                <p class="CelebrationSubtext">You were unable to crack the 4x6 code</p>
                <button class="Play" id="AgainButton" onclick="Reset()">Play Again</button>
                <button class="Play" id="CloseButton" onclick="Close()">Close</button>
            </div>
        </div>`
            }

            document.getElementById("Indent" + Line).textContent = Score + "/4";
            document.getElementById("Score" + Line).textContent = Score + "/4";

            for (let i = 1; i<5; i++) {
                document.getElementById("I" + (i)).src = "Images/" + Objects[i-1] + ".png";
            }

            Line += 1;

            if (Line == 2) {
                LineArray = Line2;
            } else if (Line == 3) {
                LineArray = Line3;
            } else if (Line == 4) {
                LineArray = Line4;
            } else if (Line == 4) {
                LineArray = Line4;
            } else if (Line == 5) {
                LineArray = Line5;
            } else if (Line == 6) {
                LineArray = Line6;
            }

            Selected = 1;
            db = false;
        }
    }
}