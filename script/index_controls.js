function SubmitForm(){
    var formDiv = document.getElementsByClassName("add-issue-form")[0];
    var forms = formDiv.getElementsByTagName("form");
    var style;

    for (var i = 0; i < forms.length; ++i){
        style = getComputedStyle(forms[i]);

        if (style.display == "block"){  
            forms[i].style.display = "none";
        }
    }
}

function ToggleIssueForm(){
    var button = document.getElementById("btn-show-add-issue-form");
    var issueForm = document.getElementsByClassName("add-issue")[0];

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