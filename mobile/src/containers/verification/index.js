import React from 'react'
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Grid, { GridItems } from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { ToasterActions } from '../../components/Toaster';
import { Loader } from '../../components';
import Logo from '../../assets/images/logo.png';

import {api, json} from '../../api';

const styleSheets = theme => ({
  logo: {
    maxHeight: 70,
    marginTop: 70,
  },
  container: {
    padding: 30
  },
  typography: {
    color: 'gray'
  },
  grid: {
    flexGrow: 1,
  }
});

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
			smsCode: '',
      waitingSMS: true,
      loading: false,
    };
		this.requestSMSCode = this.requestSMSCode.bind(this);
		this.verifySMSCode = this.verifySMSCode.bind(this);
  }
	
	requestSMSCode () {
		this.setState({
			loading: true
		});
		api.post('/requestsmscode', json({phone: this.state.phone})).then((res) => {
			this.setState({
				loading: false
			});
			
			if (!res.ok)
				return;
			
			this.setState({waitingSMS: true});
		});
	}
	
	verifySMSCode () {
		
		this.setState({ loading: true })
		
		api.post('/verifysmscode', json({smsCode: this.state.smsCode})).then((res) => {
			
			this.setState({ loading: false });
			
			if (!res.ok)
				return;
			
			this.props.dispatch(push('/dashboard/request'));
		});
	}

  render() {
		const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid 
          container
          justify="center"
          direction="column"
          align="center"
          className={classes.grid}
        >
					<img
						src={Logo}
						className={classes.logo}
					/>
          <Typography 
            type='title' 
            className={classes.typography} 
            align='center'
          >
            Massage that Travels
          </Typography>
			
          <Grid
            container
            justify="center"
            align="stretch"
            direction="column"
            className={classes.grid}
            style={{marginTop:10}}
          >
						<Typography
							type='subheading'
							style={{marginTop: 20}}
							align='center'
							color='accent'
						> 
							Verify with your phone
						</Typography>
						<TextField
							placeholder={`Phone Number ( e.g +14169671111 )`}
              value={this.state.phone}
              onChange={(event) => {this.setState({phone: event.target.value})}}
              label="Phone Number"
              margin="normal"
            />
					
						{!this.state.waitingSMS &&
							<Button 
								color="primary" title="Request SMS Code" 
								onClick={() => this.requestSMSCode()}
								raised
							>
								Request SMS Code
							</Button> 
						}
						{this.state.waitingSMS && 
							<Grid
								container
								direction='column'
								align='stretch'
								justify='center'
								style={{padding: 8}}
							>
								<Typography>
									Enter the SMS code or press&nbsp;
									<span
										onClick={() => this.requestSMSCode()}
										style={{color:'green'}}
									>
										resend
									</span>
								</Typography>
								
								<TextField 
									label='SMS Code ( e.g 620142 )'
									placeholder={`SMS Code ( e.g 620142 )`}
									value={this.state.smsCode} 
									onChange={ (event) => this.setState({ smsCode: event.target.value }) }
									margin='normal'
								/>
								<Button 
									color="primary" 
									title="Verify Account" 
									onClick={() => this.verifySMSCode()}
									raised
									dense
								>
									Verify Account
								</Button>
							</Grid>
						}
					</Grid>
					{this.state.loading && <Loader/>}
				</Grid>
			</div>
    );
  }
}

export default connect()(withStyles(styleSheets)(Verification));