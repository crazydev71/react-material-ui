import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('BasicTable', theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    maxHeight: '400px'
  },
}));

class HistoryTable extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render () {
    const classes = this.props.classes;
    const data = this.props.dataSet
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
      {/*<TableCell>Action Key</TableCell>
              <TableCell>Action Data</TableCell>*/}
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell> {n.action} </TableCell>
      {/*<TableCell> {n.action_key} </TableCell>
                  <TableCell> {n.action_data} </TableCell>*/}
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