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
    var issueForm = document.getElementsByClassName("add-issue")[0];
    if (issueForm.classList.contains("--show-bottom")){
        issueForm.classList.remove("--show-bottom");
        issueForm.classList.add("--hide-bottom");
    }
    else{
        issueForm.classList.add("--show-bottom");
        issueForm.classList.remove("--hide-bottom");
    }
}