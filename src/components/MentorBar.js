import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import PersonOutline from '@material-ui/icons/PersonOutline';

class MentorBar extends Component {
  render() {
    const { classes, mentor } = this.props;
    return (
      <div className={classes.root}>
        <PersonOutline />
        <Link href={mentor.github} underline="none">
          <Typography variant="h6" color="inherit">
            {mentor.fullName}
          </Typography>
        </Link>
      </div>
    );
  }
}

const styles = {
  root: {
    alignSelf: 'center',
    margin: 10,
    display: 'flex',
  },
};

export default connect(
  store => ({
    mentor: store.currentMentor,
  }),
)(withStyles(styles)(MentorBar));
