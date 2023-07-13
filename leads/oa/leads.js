var leadsEditor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
    leadsEditor = new $.fn.dataTable.Editor({
        ajax: "/api/oa-leads",
        table: "#leadsTable",
        fields: [{
            label: "ASIN",
            name: "amazon_asin"
        },{
            label: "Product URL",
            name: "source_url"
        },{
            label: "No. Pack",
            name: "pack"
        },{
            label: "Status",
            name: "status"
        },
        ]
    });

    $('#leadsTable').DataTable({
        dom: "Bfrtip",
        ajax: "/api/oa-leads",
        columns: [
            {data: "amazon_asin"},
            {data: "source_url"},
            {data: "pack"},
            {data: "status"},
        ],
        select: true,
        buttons: [
            {extend: "create", editor: leadsEditor},
            {extend: "edit", editor: leadsEditor},
            {extend: "remove", editor: leadsEditor}
        ]
    });
});