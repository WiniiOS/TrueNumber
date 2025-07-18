const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const balanceController = require('../controllers/balanceController');

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Gestion des soldes
 */

/**
 * @swagger
 * /api/v1/balance:
 *   get:
 *     summary: Récupère le solde de l'utilisateur
 *     tags: [Balance]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Solde actuel
 */
router.get('/', isAuthenticated, balanceController.getBalance);

module.exports = router;