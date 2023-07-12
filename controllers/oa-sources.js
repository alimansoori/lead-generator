let db = require('../db');
let router = require('express').Router();
let {
    Editor,
    Field,
    Validate,
    Format,
    Options
} = require("datatables.net-editor-server");

router.all('/api/oa-sources', async function (req, res) {
    let editor = new Editor(db, 'oa_sources').fields(
        new Field('title')
            .validator(Validate.maxLen(200)),
        new Field('url')
            .validator(Validate.notEmpty())
            .validator(Validate.maxLen(500))
            .validator(Validate.url())
            .validator(Validate.dbUnique()),
        new Field('image')
            .validator(Validate.maxLen(200))
            .validator(Validate.url()),
        new Field('price')
            .validator(Validate.numeric()),
        new Field('source')
    );

    await editor.process(req.body);
    res.json(editor.data());
});

module.exports = router;
