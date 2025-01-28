import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";

const RotatableCircle = () => {
  const [dailyRevenue, setDailyRevenue] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [daysInMonth, setDaysInMonth] = useState(31);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[new Date().getMonth()];

  useEffect(() => {
    // Determine the current month's number of days
    const date = new Date();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth(days);

    // Fetch revenue data
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );
        const orders = response.data;

        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Months are 0-indexed (0 = January)
        const currentYear = currentDate.getFullYear();

        // Group revenue by day for the current month
        const revenueByDay = {};

        orders.forEach((order) => {
          if (!order.createdAt || !order.totalPrice) return; // Skip invalid orders

          const orderDate = new Date(order.createdAt);
          const orderMonth = orderDate.getMonth();
          const orderYear = orderDate.getFullYear();

          // Only include orders from the current month and year
          if (orderMonth === currentMonth && orderYear === currentYear) {
            const day = orderDate.getUTCDate(); // Get the day of the month (1-31)

            if (!revenueByDay[day]) {
              revenueByDay[day] = 0; // Initialize if not present
            }

            revenueByDay[day] += order.totalPrice; // Sum totalPrice
          }
        });

        console.log("Revenue by Day (Current Month):", revenueByDay); // Log to verify grouping
        setDailyRevenue(revenueByDay); // Update state

        // Default to the current day's revenue
        const currentDay = currentDate.getUTCDate();
        setTotalRevenue(revenueByDay[currentDay] || 0);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchRevenue();
  }, []);

  const handleRotation = (direction) => {
    const newRotation = rotation + direction * (360 / daysInMonth);
    setRotation(newRotation);

    let newDay = selectedDay + direction;
    if (newDay > daysInMonth) newDay = 1;
    if (newDay < 1) newDay = daysInMonth;

    setSelectedDay(newDay);
    setTotalRevenue(dailyRevenue[newDay] || 0);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
        position: "relative",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
      }}
    >
      {/* Subtitle */}
      <Typography
        variant="h6"
        sx={{
          color: "#0077b6", // Use the primary chart color
          fontWeight: "bold", // Make the subtitle stand out
          fontFamily: "'Poppins', sans-serif", // Modern font
          textAlign: "center", // Center the text
          marginBottom: "20px", // Space between subtitle and chart
          textTransform: "uppercase", // Optional: uppercase for emphasis
          letterSpacing: "1px", // Subtle letter spacing for elegance
        }}
      >
        Daily Revenue Breakdown for {currentMonthName}
      </Typography>
  
      {/* Donut Circle */}
      <Box
        sx={{
          position: "relative",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: `conic-gradient(#0077b6 ${
            selectedDay * (360 / daysInMonth)
          }deg, #90e0ef ${selectedDay * (360 / daysInMonth)}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px", // Space below the chart
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow for the donut
          border: "4px solid #e1e1e1", // Subtle border for definition
        }}
      >
        {/* Inner Control Circle */}
        <Box
          sx={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid #0077b6", // Accent border matching the chart
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#0077b6",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {selectedDay}
          </Typography>
        </Box>
      </Box>
  
      {/* Arrows for Navigation */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="220px"
        sx={{
          marginBottom: "20px", // Space below the arrows
        }}
      >
        <IconButton onClick={() => handleRotation(-1)}>
          <ArrowBack sx={{ color: "#0077b6" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Day {selectedDay}
        </Typography>
        <IconButton onClick={() => handleRotation(1)}>
          <ArrowForward sx={{ color: "#0077b6" }} />
        </IconButton>
      </Box>
  
      {/* Revenue Display */}
      <Typography
        variant="h4"
        sx={{
          color: "#0077b6",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
        }}
      >
        {totalRevenue.toLocaleString()}₪
      </Typography>
    </Box>
  );
};

export default RotatableCircle;
