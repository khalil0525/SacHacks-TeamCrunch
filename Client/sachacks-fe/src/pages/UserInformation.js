import {
  Grid,
  CssBaseline,
  Button,
  Card,
  CardMedia,
  makeStyles,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
// }));

const UserInformation = (props) => {
  // const classes = useStyles();
  return (
    <Grid container>
      <Card>
        <CardMedia image="/images/placeholder.png" />
        <CardMedia image="/images/placeholder.png" />
        <CardMedia image="/images/placeholder.png" />
      </Card>
    </Grid>
  );
};

export default UserInformation;
