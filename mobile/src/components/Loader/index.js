import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit
  },
});

const Loader = (props) => {
  const classes = props.classes;
  return (
    <CircularProgress className={classes.progress} size={50} />
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);