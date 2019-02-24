import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Search from '../components/Search';
import ScoreTable from '../components/ScoreTable';
import MentorBar from '../components/MentorBar';

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Search />
        <MentorBar />
        <ScoreTable />
      </Paper>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    overflow: 'none',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(Main);
