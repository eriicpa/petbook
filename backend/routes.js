import express from 'express';
import usuarioRouter from './Middleware/Usuario/usuarioRouter.js';
import newUser from './Middleware/Usuario/newUser.js';
import login, {verifyJWT} from './Middleware/Usuario/loginRouter.js';
import postRouter from './Middleware/Posts/postRouter.js';
import changePassword from './Middleware/Usuario/changePassword.js';
import commentPosts from './Middleware/Comentarios/comentarioRouter.js';
import statistics from './Middleware/Statistic/SatisticRouter.js';
import photo from './Middleware/Photos/photoRouter.js';

const router = express.Router();

router.use('/usuarios', verifyJWT, usuarioRouter);
router.use('/newUser', newUser);
router.use('/login', login);
router.use('/post', verifyJWT, postRouter);
// router.use('/post', postRouter);
router.use('/reset', changePassword);
router.use('/comments', verifyJWT, commentPosts);
router.use('/statistics', verifyJWT, statistics);
router.use('/photo', photo);


export default router;
