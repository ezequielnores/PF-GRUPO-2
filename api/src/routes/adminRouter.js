const { Router } = require("express");
const axios = require("axios");
const { getAdmins } = require('../controllers/adminController')
const { Admins } = require('../db.js');

const router = Router();

router.get("/", async (req, res) => {
    console.log('prueba');
    try {
        const { name } = req.query;
        const allAdmins = await getAdmins();
        console.log(allAdmins);
        if (name) {
            const adminName = await allAdmins.filter((e)=>{
               e.name.toLowerCase().includes(name.toLowerCase())
            });
            if(adminName.length){
                res.status(200).send(adminName)
            } else {
                res.status(404).send('Admin not found')
            }
        } else {
            res.status(200).send(allAdmins)
        }
    } catch (error) {
        console.log({ error: error.message }, 'entro al error del get')
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const allAdmin = getAdmins();
        if(id){
            const adminById = allAdmin.filter((e) => {
                e.id === id
            });
            if(adminById){
                res.status(200).send(adminById);
            } else {
                res.status(404).send('No found admin with this ID');
            }
        } else {
            res.status(404).send('No se encontro el id por params')
        }
    } catch (error) {
        res.status(404).json({error: error.massage})
    }
});

router.post('/', async (req, res) => {
    const { name, surname, mail, password } = req.body;
    try {
        if(!name || !surname || !mail || !password){
            res.status(404).send('No estan todos los datos requeridos')
        } else {
            const newAndmin = await Admins.create({
                name,
                surname,
                mail,
                password
            });
            res.status(200).send('Admin create successfully')
        }
    } catch (error) {
        res.status(404).send({error: error.message})
    }
});

router.put('/edit/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { name, surname, mail, password } = req.body;
        if(id){
            const findAdmin = await Admins.findByPk(id);
            await findAdmin.update(
                {
                    name, 
                    surname, 
                    mail, 
                    password
                },
                { where: {id : id}} 
            );
            res.status(200).send('Admin modificado con exito')
        } else {
            res.status(404).send('faltan datos para modificar el Admin')
        }
    } catch (error) {
        res.status(404).json({error: error.massage}, 'Entro al error del put')
    }
});

router.delete('/delete/:id', async(req, res) => {
    const {id} =  req.params;
    try {
        const adminDelete = await Admins.findByPk(id);
        if(!adminDelete){
            res.status(404).send('Admin not found');
        } else {
            adminDelete.destroy();
            res.status(200).send('Admin delete successfully')
        }
    } catch (error) {
        res.status(404).json({error: error.message}, 'Entro al error del delete')
    }
});

module.exports = router;
