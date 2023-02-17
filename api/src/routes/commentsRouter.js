const { Router } = require("express");
const axios = require("axios");
const { getComments, allCommentsByDoc } = require("../controllers/commentsController");
const { Comments } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const commentsInfo = await getComments();
    console.log(commentsInfo);
    if (!commentsInfo.length) {
      res.status(404).send("No comments in data base");
    } else {
      res.status(200).send(commentsInfo);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/commentsDoctor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if(!id){
      res.status(404).send("id not found")
    }
    const commentsDoctor = await allCommentsByDoc(id);
    if(commentsDoctor){
      res.status(200).send(commentsDoctor);
    } else {
      res.status(404).send('El doctor no tiene comentarios')
    }
  } catch (error) {
    res.status(404).send({error: error.message}, 'Error de get commentsDoctor')
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await getComments();

    if (id) {
      const commentsById = await Comments.findByPk(id);
      if (commentsById) {
        res.status(200).json(commentsById);
      } else {
        res.status(404).send("Comment not found");
      }
    } else {
      res.status(404).send("No se encontró el id por params");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { message, doctorId, patientId} = req.body;
    if (message) {
      const comment = await Comments.create({
        message: message,
      });

      await comment.setDoctor(doctorId);
      await comment.setPatient(patientId);

      res.status(200).send("Comment create successfully");
    } else {
      res.status(404).send("Fantaron datos para crear el comentario");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    if (id) {
      if(message){
        const findComment = await Comments.findByPk(id);
        await findComment.update(
          {
            message,
          },
          { where: { id: id } }
        );
        res.status(200).send("Comentario modificado con exito");
      } else {
        res.status(404).send("Error al modificar el comentario");
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, "Entro al error del put");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commentsDelete = await Comments.findByPk(id);
    if (!commentsDelete) {
      res.status(404).send("Comment not found");
    } else {
      commentsDelete.destroy();// esto no sino que poner estado en activo en false
      res.status(200).send("Comment delete successfully");
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, "Entro al error del delete");
  }
});

module.exports = router;
