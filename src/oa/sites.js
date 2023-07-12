var sitesEditor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
    sitesEditor = new $.fn.dataTable.Editor({
        ajax: "/api/oa-sites",
        table: "#sitesTable",
        fields: [{
            label: "Site",
            name: "title"
        }
        ]
    });

    $('#sitesTable').DataTable({
        dom: "Bfrtip",
        ajax: "/api/oa-sites",
        columns: [
            {data: "title"},
        ],
        select: true,
        buttons: [
            {extend: "create", editor: sitesEditor},
            {extend: "edit", editor: sitesEditor},
            {extend: "remove", editor: sitesEditor}
        ]
    });
});