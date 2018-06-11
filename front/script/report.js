var hostname = "http://localhost:3000";

$(document).ready(function () {

    let container = document.getElementById("report-container");

    $.get(hostname + '/api/reports')
        .done(function (result, status) {
            let reports = result.reports;

            reports.forEach((report) => {
                let reportContainer = document.createElement("div");
                reportContainer.classList.add("report-container");
                let title = document.createElement("p");
                title.id = "text-intro"
                let node = document.createTextNode("Title: " + report.title);
                title.appendChild(node);
            })

        }).fail(function () {
        console.log('GET /api/reports failed');
    });

});