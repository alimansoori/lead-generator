var amazonsEditor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
    amazonsEditor = new $.fn.dataTable.Editor({
        ajax: "/api/oa-amazons",
        table: "#amazonsTable",
        fields: [{
            label: "Title",
            name: "title"
        }
        ]
    });

    $('#amazonsTable').DataTable({
        dom: "Bfrtip",
        ajax: "/api/oa-amazons",
        columns: [
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
            {data: "title"},
        ],
        select: true,
        buttons: [
            {extend: "create", editor: amazonsEditor},
            {extend: "edit", editor: amazonsEditor},
            {extend: "remove", editor: amazonsEditor}
        ]
    });
});