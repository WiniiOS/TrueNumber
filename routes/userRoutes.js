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
 *     summary: Crée un nouvel utilisateur (Admin uniquement)
 *     description: |
 *       Permet à un administrateur de créer un nouveau compte utilisateur.
 *       Requiert un token JWT valide avec le rôle 'admin'
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Données de l'utilisateur à créer
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *           example:
 *             username: "john_doe"
 *             email: "john@example.com"
 *             password: "SecurePassword123!"
 *             phone: "+237612345678"
 *             role: "client"
 *             balance: 100
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               message: "Compte créé avec succès"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "507f1f77bcf86cd799439011"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 role: "client"
 *                 phone: "+237612345678"
 *                 balance: 100
 *                 createdAt: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             examples:
 *               existing_user:
 *                 value:
 *                   message: "Email ou nom d'utilisateur déjà utilisé"
 *               validation_error:
 *                 value:
 *                   message: "Le mot de passe doit contenir au moins 6 caractères"
 *       401:
 *         description: Non autorisé (token manquant/invalide)
 *       403:
 *         description: Accès refusé (rôle insuffisant)
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           pattern: '^[a-zA-Z0-9_]+$'
 *           example: "john_doe"
 *           description: Nom d'utilisateur unique (3-30 caractères alphanumériques)
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *           description: Adresse email valide et unique
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "SecurePassword123!"
 *           description: Mot de passe (minimum 6 caractères)
 *         phone:
 *           type: string
 *           pattern: '^\+\d{8,15}$'
 *           example: "+237612345678"
 *           description: Numéro de téléphone avec indicatif pays
 *         role:
 *           type: string
 *           enum: [client, admin]
 *           default: "client"
 *           example: "client"
 *           description: Rôle de l'utilisateur
 *         balance:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           example: 100
 *           description: Solde initial de points
 *     UserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *           description: JWT pour authentification
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             phone:
 *               type: string
 *             balance:
 *               type: number
 *             createdAt:
 *               type: string
 *               format: date-time
 */

router.post('/', isAuthenticated, isAdmin, userController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Modifie un utilisateur existant (Admin uniquement)
 *     description: |
 *       Permet à un administrateur de modifier les informations d'un utilisateur.
 *       Requiert un token JWT valide avec le rôle 'admin'
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