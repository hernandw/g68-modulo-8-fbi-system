import express from 'express';
import { home, loginForm, registerForm, contactForm, admin } from '../controllers/userController.js'
const router = express.Router()

router.get('/', home)

router.get('/login', loginForm)
router.get('/register', registerForm)
router.get('/contact', contactForm)
router.get('/admin', admin)

router.get('*', (req, res)=>{
res.send('404 - page not found')
})


export default router