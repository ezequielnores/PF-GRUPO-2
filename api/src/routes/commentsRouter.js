const { Router } = require("express");
const axios = require("axios");
const { getComments, allCommentsByDoc, allCommentsByPatient, containOffensiveWords } = require("../controllers/commentsController");
const { Comments } = require("../db.js");
// const BadWords = require('bad-words');

const router = Router();
// const filter = new BadWords();



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

//-------------------------- trae los comentario por Doctor
router.get('/doctor/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id ruta: ' + id)
  try {
    if(id){
      const commentsDoctor = await allCommentsByDoc(id);
      if(commentsDoctor.length){
        res.status(200).send(commentsDoctor);
      } else {
        res.status(404).send('The doctor has no comments')
      }
    } else {
      res.status(404).send("Id not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, 'Error get doctor/:id')
  }
}); 

//-------------------------- trae los comentario por Paciente
router.get('/patient/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if(id){
      const commentsPatient = await allCommentsByPatient(id);
      if(commentsPatient.length){
        res.status(200).send(commentsPatient);
      } else {
        res.status(404).send('The patient has no comments')
      }
    } else {
      res.status(404).send("Id not found")
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, 'Error get patient/:id')
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
      res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message }, 'Error de get id');
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, message, rating, doctorId, patientId} = req.body;
    if (message) {
      const filterMessage = containOffensiveWords(message);
      const comment = await Comments.create({
        title: title,
        message: filterMessage,
        rating: rating,
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
