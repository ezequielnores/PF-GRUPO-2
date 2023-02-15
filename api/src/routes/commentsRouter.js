const {Router} = require('express');
const axios = require('axios');
const { getComments } = require('../controllers/commentsController')
const { Comments } = require('../db.js');

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const commentsInfo = getComments();
        if(!commentsInfo){
            res.status(404).send('No comments in data base')
        } else {
            res.status(200).send(commentsInfo)
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const getById =  await getComments();

        if(id){
            const commentsById = getById.filter(
                (e) => e.id === id
            );
            if(commentsById){
                res.status(200).json(commentsById);
            } else {
                res.status(404).send('Comment not found')
            }
        } else {
            res.status(404).send('No se encontró el id por params')
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

router.post('/', async (req, res)=>{
    try {
        const { message } = req.body;
        if(message){
            const createComment = await Comments.create({
                message,
            });
            res.status(200).send('Comment create successfully')
        } else {
            res.status(404).send('Fantaron datos para crear el comentario')
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

router.put('/edit/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const { massage } = req.body;
        if(id){
            const findComment = await Comments.findByPk(id);
            await findComment.update(
                {
                 massage 
                }, 
                { where: { id: id } }
            );
            res.status(200).send('Comentario modificado con exito')
        } else {
            res.status(404).send('Faltan datos para modificar el comentario')
        }
    } catch (error) {
        res.status(404).json({error: error.massage}, 'Entro al error del put')
    }
});

router.delete('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const commentsDelete = await Comments.findByPk(id);
        if(!commentsDelete){
            res.status(404).send('Comment not found');
        } else {
            commentsDelete.destroy();
            res.status(200).send('Comment delete successfully');
        }
    } catch (error) {
        res.status(404).json({error: error.message}, 'Entro al error del delete')   
    }
});

