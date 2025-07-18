const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuthenticated = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         username:
 *           type: string
 *           example: "john_doe"
 *           description: Nom d'utilisateur unique
 *         email:
 *           type: string
 *           format: email
 *           example: "john@highreference.com"
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePassword123!"
 *           minLength: 6
 *           description: Mot de passe (min 6 caractères)
 *         phone:
 *           type: string
 *           example: "+237612345678"
 *           description: Numéro de téléphone avec indicatif
 * 
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john@highreference.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePassword123!"
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *           description: JWT token pour authentification
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
 *               enum: [client, admin]
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     description: Crée un compte utilisateur pour l'application TrueNumber
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Compte créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               message: "Compte créé avec succès"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "507f1f77bcf86cd799439011"
 *                 username: "john_doe"
 *                 email: "john@highreference.com"
 *                 role: "client"
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
 *                   message: "Erreur de validation des données"
 */

router.post("/register", authController.register);
 
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Authentifie un utilisateur et retourne un JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "507f1f77bcf86cd799439011"
 *                 username: "john_doe"
 *                 email: "john@highreference.com"
 *                 role: "client"
 *       401:
 *         description: Authentification échouée
 *         content:
 *           application/json:
 *             example:
 *               message: "Email ou mot de passe incorrect"
 */

router.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     description: Invalide le token JWT (implémentation côté client)
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             example:
 *               message: "Déconnexion réussie."
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             example:
 *               message: "Non autorisé. Aucun token fourni."
 */

router.post("/logout", authController.logout);


module.exports = router;