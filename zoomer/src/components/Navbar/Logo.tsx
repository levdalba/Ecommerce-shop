import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import myImage from "../../assets/zoomer.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <>
      <Link to="/">
        <img className={classes.logo} src={myImage} alt="My Image" />
      </Link>
    </>
  );
}

export default Logo;
