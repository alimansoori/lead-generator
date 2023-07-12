let db = require('../db');
let router = require('express').Router();
let {
    Editor,
    Field,
    Validate,
    Format,
    Options
} = require("datatables.net-editor-server");

let editor = new Editor(db, 'oa_leads').fields(
    new Field('amazon_asin'),
    new Field('source_url'),
    new Field('status'),
    new Field('pack')
);
router.all('/api/oa-leads', async function (req, res) {

    await editor.process(req.body);
    res.json(editor.data());
});

module.exports = router;
