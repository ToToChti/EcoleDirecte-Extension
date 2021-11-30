function moyenne(elem, num) {
  var note = 0;
  var num_note = 0;

  document.querySelectorAll(elem).forEach((ele, index) => {
    if (!ele.innerHTML) return;
    
    num_note += Number(ele.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML)
    console.log(ele.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML)
    
    for(let i = 0; i < Number(ele.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML); i++) {
      note += parseFloat(ele.innerHTML.split(",").join("."));
    }
  });

  return (note / num_note)
    .toFixed(2)
    .toString()
    .split(".")
    .join(",");
}

document.querySelector('.footer.hidden-print ul').innerHTML += '<li class="hidden-xs" id="use-coef-bac"><a href="">Utiliser les coefficients du baccalauréat général</a></li>'

document.querySelector('#use-coef-bac').onclick = function() {
  alert('Peut etre bientot')
}

chrome.runtime.onMessage.addListener((request) => {
  var regex = /https:\/\/www.ecoledirecte.com\/Eleves\/\d+\/Notes/i;
  var isRightPage = regex.test(window.location.href);
  if (!isRightPage) {
    return alert("Can't be used on that webpage :/");
  }

  let btn_note = document.getElementById("btn-encart-notes");
  if (!btn_note || !btn_note.classList.contains("active")) return alert('You have to be in the "Notes" tab in the "Evaluations" table');

  var moy_el = moyenne("td.relevemoyenne span");

  if (document.querySelector("#added-line")) {
    document.querySelector("#added-line").remove();
  }

  document.querySelector(
    "tbody"
  ).innerHTML += `<tr id="added-line" class="lignemoyenne" style="background-color: #2095F3;color: white;"><td class="discipline"><b>GENERAL</b></td><td class="coef"></td><td class="moyenneeleve">${moy_el}</td><td class="notes"></td><td class="graph text-center"></td></tr>`;
});
