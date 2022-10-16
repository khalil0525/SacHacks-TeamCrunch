import { Grid, Card, Input, CardActionArea, InputBase } from "@mui/material";

const ReceiptUpload = (props) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Card sx={{ width: 140, height: 140 }}>
        <CardActionArea>
          <input type="file" onChange={() => console.log("changed")} />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ReceiptUpload;
