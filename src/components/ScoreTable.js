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
                <TableCell className={classes.cell}><Typography variant="title" gutterBottom>Task</Typography></TableCell>
                {
                  students.map(student => (
                    <TableCell align="center" className={classes.cell}>
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
                  <TableCell className={classes.cell}>
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
    maxWidth: '95%',
    overflowX: 'auto',
  },
  head: {
    backgroundColor: 'rgba(0, 255, 143, 0.2)',
    textAlign: 'center',
  },
  cell: {
    padding: '4px 24px 4px 24px', // rewrite defult TableCell style
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
