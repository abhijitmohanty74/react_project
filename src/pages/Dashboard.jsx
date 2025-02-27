import { Container, Grid, Paper } from "@mui/material"
import Counter from "../components/Counter"
import RichTextEditor from "../components/RichTextEditor"
import UserForm from "../components/UserForm"
import UserChart from "../components/UserChart"
import UserData from "../components/UserData"

const Dashboard = () => (
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

      {/* User Forms (Two side-by-side forms) */}
      {/* <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <UserForm />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <UserForm />
        </Paper>
      </Grid> */}
      <Grid item xs={6}>
  <Paper sx={{ p: 1 }}>
    <UserForm />
  </Paper>
  </Grid>
  <Grid item xs={6}>
    <Paper sx={{ p: 1 }}>
      <UserData />
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
)

export default Dashboard
