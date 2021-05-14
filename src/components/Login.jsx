import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./login.css";
import { auth, provider } from "../firebase";
import { login } from "../features/appSlice";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
      auth.signInWithPopup(provider)
        .then(result =>{
            dispatch(login({
                userName: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
        }).catch(error =>{
            setErrorMsg(error.message)
            handleOpen();
        })
  };

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
          alt="snap pic"
        />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Error</h2>
            <p id="transition-modal-description">
              {errorMsg}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Login;
