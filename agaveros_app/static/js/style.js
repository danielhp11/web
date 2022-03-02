var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

document.addEventListener('DOMContentLoaded', function() {
  var parent = document.querySelector('.splitview'),
      topPanel = parent.querySelector('.top'),
      handle = parent.querySelector('.handle'),
      skewHack = 0,
      delta = 0;

  // If the parent has .skewed class, set the skewHack var.
  if (parent.className.indexOf('skewed') != -1) {
      skewHack = 1000;
  }

  parent.addEventListener('mousemove', function(event) {
      // Get the delta between the mouse position and center point.
      delta = (event.clientX - window.innerWidth / 2) * 0.5;

      // Move the handle.
      handle.style.left = event.clientX + delta + 'px';

      // Adjust the top panel width.
      topPanel.style.width = event.clientX + skewHack + delta + 'px';
  });
});


document.getElementById("plantaT").oninput = function() {inversion()};
function inversion(){
  try{
    var a = parseInt(document.getElementById("plantaT").value) || 0,
      b = parseInt(document.getElementById("precio").value) || 0,
      c = parseInt(document.getElementById("cosecha").value) || 0,
      e = parseInt(document.getElementById("utilidadNeta").value) || 0;;
      
    
    if (parseInt(document.getElementById("cosecha").value) == 3){
      document.getElementById("kilo").value = 22+".00";
      f = parseInt(document.getElementById("kilo").value) || 0;      
      var bruto = a*15*f;
      document.getElementById("utilidadDiaria").value =bruto/(c*365);
      
    }else if (parseInt(document.getElementById("cosecha").value) == 4){
      document.getElementById("kilo").value = 25+".00";
      var bruto = a*25*25;
      document.getElementById("utilidadDiaria").value =bruto/(c*365);

    }else if (parseInt(document.getElementById("cosecha").value) == 5){
      document.getElementById("kilo").value = 27+".00";
      var bruto = a*35*27;
      document.getElementById("utilidadDiaria").value =bruto/(c*365);
    }
    
    document.getElementById("plantaT").value = a;
    document.getElementById("inversion").value = a*b+".00";
    document.getElementById("bruta").value = bruto;
    document.getElementById("utilidadPlanta").value = a/bruto;
    document.getElementById("utilidadNeta").value = bruto-(bruto*.10);
    document.getElementById("comision").value = bruto*.10;
    document.getElementById("utilidadAnual").value =( bruto-(bruto*.10))/c;
  }catch (e){}
}
