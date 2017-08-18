import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import { FormLabel, FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    padding: 2
  },
  button: {
    marginRight: 10
  },
  radioLabel: {
    padding: 10
  }
});

class TwilioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'male',
      comment: '',
    }
  }

  render () {
    const { onCancel, onSubmit, classes } = this.props;
    return (
      <div className={classes.container}>
        <RadioGroup
          aria-label="Gender"
          selectedValue={this.state.gender}
          onChange={(event, value) => this.setState({gender: value})}
          row
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup><br/>
        <TextField
          label="Comment"
          multiline
          rows={4}
          rowsMax={4}
          value={this.state.comment}
          onChange={(event)=>{this.setState({comment: event.target.value})}}
          className={classes.textField}
          margin="normal"
          fullWidth
        />

        <Button onClick={() => onSubmit(this.state)} raised dense color="primary" className={classes.button}>
          Send Message
        </Button>
        <Button onClick={onCancel} raised color="accent" dense className={classes.button}>
          Cancel
        </Button>
      </div>
    );
  }
}

export default connect()(withStyles(styleSheet)(TwilioForm));