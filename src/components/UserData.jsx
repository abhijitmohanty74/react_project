import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const UserData = ({ formData, setFormData }) => {
  let valueUpdated = false;
  const [isDirty, setIsDirty] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const formAnimation = useSpring({
    from: { x: 0 },
    to: { x: 0 },
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (valueUpdated) {
      valueUpdated = false;
      setFormData((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, [valueUpdated]);

  const handleChange = (e) => {
    if (!isDirty) setIsDirty(true);
    if (e) {
      valueUpdated = true;
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("userData", JSON.stringify(formData));
      setIsDirty(false);
      setShowDialog(true);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
      <animated.form style={formAnimation} onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            placeholder="john@example.com"
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            placeholder="+1 234 567 890"
          />

          <TextField
            label="Address"
            name="address"
            multiline
            rows={4}
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            placeholder="Enter your complete address"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, alignSelf: "flex-start" }}
          >
            Save Profile
          </Button>
        </Box>
      </animated.form>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>User data saved successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserData;
