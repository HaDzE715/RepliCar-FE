import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import axios from "axios"; // Import axios
import "../Style/ContactUs.css"; // Ensure this import is correct

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

export default function ContactMeForm() {
  const [rtl] = React.useState(true); // Set initial state to true for Hebrew RTL
  const [clientType, setClientType] = React.useState("private");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      clientType: formData.get("clientType"),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact`,
        data
      ); // Replace with your backend URL
      if (response.status === 200) {
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email");
    }
  };

  return (
    <div className="form-container">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 4, // Margin from top and bottom
          mx: 2, // Margin from sides
        }}
      >
        <CacheProvider value={rtl ? rtlCache : ltrCache}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontFamily: "Noto Sans Hebrew" }}
          >
            צרו קשר
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ mb: 4, fontFamily: "Noto Sans Hebrew", textAlign: "center" }}
            dir={rtl ? "rtl" : ""}
          >
            השאירו פרטים וניצור קשר בהקדם האפשרי.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: "500px",
            }}
            dir={rtl ? "rtl" : ""}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
              }}
            >
              <TextField
                name="firstName"
                label="שם פרטי"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <TextField
                name="lastName"
                label="שם משפחה"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
            </Box>
            <TextField
              name="phone"
              label="טלפון"
              type="tel"
              variant="standard"
              fullWidth
              required
              sx={{
                mb: 2,
                "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
              }}
              InputLabelProps={{
                className: rtl ? "rtl-asterisk" : "",
                sx: { fontFamily: "Noto Sans Hebrew" },
              }}
            />
            <TextField
              name="email"
              label='כתובת דוא"ל'
              type="email"
              variant="standard"
              fullWidth
              required
              sx={{
                mb: 2,
                "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
              }}
              InputLabelProps={{
                className: rtl ? "rtl-asterisk" : "",
                sx: { fontFamily: "Noto Sans Hebrew" },
              }}
            />
            <RadioGroup
              name="clientType"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mb: 2,
              }}
            >
              <FormControlLabel
                value="private"
                control={<Radio sx={{ fontFamily: "Noto Sans Hebrew" }} />}
                label="אני לקוח פרטי"
                sx={{
                  fontFamily: "Noto Sans Hebrew",
                  "& .MuiFormControlLabel-label": {
                    fontFamily: "Noto Sans Hebrew",
                  },
                }}
              />
              <FormControlLabel
                value="business"
                control={<Radio sx={{ fontFamily: "Noto Sans Hebrew" }} />}
                label="אני לקוח עסקי"
                sx={{
                  fontFamily: "Noto Sans Hebrew",
                  "& .MuiFormControlLabel-label": {
                    fontFamily: "Noto Sans Hebrew",
                  },
                }}
              />
            </RadioGroup>
            <TextField
              name="message"
              label="הודעה"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
              sx={{
                mb: 2,
                "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
              }}
              InputLabelProps={{
                className: rtl ? "rtl-asterisk" : "",
                sx: { fontFamily: "Noto Sans Hebrew" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "black", 
                color: "white", 
                fontFamily: "Noto Sans Hebrew", 
                "&:hover": {
                  backgroundColor: "darkgrey",
                },
              }}
            >
              שלח
            </Button>
          </Box>
        </CacheProvider>
      </Box>
    </div>
  );
}
