var express = require("express");
var router = express.Router();
const PlanController = require("../controllers/planController.js");

/* GET users listing. */

router.get("/", PlanController.getPlans);
router.get("/:id", PlanController.getPlanId);
router.get("/active", PlanController.getPlansActive);
router.post("/", PlanController.createPlan);
router.put("/:id", PlanController.editPlan);
router.delete("/:id", PlanController.deletePlan);
router.put("/disable/:id", PlanController.LogicDeletePlan);
module.exports = router;
