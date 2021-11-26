function moyenne(elem, num) {
  var note = 0;
  var num_note = 0;

  document.querySelectorAll(elem).forEach((ele, index) => {
    if (!ele.innerHTML) return;
    if (num && num !== index % 3) return console.log("ugh");
    num_note++;
    note += parseFloat(ele.innerHTML.split(",").join("."));
  });

  return String(Math.round((note / num_note) * 100) / 100)
    .split(".")
    .join(",");
}

chrome.runtime.onMessage.addListener((request) => {
  var regex = /https:\/\/www.ecoledirecte.com\/Eleves\/\d+\/Notes/i;
  var isRightPage = regex.test(window.location.href);
  if (!isRightPage) {
    return alert("Can't be used on that webpage :/");
  }

  let btn_moy = document.getElementById("btn-encart-moyennes");
  if (!btn_moy) return;

  if (!document.querySelector("#periode0")) return;

  if (!btn_moy.classList.contains("active")) {
    btn_moy.click();
  }

  if (document.querySelector("#added-line")) return;

  var moy_el = moyenne("td.moyenneeleve span"),
    moy_cl = moyenne("td.moyenneclasse span", 0),
    min_cl = moyenne("td.moyenneclasse span", 1),
    max_cl = moyenne("td.moyenneclasse span", 2);

  document.querySelector(
    "tbody"
  ).innerHTML += `<tr id="added-line" class="lignemoyenne" style="background-color: #2095F3;color: white;"><td class="discipline"><b>GENERAL</b></td><td class="coef"></td><td class="moyenneeleve">${moy_el}</td><td class="moyenneclasse">${moy_cl}</td><td class="moyenneclasse" >${min_cl}</td><td class="moyenneclasse" ng-if="parametrage.moyenneMax">${max_cl}</td></tr>`;
});