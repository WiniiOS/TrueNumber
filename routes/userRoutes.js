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
 * /api/v1/users/{id}:
 *   put:
 *     summary: Modifie un utilisateur existant (Admin uniquement)
 *     description: |
 *       Permet à un administrateur de modifier les informations d'un utilisateur.
 *       ⚠️ Requiert un token JWT valide avec le rôle 'admin'
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: 507f1f77bcf86cd799439011
 *         description: ID MongoDB de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       description: Données utilisateur à mettre à jour
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           example:
 *             username: "nouveau_pseudo"
 *             email: "nouvel@email.com"
 *             phone: "+237612345678"
 *             role: "admin"
 *             balance: 500
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               _id: 507f1f77bcf86cd799439011
 *               username: "nouveau_pseudo"
 *               email: "nouvel@email.com"
 *               phone: "+237612345678"
 *               role: "admin"
 *               balance: 500
 *               createdAt: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Erreur de validation ou requête malformée
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Email invalide"
 *       401:
 *         description: Non autorisé (token manquant/invalide)
 *       403:
 *         description: Accès refusé (rôle insuffisant)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: "nouveau_pseudo"
 *           description: Nouveau nom d'utilisateur (doit être unique)
 *         email:
 *           type: string
 *           format: email
 *           example: "nouvel@email.com"
 *           description: Nouvelle adresse email (doit être unique)
 *         phone:
 *           type: string
 *           pattern: '^\+\d{8,15}$'
 *           example: "+237612345678"
 *           description: Nouveau numéro de téléphone avec indicatif
 *         role:
 *           type: string
 *           enum: [client, admin]
 *           example: "admin"
 *           description: Nouveau rôle de l'utilisateur
 *         balance:
 *           type: number
 *           minimum: 0
 *           example: 500
 *           description: Nouveau solde de points
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *         balance:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
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