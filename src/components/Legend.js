import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const legendItems = [
  { name: 'Checked', color: '#7FFF00' },
  { name: 'To Check', color: '#FA8072' },
  { name: 'In Progress', color: '#FFFF00' },
  { name: 'To Do', color: '#A9A9A9' },
  { name: 'Not checked or no PR from student', color: '#FF0000' },
];

class Legend extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.legend}>
        {legendItems.map(i => (
          <Chip
            label={i.name}
            style={
                    {
                      backgroundColor: i.color,
                    }
                  }
          />
        ))}
      </div>
    );
  }
}

const styles = {
  legend: {
    textAlign: 'center',
    margin: 5,
  },
};

export default withStyles(styles)(Legend);
