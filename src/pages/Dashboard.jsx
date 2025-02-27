import React, { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import Counter from "../components/Counter";
import RichTextEditor from "../components/RichTextEditor";
import UserForm from "../components/UserForm";
import UserChart from "../components/UserChart";
import UserData from "../components/UserData";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("userData");
      return saved
        ? JSON.parse(saved)
        : {
            id: uuidv4(),
            name: "",
            email: "",
            phone: "",
            address: "",
          };
    } catch (error) {
      return {
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
        address: "",
      };
    }
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Counter Component */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Counter />
          </Paper>
        </Grid>

        {/* Rich Text Editor Component */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <RichTextEditor />
          </Paper>
        </Grid>

        {/* User Form Component */}
        <Grid item xs={6}>
          <Paper sx={{ p: 1 }}>
            <UserForm formData={formData} setFormData={setFormData} />
          </Paper>
        </Grid>

        {/* User Data Component */}
        <Grid item xs={6}>
          <Paper sx={{ p: 1 }}>
            <UserData formData={formData} setFormData={setFormData} />
          </Paper>
        </Grid>

        {/* User Chart Component */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <UserChart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
