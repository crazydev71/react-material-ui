import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,  } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styleSheet = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

class HistoryTable extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render () {
    const classes = this.props.classes;
    const data = this.props.dataSet
    return (
      <Paper className={classes.paper} elevation={10} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell> {n.action} </TableCell>
                  <TableCell> {n.created_at} </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );  
  }
}

HistoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(HistoryTable);