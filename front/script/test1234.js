//var hostname = "http://91.92.128.27:3000";
var hostname = "http://localhost:3000";

$(document).ready(function () {
  let btnShowAdd = document.getElementById("btn-show-add-issue-form");
  btnShowAdd.onclick = ToggleIssueForm;
  let btnAddImg = document.getElementById("stage2-form-add-image");
  btnAddImg.onclick = AddFormImage;
  let btnAddReport = document.getElementById("btn-submit-issue");
  btnAddReport.onclick = SubmitForm;
});

window.onclick = function (event) {
  var modal = document.getElementById("feedback-modal");
  var span = document.getElementsByClassName("close")[0];
  if (event.target == modal || event.target == span) {
    modal.style.display = "none";
  }
};

function SubmitForm() {
  var formDiv = document.getElementsByClassName("add-issue-form")[0];
  var forms = formDiv.getElementsByTagName("form");
  var modal = document.getElementById("feedback-modal");
  var style;

  for (var i = 0; i < forms.length; ++i) {
    style = getComputedStyle(forms[i]);

    if (style.display == "block") {
      forms[i].style.display = "none";
      if (i != forms.length - 1) {
        forms[i + 1].style.display = "block";
      } else {
        modal.style.display = "block";
        postReport();
      }
      break;
    }
  }
}

function postReport() {
  let location = new Object;
  let report = new Object();
  location.lat_coord = map.getCenter().lat();
  location.long_coord = map.getCenter().lng();

  report.title = document.getElementById("stage1-title").value;
  report.description = document.getElementById("stage1-description").value;

  $.post(hostname + '/api/locations', JSON.stringify(location))
    .done(function (res, status) {
      report.id_location = res.id;

      if (res.success !== true) {
        failAddReport();
        return;
      }

      $.post(hostname + "/api/reports", JSON.stringify(report)).
      done(function (res, status) {
          if (res.success !== true) {
            failAddReport();
            return;
          }
        })
        .error(function (err) {
          failAddReport()
        });
    }).error(function (err) {
      failAddReport()
    });
}

function failAddReport() {
  alert('Nu s-a putut adauga reportul. Va rugam completati toate campurile!');
}

function ToggleIssueForm() {
  var button = document.getElementById("btn-show-add-issue-form");
  var issueForm = document.getElementsByClassName("add-issue-bottom")[0];

  if (issueForm.classList.contains("issue-bottom-hidden")) {
    issueForm.classList.add("issue-bottom-shown");
    issueForm.classList.remove("imap.panTo(uluru);ssue-bottom-hidden");
    button.innerHTML = "Anuleaza";
  } else {
    issueForm.classList.remove("issue-bottom-shown");
    issueForm.classList.add("issue-bottom-hidden");
    button.innerHTML = "Raporteaza o problema";
  }
}

function AddFormImage() {
  var newImage = document.createElement("img");
  var addImageButton = document.getElementById("stage2-form-add-image");
  newImage.classList.add("stage2-form-image");
  addImageButton.insertAdjacentElement("beforebegin", newImage);

  var inputFile = document.getElementById("stage2-form-add-image-input");
  inputFile.click();
}