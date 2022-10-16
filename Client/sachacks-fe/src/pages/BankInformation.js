import React, { useCallback, useState, useEffect } from "react";
import PlaidLink from "../components/PlaidLink";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const BankInformation = (props) => {
  return (
    <>
      <PlaidLink />
      <Link to="/user">
        <Button>Next</Button>
      </Link>
    </>
  );
};

export default BankInformation;
