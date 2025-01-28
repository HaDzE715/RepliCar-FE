import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";

const SalesOverview = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );
        const ordersData = response.data;

        setOrders(ordersData);
        setFilteredOrders(ordersData);
        calculateMetrics(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateMetrics = (data) => {
    const revenue = data.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );
    const productsSold = data.reduce(
      (sum, order) =>
        sum + order.products.reduce((pSum, p) => pSum + p.quantity, 0),
      0
    );

    setTotalRevenue(revenue);
    setTotalOrders(data.length);
    setTotalProductsSold(productsSold);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === "") {
      setFilteredOrders(orders);
      calculateMetrics(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          new Date(order.createdAt).toISOString().substring(0, 7) === month
      );
      setFilteredOrders(filtered);
      calculateMetrics(filtered);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Sales Overview
      </Typography>

      {/* Filter Section */}
      <TextField
        select
        label="Filter by Month"
        value={selectedMonth}
        onChange={handleMonthChange}
        fullWidth
        sx={{ marginBottom: "20px" }}
      >
        <MenuItem value="">All Months</MenuItem>
        {[
          ...new Set(
            orders.map((order) =>
              new Date(order.createdAt).toISOString().substring(0, 7)
            )
          ),
        ]
          .sort()
          .map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
      </TextField>

      {/* Metrics Display */}
      <Grid container spacing={3}>
        {/* Total Revenue */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#d1e7dd" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" color="green">
                {totalRevenue.toLocaleString()}₪
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#d1e7dd" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4" color="green">
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Products Sold */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#d1e7dd" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Products Sold
              </Typography>
              <Typography variant="h4" color="green">
                {totalProductsSold}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SalesOverview;
