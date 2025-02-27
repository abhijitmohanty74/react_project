import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Box, Typography } from "@mui/material"

const UserChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Generate mock data for the chart
    const mockData = Array.from({ length: 7 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    }))
    setData(mockData)
  }, [])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User Activity Trends
      </Typography>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Box>
  )
}

export default UserChart
