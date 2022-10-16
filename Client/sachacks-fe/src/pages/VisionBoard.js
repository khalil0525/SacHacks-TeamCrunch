import React, { state, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const VisionBoard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const theme = createTheme();
  const amount = 2000;
  const thing = "phone";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" align="center">
            Vision Board
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Set Goals
        </Typography>
      </Container>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <h4>
            {" "}
            I want to commit to {amount} for {thing}
          </h4>
          <h4>Upload first image</h4>
          {selectedImage && (
            <Box>
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <Button
                variant="contained"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </Button>
            </Box>
          )}

          <br />

          <br />
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h4>
              I want to commit to {amount} for {thing}
            </h4>
            <h4>Upload second image</h4>
            {selectedImage1 && (
              <div>
                <img
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage1)}
                />
                <br />
                <button onClick={() => setSelectedImage1(null)}>Remove</button>
              </div>
            )}
            <br />

            <br />
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage1(event.target.files[0]);
              }}
            />
          </Item>
        </Grid>

        <Grid item xs={9}>
          <Item>
            <h4>
              I want to commit to {amount} for {thing}
            </h4>
            <h4>Upload third image</h4>
            {selectedImage2 && (
              <Box>
                <img
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage2)}
                />
                <br />
                <button onClick={() => setSelectedImage2(null)}>Remove</button>
              </Box>
            )}
            <br />

            <br />
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage2(event.target.files[0]);
              }}
            />
          </Item>
        </Grid>
      </Grid>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default VisionBoard;
