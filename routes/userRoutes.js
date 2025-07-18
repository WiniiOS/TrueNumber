const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/isAuthenticated');
const userController = require('../controllers/userController');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Récupère les infos de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Infos utilisateur
 */
router.get('/me', isAuthenticated, userController.getCurrentUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Liste tous les utilisateurs (Admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', isAuthenticated, isAdmin, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID (Admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 */
router.get('/:id', isAuthenticated, isAdmin, userController.getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crée un utilisateur (Admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/', isAuthenticated, isAdmin, userController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Modifie un utilisateur (Admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.put('/:id', isAuthenticated, isAdmin, userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur (Admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 */

router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;