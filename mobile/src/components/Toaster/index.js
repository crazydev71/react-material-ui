import React, { Component } from 'react';
import { connect } from  'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styleSheet = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  success: {
    background: '#00C853',
    // opacity: 0.7
    fontSize: 15
  },
  warning: {
    background: '#EF6C00',
    // opacity: 0.7
    fontSize: 15
  },
  failed: {
    background: '#E53935',
    // opacity: 0.7
    fontSize: 15
  },
  message: {
    color: 'white'
  }
});

class Toaster extends Component {
  state = {
    open: false,
    message: null,
    status: 'success',
    duration: 3000
  };

  handleRequestClose = (event) => {
    this.setState({ open: false });
    this.props.dispatch(ToasterActions.hideToaster());
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    const { open, message, status, duration } = newProps;
    this.setState({ open, message, status, duration });
  }

  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.open}
        autoHideDuration={this.state.duration}
        onRequestClose={this.handleRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
          className: classes[this.state.status]
        }}
        message={<span id="message-id">{this.state.message}</span>}
        
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Toaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (state.toaster);

export default connect(mapStateToProps)(withStyles(styleSheet)(Toaster));

// action for showing toaster
const showToaster = (message, status, duration) => ({
  type: 'TOASTER_SHOW',
  payload: {
    open: true,
    message: message,
    status: status ? status : 'success',
    duration: duration ? duration : 3000
  }
});

const hideToaster = () => ({
  type: 'TOASTER_HIDE',
  payload: {
    open: false
  }
})

export const ToasterActions = {
  showToaster: showToaster,
  hideToaster: hideToaster
}