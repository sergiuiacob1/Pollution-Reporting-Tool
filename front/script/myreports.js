var hostname = "http://localhost:3000";

$(document).ready(function () {

    let container = document.getElementById("report-container");
    $('#report-container').empty();
    $.get(hostname + '/api/reports')
        .done(function (result, status) {
            let reports = result.reports;
            let myreports = [];
            for(let i=0;i<reports.length;i++)
            {
                if(reports[i].id_user === JSON.parse(localStorage.getItem("self")).id)
                   myreports.push(reports[i]);
            }
            console.log('MY REPORTS :');
            console.log(myreports);

            let titleHeader = document.getElementById("title-message");
            titleHeader.appendChild(document.createTextNode("My GreenIO reports: " + myreports.length));

            reports = myreports;
            reports.forEach((report) => {
                var reportContainer = document.createElement("div");
                reportContainer.className = "report-container-inset";

                var title = document.createElement("p");
                title.className = "text_intro";
                var titleText = document.createTextNode("Title: " + report.title);
                title.appendChild(titleText);
                reportContainer.appendChild(title);

                var description = document.createElement("p");
                description.className = "text_intro";
                var descriptionText = document.createTextNode("Description: " + report.description);
                description.appendChild(descriptionText);
                reportContainer.appendChild(description);

                var date = document.createElement("p");
                date.className = "text_intro";
                var dateText = document.createTextNode("Date: " + report.report_date);
                date.appendChild(dateText);
                reportContainer.appendChild(date);

                container.appendChild(reportContainer);
                container.appendChild(document.createElement("br"));
                container.appendChild(document.createElement("hr"));
            })

        }).fail(function () {
        console.log('GET /api/reports failed');
    });

});