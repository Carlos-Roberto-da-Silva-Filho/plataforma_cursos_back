// src/routes/RootRoutes.js

const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "API está online!" });
})


module.exports = router;