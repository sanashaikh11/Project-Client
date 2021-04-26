import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppTopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ANSWER NOW
          </Typography>

          <Button color="inherit" component={Link} to="/jobs" style={{
            color: "white",
          }}>JOBS</Button>

          <Button color="inherit" component={Link} to="/companies" style={{
            color: "white",
          }}>COMPANIES</Button>

          <Button color="inherit" component={Link} to="/question" style={{
            color: "white",
          }}>QUESTIONS</Button>

          <Button color="inherit" component={Link} to="/tag" style={{
            color: "white",
          }}>Tag</Button>

          <Button color="inherit" component={Link} to="/category" style={{
            color: "white",
          }}>Category</Button>
          <Button color="inherit" component={Link} to="/about" style={{
            color: "white",
          }}>ABOUT</Button>
          <Button color="inherit" component={Link} to="/newhome" style={{
            color: "white",
          }}>REGISTER</Button>
          <Button color="inherit" component={Link} to="/login" style={{
            color: "white",
          }}>LOGIN</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
