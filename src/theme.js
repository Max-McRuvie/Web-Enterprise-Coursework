// import blue from '@material-ui/core/colors/blue';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#CCCCCC',
          light: ' #f8f8f8',
          darkNavbar: '#272727',
          contrastText: '#ffffff',
        },
      },
    });

export default theme;