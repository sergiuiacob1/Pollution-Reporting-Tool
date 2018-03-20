function SubmitForm(){
    var formDiv = document.getElementsByClassName("add-issue-form")[0];
    var forms = formDiv.getElementsByTagName("form");
    var style;

    for (var i = 0; i < forms.length; ++i){
        style = getComputedStyle(forms[i]);

        if (style.display == "block"){  
            forms[i].style.display = "none";
            if (i != forms.length - 1){
                forms[i + 1].style.display = "block";
            }
            break;
        }
    }
}

function ToggleIssueForm(){
    var button = document.getElementById("btn-show-add-issue-form");
    var issueForm = document.getElementsByClassName("add-issue-bottom")[0];

    if (issueForm.classList.contains("issue-bottom-hidden")){
        issueForm.classList.add("issue-bottom-shown");
        issueForm.classList.remove("issue-bottom-hidden");
        button.innerHTML = "Anuleaza";
    }
    else{
        issueForm.classList.remove("issue-bottom-shown");
        issueForm.classList.add("issue-bottom-hidden");
        button.innerHTML = "Raporteaza o problema";
    }
}

function AddFormImage(){
    var newImage = document.createElement("img");
    var addImageButton = document.getElementById("stage2-form-add-image");
    newImage.classList.add("stage2-form-image");

    addImageButton.insertAdjacentElement("beforebegin", newImage);
}