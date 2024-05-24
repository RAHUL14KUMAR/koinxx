const express = require('express');
const multer = require('multer');

const { uploading } = require('../Controllers/uploadCsvControllers');
const { getBalance } = require('../Controllers/apiControllers');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.route('/')
.post(upload.single('file'),uploading)

router.route('/getBalance')
.get(getBalance);

module.exports = router;