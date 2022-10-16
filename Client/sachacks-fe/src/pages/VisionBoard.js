import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Grid,
} from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const VisionBoard = (props) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);
  const upload = (e) => {
    e.preventDefault();
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tcojxvly");

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/nabroleon/image/upload`,
          formData
        )
        .then((res) => {
          setImagesURL((prevState) => [...prevState, res.data.secure_url]);
        });
    });

    axios.all(uploaders).then(console.log(imagesURL));
  };

  useEffect(() => {
    if (imagesURL.length === 3) {
      axios.post("http://localhost:5000/api/goal", {
        img1: imagesURL[0],
        img2: imagesURL[1],
        img3: imagesURL[2],
        duration: duration,
        amount: amount,
      });
    }
  }, [imagesURL]);

  return (
    <>
      <label htmlFor="amount">Amount</label>
      <TextField
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        id="amount"
        label="Outlined"
      />
      <br />
      <br />
      <label htmlFor="duration">Duration</label>
      <TextField
        type="number"
        onChange={(e) => setDuration(e.target.value)}
        id="duration"
        label="Outlined"
      />

      {files.length !== 0 && (
        <Grid item xs={12} marginLeft={3}>
          <Grid container marginTop={3} gap={3}>
            {files.map((file) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(file)}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}

      <CardContent>
        <Grid container justify="center" alignItems="center">
          <input
            accept="image/*"
            multiple
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              setFiles(Array.from(e.target.files));
            }}
          />
          <label htmlFor="contained-button-file">
            <Fab component="span" onClick={() => inputRef.current.click()}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </Grid>
      </CardContent>
      <Button variant="outlined" onClick={upload}>
        Upload Images
      </Button>
    </>
  );
};

export default VisionBoard;
