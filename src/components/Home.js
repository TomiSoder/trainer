import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Home(){

    return (
        <div
        className="ag-theme-material"
        style={{
          height: '700px',
          width: '80%',
          margin: 'auto' }}
        >
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            </Box>
            <p>Welcome to Personal trainer page!</p>
        </div>
    )
}