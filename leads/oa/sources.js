var sourcesEditor; // use a global for the submit and return data rendering in the examples

// Display an Editor form that allows the user to pick the CSV data to apply to each column
function selectColumns ( editor, csv, header ) {
    var selectEditor = new $.fn.dataTable.Editor();
    var fields = editor.order();

    for ( var i=0 ; i<fields.length ; i++ ) {
        var field = editor.field( fields[i] );

        selectEditor.add( {
            label: field.label(),
            name: field.name(),
            type: 'select',
            options: header,
            def: header[i]
        } );
    }

    selectEditor.create({
        title: 'Map CSV fields',
        buttons: 'Import '+csv.length+' records',
        message: 'Select the CSV column you want to use the data from for each field.',
        onComplete: 'none'
    });

    selectEditor.on('submitComplete', function (e, json, data, action) {
        // Use the host Editor instance to show a multi-row create form allowing the user to submit the data.
        editor.create( csv.length, {
            title: 'Confirm import',
            buttons: 'Submit',
            message: 'Click the <i>Submit</i> button to confirm the import of '+csv.length+' rows of data. Optionally, override the value for a field to set a common value by clicking on the field below.'
        } );

        for ( var i=0 ; i<fields.length ; i++ ) {
            var field = editor.field( fields[i] );
            var mapped = data[ field.name() ];

            for ( var j=0 ; j<csv.length ; j++ ) {
                field.multiSet( j, csv[j][mapped] );
            }
        }
    } );
}

$(document).ready(function () {
    sourcesEditor = new $.fn.dataTable.Editor({
        ajax: "/api/oa-sources",
        table: "#sourcesTable",
        display: 'envelope',
        fields: [{
            label: "Title:",
            name: "title"
        },{
            label: "URL:",
            name: "url"
        },{
            label: "Image:",
            name: "image"
        },{
            label: "Price",
            name: "price"
        },{
            label: "Source",
            name: "source"
        },]
    });

    var importSourceEditor = new $.fn.dataTable.Editor( {
        fields: [ {
            label: 'CSV file:',
            name: 'csv',
            type: 'upload',
            ajax: function ( files, done ) {
                // Ajax override of the upload so we can handle the file locally. Here we use Papa
                // to parse the CSV.
                Papa.parse(files[0], {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        if ( results.errors.length ) {
                            console.log( results );
                            importSourceEditor.field('csv').error( 'CSV parsing error: '+ results.errors[0].message );
                        }
                        else {
                            selectColumns( sourcesEditor, results.data, results.meta.fields );
                        }

                        // Tell Editor the upload is complete - the array is a list of file
                        // id's, which the value of doesn't matter in this case.
                        done([0]);
                    }
                });
            }
        } ]
    } );

    $('#sourcesTable').DataTable({
        dom: "Bfrtip",
        ajax: "/api/oa-sources",
        columns: [
            {data: "title"},
            {
                data: 'url',
                render: function (data, type) {
                    if (type === 'display') {
                        let domain = (new URL(data));
                        domain = domain.hostname.replace('www.', '');
                        return '<a href="' + data + '">' + domain + '</a>';
                    }
                    return data;
                },
            },
            {
                data: 'image',
                render: function (data, type) {
                    if (type === 'display') {
                        return '<img class="img-show" src="' + data + '"/>';
                    }
                    return null;
                },
            },
            {data: "price"},
            {data: "source"},
        ],
        select: true,
        buttons: [
            {extend: "create", editor: sourcesEditor},
            {extend: "edit", editor: sourcesEditor},
            {extend: "remove", editor: sourcesEditor},
            {
                extend: 'csv',
                text: 'Export CSV',
                className: 'btn-space',
                exportOptions: {
                    orthogonal: null
                }
            },
            {
                text: 'Import CSV',
                action: function () {
                    importSourceEditor.create( {
                        title: 'CSV file import'
                    } );
                }
            },
        ]
    });
});