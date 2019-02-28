/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const statuses = {
  Checked: '#7FFF00',
  Checking: '#FA8072',
  'In Progress': '#FFFF00',
  ToDo: '#A9A9A9',
  NoMark: '#FF0000',
};

class ScoreCell extends Component {
  constructor(props) {
    super(props);
    this.getScore = this.getScore.bind(this);
    this.getBackground = this.getBackground.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getScore(t, st) {
    return (typeof st === 'undefined')
      ? ''
      : typeof (st.find(ta => ta.task === t.name)) === 'undefined'
        ? ''
        : st.find(ta => ta.task === t.name).score;
  }

  getBackground(task, studentTasks) {
    const score = this.getScore(task, studentTasks);
    const taskStatus = task.status;
    if (score !== '') return statuses.Checked;
    if (score === '' && taskStatus === 'Checked') return statuses.NoMark;
    return statuses[taskStatus];
  }

  render() {
    const { task, studentTasks, classes } = this.props;
    return (
      <TableCell
        className={classes.cell}
        align="center"
        style={
        {
          backgroundColor: this.getBackground(task, studentTasks),
        }
      }
      >
        <Typography variant="button" gutterBottom>
          {this.getScore(task, studentTasks)}
        </Typography>
      </TableCell>
    );
  }
}

const styles = {
  cell: {
    padding: '4px 24px 4px 24px',
  },
};

export default withStyles(styles)(ScoreCell);
