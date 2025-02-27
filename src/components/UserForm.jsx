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

const UserForm = () => {
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
    // Ensure ID is generated if not present
    if (!formData.id) {
      setFormData((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, []);

  const handleChange = (e) => {
    if (!isDirty) setIsDirty(true);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            label="JSON Object"
            value={JSON.stringify(formData, null, 2)}
            name="phone"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            placeholder="+1 234 567 890"
          />

          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            placeholder="John Doe"
          />
          <TextField
            label="User ID"
            value={formData.id || "Generating ID..."}
            disabled
            fullWidth
            variant="filled"
            InputLabelProps={{ shrink: true }}
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

export default UserForm;
