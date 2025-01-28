import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

const DailySalesSummary = () => {
  const [revenueToday, setRevenueToday] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [productsSoldToday, setProductsSoldToday] = useState(0);

  useEffect(() => {
    const fetchDailySales = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );
        const orders = response.data;

        // Get today's date in ISO format
        const today = new Date().toISOString().slice(0, 10);

        // Filter orders for today
        const todaysOrders = orders.filter((order) =>
          new Date(order.createdAt).toISOString().startsWith(today)
        );

        // Calculate metrics
        const revenue = todaysOrders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );
        const totalProducts = todaysOrders.reduce(
          (sum, order) =>
            sum +
            order.products.reduce(
              (productSum, item) => productSum + item.quantity,
              0
            ),
          0
        );

        setRevenueToday(revenue);
        setOrdersToday(todaysOrders.length);
        setProductsSoldToday(totalProducts);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchDailySales();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Daily Sales Summary
      </Typography>
      <Grid container spacing={3}>
        {/* Total Revenue Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#d1e7dd" }}>
            <CardContent>
              <Typography variant="h6">Revenue Today</Typography>
              <Typography variant="h4">
                {revenueToday.toLocaleString()}₪
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Orders Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#cff4fc" }}>
            <CardContent>
              <Typography variant="h6">Orders Today</Typography>
              <Typography variant="h4">{ordersToday}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Products Sold Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#f8d7da" }}>
            <CardContent>
              <Typography variant="h6">Products Sold Today</Typography>
              <Typography variant="h4">{productsSoldToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DailySalesSummary;
