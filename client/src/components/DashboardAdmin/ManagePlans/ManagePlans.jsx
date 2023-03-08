import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  postPlans,
  plansGetAll,
  deletePlan,
  plansEditById,
  logicDeletePlan,
  plansGetById,
} from "../../../redux/reducers/plansReducer.js";
//style
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "18rem",
  height: "20rem",
}));
const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};
const gridContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "auto",
};
//MODAL
const modalContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modal = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "500px",
  width: "100%",
  padding: "2rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const divsitos = {
  paddingLeft: "0.2rem",

  display: "flex",
  flexDirection: "row",
  gap: "5px",
  justifyContent: "start",
};
const divsitoButton = {
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  justifyContent: "center",
};
const divsitoCaract = {
  paddingLeft: "0.2rem",
  display: "flex",
  flexDirection: "column",
  textAlign: "start",
};
const ManagePlans = () => {
  //estado de alertas!!!!
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  //Estado de open modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  //estado para postear
  const [data, setData] = useState({
    name: "",
    price: "",
    detail: "",
    durationMonths: "",
  });
  const dispatch = useDispatch();
  //leo mi state ALL
  const dataPlans = useSelector((state) => state.plans.listAll);
  //leo mi state DETAIL(modificar)
  const planDetail = useSelector((state) => state.plans.detail);
  const [oldData, setOldData] = useState({
    name: "",
    price: "",
    detail: "",
    durationMonths: "",
  });
  //modifico detail
  const handlerDetail = (str) => {
    const detailParts = str.split("- ");
    const first = detailParts[0];
    const second = detailParts[1];
    return { first, second };
  };
  const activadorOpen = () => {
    setIsOpen(true);
  };
  const activadorOpenEdit = async (id) => {
    //abre el modal
    setIsOpenForEdit(true);
    //le hago click y dispatcho ese plan a detail
    await dispatch(plansGetById(id));
  };
  //Editar un plan
  const handleEditPlan = async (e) => {
    e.preventDefault();
    await dispatch(plansEditById({ id: planDetail.id, data: oldData }));
    setIsOpenForEdit(false);
    dispatch(plansGetAll());
  };
  const handleChange = (evento) => {
    evento.preventDefault();
    setOldData({
      ...oldData,
      [evento.target.name]: evento.target.value,
    });
  };
  //eliminar un plan
  const handleDeletePlan = async (id) => {
    await dispatch(deletePlan(id));
    dispatch(plansGetAll());
  };
  //desactivar plan
  const handleDisablePlan = async (id) => {
    await dispatch(logicDeletePlan(id));
    dispatch(plansGetAll());
  };
  //activar plan
  const handleActivatePlan = async (id, data) => {
    await dispatch(plansEditById({ id, data: { state: "true" } }));
    dispatch(plansGetAll());
  };
  //postear un plan
  const handleInput = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleAddPlan = async (e) => {
    e.preventDefault();
    const response = await dispatch(postPlans(data));

    setIsOpen(false);
    dispatch(plansGetAll());
    setData({
      name: "",
      price: "",
      detail: "",
      durationMonths: "",
    });
    if (response.type === "plans/create/fulfilled") {
      setAlertSeverity("success");
      setAlertMessage("¡The plan was successfully added!");
      setShowAlert(true);
    } else {
      setAlertSeverity("error");
      setAlertMessage("There was an error when adding the plan.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (planDetail) {
      setOldData({
        name: planDetail.name,
        price: planDetail.price,
        detail: planDetail.detail,
        durationMonths: planDetail.durationMonths,
      });
    }
  }, [planDetail]);
  return (
    <div style={container}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            marginLeft: "5rem",
          }}
        >
          PLANS
        </Typography>
        <Button
          style={{ left: "50rem" }}
          onClick={() => dispatch(plansGetAll())}
        >
          Refresh
        </Button>
      </div>

      <Grid container style={gridContainer} gap={4}>
        {dataPlans.map((plan, index) => (
          <>
            <Grid key={plan.id}>
              <Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {plan.state === true ? (
                  <Typography
                    fontWeight="bold"
                    variant="h6"
                    style={{ backgroundColor: "#43B8C8" }}
                  >
                    {plan.name}
                  </Typography>
                ) : (
                  <Typography
                    fontWeight="bold"
                    variant="h6"
                    style={{ backgroundColor: "red" }}
                  >
                    {plan.name}
                  </Typography>
                )}
                <div style={divsitoCaract}>
                  <Typography fontWeight="bold">Features</Typography>

                  <Typography>{handlerDetail(plan.detail).first}</Typography>
                  <Typography>{handlerDetail(plan.detail).second}</Typography>
                </div>
                <div style={divsitos}>
                  <Typography fontWeight="bold">Price</Typography>
                  <Typography>${plan.price}</Typography>
                </div>
                <div style={divsitos}>
                  <Typography fontWeight="bold">Duration :</Typography>
                  <Typography>{plan.durationMonths} months</Typography>
                </div>

                <div style={divsitoButton}>
                  {plan.state === true ? (
                    <Button
                      variant="outlined"
                      onClick={() => handleDisablePlan(plan.id)}
                    >
                      DISABLE
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleActivatePlan(plan.id)}
                    >
                      ACTIVATE
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => activadorOpenEdit(plan.id)}
                  >
                    MODIFY
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    DELETE
                  </Button>
                </div>
              </Item>
            </Grid>
          </>
        ))}
      </Grid>
      <Button
        variant="contained"
        size="large"
        style={{ marginTop: "2rem" }}
        onClick={activadorOpen}
      >
        NEW PLAN
      </Button>
      {/* MODAL MODAL MODAL */}
      {isOpen && (
        <>
          <div style={overlay} onClick={() => setIsOpen(false)}></div>
          <div style={modalContainer}>
            <div style={modal}>
              <Typography variant="h5" style={{ marginBottom: "2rem" }}>
                Add a new plan
              </Typography>

              <form onSubmit={handleAddPlan}>
                <TextField
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Price"
                  name="price"
                  value={data.price}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Detail"
                  name="detail"
                  value={data.detail}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Duration (months)"
                  name="durationMonths"
                  value={data.durationMonths}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="button"
                    variant="outlined"
                    style={{ marginRight: "1rem" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleAddPlan}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {isOpenForEdit && (
        <>
          <div style={overlay} onClick={() => setIsOpenForEdit(false)}></div>
          <div style={modalContainer}>
            <div style={modal}>
              <Typography variant="h5" style={{ marginBottom: "2rem" }}>
                Modify a plan
              </Typography>
              <form onSubmit={handleEditPlan}>
                <TextField
                  label="Name"
                  defaultValue="Default Value"
                  name="name"
                  value={planDetail ? oldData.name : ""}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  name="price"
                  defaultValue="Default Value"
                  value={planDetail ? oldData.price : ""}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Detail"
                  name="detail"
                  defaultValue="Default Value"
                  value={planDetail ? oldData.detail : ""}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Duration (months)"
                  name="durationMonths"
                  defaultValue="Default Value"
                  value={planDetail ? oldData.durationMonths : ""}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="button"
                    variant="outlined"
                    style={{ marginRight: "1rem" }}
                    onClick={() => setIsOpenForEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleEditPlan}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePlans;
