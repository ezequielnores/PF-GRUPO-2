const { Router } = require("express");
const axios = require("axios");
const { getAdmins } = require("../controllers/adminController");
const { Admin } = require("../db.js");
const { findByMail } = require("../controllers/adminController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allAdmins = await getAdmins();
    console.log(allAdmins);
    if (!allAdmins.length) {
      res.status(404).send("No admins in data base");
    } else {
      res.status(200).send(allAdmins);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// router.get("/", async (req, res) => {
//     try {
//         const { name } = req.query;
//         const allAdmins = await getAdmins();
//         console.log(allAdmins);
//         if(allAdmins.length){
//             if (name) {
//                 const adminName = await Admin.findOne({where: {name: name}});
//                 if(adminName.length){
//                     res.status(200).send(adminName)
//                 } else {
//                     res.status(404).send('Admin not found')
//                 }
//             } else {
//                 res.status(200).send(allAdmins)
//             }
//         } else {
//             res.status(404).send('No admins in DB')
//         }
//     } catch (error) {
//         console.log({ error: error.message })
//     }
// });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allAdmin = getAdmins();
    if (id) {
      const adminById = allAdmin.filter((e) => {
        e.id === id;
      });
      if (adminById) {
        res.status(200).send(adminById);
      } else {
        res.status(404).send("No found admin with this ID");
      }
    } else {
      res.status(404).send("No se encontro el id por params");
    }
  } catch (error) {
    res.status(404).json({ error: error.massage });
  }
});

router.post("/", async (req, res) => {
  const { name, surname, mail, password } = req.body;
  try {
    if (!name || !surname || !mail || !password) {
      res.status(404).send("No estan todos los datos requeridos");
    } else {
      const newAndmin = await Admin.create({
        name,
        surname,
        mail,
        password,
      });
      res.status(200).send("Admin create successfully");
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, mail, password } = req.body;
    if (id && name && surname && mail && password) {
      const findAdmin = await Admin.findByPk(id);
      console.log(findAdmin);
      if (findAdmin) {
        await findAdmin.update(
          {
            name,
            surname,
            mail,
            password,
          },
          { where: { id: id } }
        );
        res.status(200).send("Admin modificado con exito");
      } else {
        res.status(404).send("Id no encontrado");
      }
    } else {
      res.status(404).send("faltan datos para modificar el Admin");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const adminDelete = await Admin.findByPk(id);
    if (!adminDelete) {
      res.status(404).send("Admin not found");
    } else {
      adminDelete.update({ active: false }, { where: { id: id } });
      res.status(200).send("Admin delete successfully");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  await Admin.findOne({ where: { mail: mail } })
    .then((response) => {
      if (response.password == password) {
        delete response.password;
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Incorrect login information");
    });
});

router.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  await findByMail(mail)
    .then((response) => {
      if (response.password == password) {
        delete response.password;
        res.status(200).json(response);
      } else {
        res.status(200).send("Incorrect password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Incorrect login information");
    });
});

module.exports = router;
