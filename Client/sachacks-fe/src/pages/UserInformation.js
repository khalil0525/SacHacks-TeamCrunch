import {
  Grid,
  CssBaseline,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  Box,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";

const UserInformation = (props) => {
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
    // declare the data fetching function

    const date = `${value["$y"]}-${value["$M"]}-${value["$D"]}`;
    console.log(date);
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/transactions?aggregate=true&startDate=${date}&endDate="2022-10-16"`
      );
      const data = await response.json();
      console.log(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [value]);
  const createData = (
    number,
    merchantName,
    thirtyDayAmountSpent,
    oneYearAmountSpentPrediction
  ) => {
    return {
      number,
      merchantName,
      thirtyDayAmountSpent,
      oneYearAmountSpentPrediction,
    };
  };
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Box
        sx={{
          marginLeft: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography>Vision Board</Typography>
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            gap: "30px",
            grow: 1,
          }}
        >
          <Card sx={{ width: 140, height: 140 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/images/placeholder.png"
              />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 140, height: 140 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/images/placeholder.png"
              />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 140, height: 140 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width="140"
                height="140"
                image="/images/placeholder.png"
              />
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ backgroundColor: "gray", padding: "20px", width: "300px" }}>
          <Typography>Goal: 4000$ for trip to Italy in 4 years</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          grow: 1,
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pick 30 day start date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell align="right">Merchant name</TableCell>
                  <TableCell align="right">Amount spent (30 days)</TableCell>
                  <TableCell align="right">
                    Estimated money spent (1 year)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>

                    <TableCell align="right">{row.merchantName}</TableCell>
                    <TableCell align="right">
                      {row.thirtyDayAmountSpent}
                    </TableCell>
                    <TableCell align="right">
                      {row.oneYearAmountSpentPrediction}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
  );
};

export default UserInformation;
