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
import axios from "axios";
const UserInformation = (props) => {
  const [value, setValue] = useState(new Date());
  const [chartData, setChartData] = useState();
  const [photoOne, setPhotoOne] = useState("/images/placeholder.png");
  const [photoTwo, setPhotoTwo] = useState("/images/placeholder.png");
  const [photoThree, setPhotoThree] = useState("/images/placeholder.png");
  const [totalYears, setTotalYears] = useState(10000);
  const [totalMoney, setTotalMoney] = useState(10);
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

  useEffect(() => {
    // declare the data fetching function

    const date = `${value["$y"]}-${value["$M"]}-${value["$D"]}`;

    const fetchData = async () => {
      if (value) {
        const response = await fetch(
          `http://localhost:5000/api/transactions?aggregate=true&startDate=${date}&endDate="2022-10-16"`
        );
        const data = await response.json();
        const response2 = await fetch("http://localhost:5000/api/goal");

        const data2 = await response2.json();
        setPhotoOne(data2.visionBoard[0].img_link);
        setPhotoTwo(data2.visionBoard[1].img_link);
        setPhotoThree(data2.visionBoard[2].img_link);
        setTotalYears(data2.commitment[0].duration);
        setTotalMoney(data2.commitment[0].amount);
        console.log(data2);
        setChartData(
          data.map((transaction, index) =>
            createData(
              index,
              transaction.merchant_name,
              transaction.amount,
              transaction.amount * 12 * data2.commitment[0].duration
            )
          )
        );
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [value]);

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
              <CardMedia component="img" height="140" image={photoOne} />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 140, height: 140 }}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={photoTwo} />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 140, height: 140 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width="140"
                height="140"
                image={photoThree}
              />
            </CardActionArea>
          </Card>
        </Box>
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            padding: "20px",
            width: "300px",
          }}
        >
          {totalMoney ? (
            <Typography>
              Goal: save ${totalMoney} for {totalYears} years
            </Typography>
          ) : (
            <Typography>No date range set</Typography>
          )}
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
                {chartData &&
                  chartData.map((row) => (
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
