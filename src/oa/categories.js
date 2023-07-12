var categoriesEditor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
    categoriesEditor = new $.fn.dataTable.Editor({
        ajax: "/api/oa-categories",
        table: "#categoriesTable",
        fields: [{
            label: "Title",
            name: "title"
        }
        ]
    });

    $('#categoriesTable').DataTable({
        dom: "Bfrtip",
        ajax: "/api/oa-categories",
        columns: [
            {data: "title"},
        ],
        select: true,
        buttons: [
            {extend: "create", editor: categoriesEditor},
            {extend: "edit", editor: categoriesEditor},
            {extend: "remove", editor: categoriesEditor}
        ]
    });
});