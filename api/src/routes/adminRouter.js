const { Router } = require("express");
const axios = require("axios");
const { Admin } = require("../db.js");
const { findByMail } = require("../controllers/adminController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await Admin.findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByPk(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
    // const { id } = req.params;
    // const allAdmin = getAdmins();
    // if (id) {
    //   const adminById = allAdmin.filter((e) => {
    //     e.id === id;
    //   });
    //   if (adminById) {
    //     res.status(200).send(adminById);
    //   } else {
    //     res.status(404).send("No found admin with this ID");
    //   }
    // } else {
    //   res.status(404).send("No se encontro el id por params");
    // }
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
      const newAdmin = await Admin.create({
        name,
        surname,
        mail,
        password,
      });
      res.status(200).send(newAdmin);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const params = req.body;
    delete params.id;

    await Admin.update(params, { where: { id: id } })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    // const { id } = req.params;
    // const { name, surname, mail, password } = req.body;
    // if (id && name && surname && mail && password) {
    //   const findAdmin = await Admin.findByPk(id);
    //   console.log(findAdmin);
    //   if (findAdmin) {
    //     await findAdmin.update(
    //       {
    //         name,
    //         surname,
    //         mail,
    //         password,
    //       },
    //       { where: { id: id } }
    //     );
    //     res.status(200).send("Admin modificado con exito");
    //   } else {
    //     res.status(404).send("Id no encontrado");
    //   }
    // } else {
    //   res.status(404).send("faltan datos para modificar el Admin");
    // }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/disable/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) res.status(404).send("Admin not found");
      if(admin.active === true) {
        await admin.update({ active: false }, { where: { id: id } });
        res.status(200).send("Admin disable successfully");
      } else {
        await admin.update({ active: true }, { where: { id: id } });
        res.status(200).send("Admin active successfully");
      }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.destroy({ where: { id: id } })
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
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
