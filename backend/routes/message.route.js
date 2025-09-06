import express from 'express'
import { sendMessage,getMessage } from '../controllers/message.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const route = express.Router()

route.post('/send/:id',secureRoute,sendMessage)
route.get('/get/:id', secureRoute,getMessage)

export default route;