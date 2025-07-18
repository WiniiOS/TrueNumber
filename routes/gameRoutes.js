const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { isAuthenticated, isAdmin } = require('../middlewares/isAuthenticated');


/**
 * @swagger
 * tags:
 *   name: Game
 *   description: Gestion du jeu TrueNumber
 */

/**
 * @swagger
 * /api/v1/game/play-game:
 *   post:
 *     summary: Jouer une partie
 *     tags: [Game]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Résultat de la partie
 *       401:
 *         description: Non autorisé
 */

router.post("/play-game", isAuthenticated, gameController.playGame);
 
/**
 * @swagger
 * /api/v1/game/user-game-history:
 *   get:
 *     summary: Historique des parties de l'utilisateur
 *     tags: [Game]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des parties
 *       401:
 *         description: Non autorisé
 */

router.get("/user-game-history", isAuthenticated, gameController.getUserHistory);

/**
 * @swagger
 * /api/v1/game/all-history:
 *   get:
 *     summary: Historique de tous les utilisateurs (Admin seulement)
 *     tags: [Game]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste complète des parties
 *       403:
 *         description: Accès refusé
 */

router.get("/all-history", isAuthenticated, isAdmin, gameController.getAllHistory);


module.exports = router;