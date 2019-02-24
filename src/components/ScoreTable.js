import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import ScoreCell from './ScoreCell';
import Legend from './Legend';

class ScoreTable extends Component {
  render() {
    const { classes, students, tasks } = this.props;
    if (!(typeof (students) === 'undefined')) {
      return (
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell align="center"><Typography variant="title" gutterBottom>Task</Typography></TableCell>
                {
                  students.map(student => (
                    <TableCell>
                      <Link href={student.github} underline="none">
                        <Typography variant="title" gutterBottom key={student.nickname}>{student.nickname}</Typography>
                      </Link>
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(task => (
                <TableRow>
                  <TableCell>
                    <Link href={task.link} underline="none">
                      <Typography variant="title">{task.name}</Typography>
                    </Link>
                  </TableCell>
                  {students.map(student => (
                    <ScoreCell
                      task={task}
                      studentTasks={student.tasks}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Legend />
        </Paper>
      );
    }
    return (<div className={classes.notification}><Typography variant="title" gutterBottom>Please, select mentor</Typography></div>);
  }
}

const styles = {
  paper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  head: {
    backgroundColor: 'rgba(0, 255, 143, 0.2)',
  },
  notification: {
    textAlign: 'center',
  },
};

export default connect(
  store => ({
    students: store.currentMentor.students,
    tasks: store.tasks,
  }),
)(withStyles(styles, { withTheme: true })(ScoreTable));
