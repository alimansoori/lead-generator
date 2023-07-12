let db = require('../db');
let router = require('express').Router();
let {
    Editor,
    Field,
    Validate,
    Format,
    Options
} = require("datatables.net-editor-server");

router.all('/api/oa-sites', async function (req, res) {
    let editor = new Editor(db, 'oa_sites').fields(
        new Field('title')
            .validator(
                Validate.notEmpty()
            )
            .validator(
                Validate.dbUnique()
            )
    );

    await editor.process(req.body);
    res.json(editor.data());
});

module.exports = router;
