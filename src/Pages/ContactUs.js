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
import axios from "axios";
import "../Style/ContactUs.css";
import ReactGA from "react-ga";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

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
      );
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
    <>
      {/* Banner at the top of the page */}
      <div
        style={{
          width: "100%",
          maxWidth: "100%", // Full width at the top
          margin: 0, // Remove margin to position at very top
          // marginTop:"10px",
          borderRadius: 0, // Remove border radius for full-width top positioning
          overflow: "hidden",
          background: "linear-gradient(135deg, #202020 0%, #353535 100%)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #6a6a6a, #949494)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "-15px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #949494, #c4c4c4)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px",
            position: "relative",
            zIndex: 5,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Text Container */}
          <div
            style={{
              flex: "1 1 300px",
              padding: "20px",
              textAlign: "right",
              direction: "rtl",
            }}
          >
            <h2
              style={{
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "15px",
              }}
            >
              צרו איתנו קשר
            </h2>

            <p
              style={{
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: "1.6",
                color: "#d9d9d9",
                marginBottom: "25px",
              }}
            >
              השאירו פרטים וניצור קשר בהקדם האפשרי. שירות הלקוחות שלנו זמין
              לענות על כל שאלה.
            </p>
          </div>

          {/* Animation Container */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "480px",
              minWidth: "300px",
              margin: "0 auto",
              background:
                "radial-gradient(circle, rgba(40,40,40,0.7) 0%, rgba(30,30,30,0) 70%)",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                boxShadow: "inset 0 0 15px rgba(200, 200, 200, 0.1)",
                pointerEvents: "none",
              }}
            />
            <DotLottieReact
              src="https://lottie.host/20aacf93-e339-40b5-af0b-2183c9eb81a0/bfUM3a9JOn.lottie"
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
                filter: "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: "15px 20px",
            background: "rgba(0, 0, 0, 0.4)",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            direction: "rtl",
          }}
        ></div>
      </div>

      {/* Contact Form Section */}
      <div className="form-container" style={{ padding: "40px 20px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "500px",
            margin: "0 auto",
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
              sx={{
                mb: 4,
                fontFamily: "Noto Sans Hebrew",
                textAlign: "center",
              }}
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
    </>
  );
}
