import { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AodOutlinedIcon from "@mui/icons-material/AodOutlined";
import { useReadOTP } from "react-read-otp";

import "./App.css";

const App = () => {
  const [otp, setOTP] = useState("");

  useReadOTP(setOTP);

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          signal: ac.signal,
          otp: { transport: ["sms"] },
        } as any)
        .then((otp: any) => {
          setOTP(otp?.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
  }, []);

  return (
    <Fragment>
      <header className="header">Auto Read OTP</header>
      <section className="container">
        <div className="icon-holder">
          <AodOutlinedIcon />
        </div>

        <h1>Verification</h1>
        <p>
          Enter the 6 digit <strong>OTP</strong> we sent via SMS
        </p>
        <TextField
          id="otp"
          label="Enter OTP"
          variant="outlined"
          className="otp-field"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />

        <Button variant="contained" className="verify-btn">
          Verify
        </Button>
      </section>
    </Fragment>
  );
};

export default App;
