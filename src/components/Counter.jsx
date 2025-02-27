import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Counter = () => {
  const [count, setCount] = useState(
    () => {
    const saved = localStorage.getItem("count");
    return saved && !isNaN(saved)? Number.parseInt(saved, 10) : 0;
  });

  const { height, backgroundColor } = useSpring({
    height: `${Math.min(100, Math.max(0, count * 10))}%`,
    backgroundColor: `hsl(${count * 10}, 70%, 60%)`,
    config: { tension: 170, friction: 26 },
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  return (
    <Box
      position="relative"
      height={200}
      border={1}
      borderRadius={2}
      overflow="hidden"
    >
      
      <animated.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
          backgroundColor,
        }}
      />
      <Box
        position="relative"
        zIndex={1}
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Typography variant="h3">{count}</Typography>
        <Typography variant="h6">Counter</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            disabled={count === 0}
            onClick={() => setCount((c) =>c > 0 && c - 1)}
          >
            <RemoveIcon />
          </Button>
          <Button variant="contained" size="small" onClick={() => setCount(0)}>
            <RestartAltIcon />
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setCount((c) => c + 1)}
            disabled={count === 10}
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;
