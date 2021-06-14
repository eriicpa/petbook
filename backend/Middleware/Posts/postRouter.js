import express from 'express';
import db from './postQuery.js';
import multer from 'multer';
import multerConfig from '../../config/multer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await db.listPost();
  res.send(posts);
});

router.get('/:id_post', async (req, res) => {
  const {id_post} = req.params;

  const post = await db.listSpecificPost(id_post);

  if(post.length < 1) {
    return res.send('Postagem não foi encontrada.');
  }

  let newAccess = ++post[0].acessos;
  await db.updateAccessInPost(newAccess, id_post);
  res.send(post);
})

router.post('/', multer(multerConfig).single('file'), async (req, res) => {
  
  if(!global.loginData.auth){
    return res.send({'msg':'Usuário não está autenticado.'});
  }
  
  const {titulo_post, conteudo_post, peso, idade} = req.body;
  const user_id = global.loginData.users[0].id_usuario;
  let imagem = null;

  if(!!req.file) {
    imagem = req.file.path;
  }

  await db.createPost(titulo_post, conteudo_post, peso, idade, imagem, user_id);

  res.send('Postagem Realizada com Sucesso');
});

router.put('/:id_post', multer(multerConfig).single('file'), async (req, res) => {
  const {id_post} = req.params;
  const {titulo_post, conteudo_post, peso, idade} = req.body;
  let imagem = null;

  if(!!req.file) {
    imagem = req.file.path;
  }

  await db.updatePost(titulo_post, conteudo_post, peso, idade, imagem, id_post);

  res.send('Postagem Atualizada com Sucesso');
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const idUserAuth = global.loginData.users[0].id_usuario;

  const posts = await db.listPost();
  let canDelete = false;

  for(let post of posts) {
    if(post.id_post == id && post.FK_id_usuario == idUserAuth) {
      canDelete = true;
    }
  }

  if(canDelete) {
    await db.deletePost(id);
    return res.send('Excluido com sucesso');
  }else {
    res.send('Ação não permitida.');
  }
})


export default router;