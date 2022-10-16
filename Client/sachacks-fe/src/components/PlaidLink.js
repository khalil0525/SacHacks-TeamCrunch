import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";

function PlaidLink() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch(
        "http://localhost:5000/api/accounts/initial_token"
      );
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    //TODO: Start showing loading screen
    const result = fetch("http://localhost:5000/api/accounts/public_token", {
      method: "POST",
      body: JSON.stringify({
        publicToken: publicToken,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(result.json());
  }, []);

  const { open, ready } = usePlaidLink({ token, onSuccess });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Your Bank Account
    </button>
  );
}

export default PlaidLink;
