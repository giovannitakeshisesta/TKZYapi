const express = require("express");
const router = express.Router();
const upload = require('./storage.config');


const authMiddleware  = require('../middlewares/auth.middleware')
const usersController = require('../controllers/users.controller')
const authController  = require('../controllers/auth.controller')
const menuController  = require('../controllers/MenuFormController')
const dNdMenuController  = require('../controllers/DNDmenu.controller')
const orderController  = require('../controllers/Order.Controller')

router.get('/', (req, res, next) => {
  console.log('hola desde routes Api');
  res.status(200).json({ ok: true })
})

/* Auth */
router.post('/login', authMiddleware.isNotAuthenticated, authController.login)

/* Users */
router.post('/users',    authController.create)
router.get('/users/me',  authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', usersController.getUserById)

/* Menu */
router.post ('/menu',      upload.single('image'), menuController.create)
router.get  ('/menu',      menuController.find)
router.get  ('/menu/:id',  menuController.findByIdMenu)
router.delete('/menu/:id', menuController.findByIdAndDeleteMenu)
router.patch('/menu/:id',  upload.single('image'),menuController.findByIdAndUpdate)

/* DND Menu */
router.post ('/dndmenu',  dNdMenuController.createDNDmenu) // to do only once
router.get  ('/dndmenu',  dNdMenuController.findDNDmenu)
router.patch('/dndmenu',  dNdMenuController.patchDNDmenu)

/* Holder */
router.post('/holder',  orderController.createHolder) // to do only once
router.get ('/holder',  orderController.getHolder)
router.put ('/holder',  orderController.putHolder)

/* Order */
router.post('/orders/create',  orderController.createOrder)
router.patch('/orders/:id',    orderController.patchOrder)
router.delete('/orders/:id',   orderController.deleteOrder)
router.patch('/orders/isdone/:id', orderController.editIsDone)
router.get('/orders/',         orderController.getOrders)


module.exports = router

