import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { Loader } from '../../components';
import Logo from '../../assets/images/logo.png';

import { api } from '../../api';

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

class Home extends React.Component {

	componentDidMount() {
		api.post('/auth').then((res) => {
			console.log(res);
			if (!res.ok) {
				this.props.dispatch(push('/login'));
			} else if (res.status === 200) {
				this.props.dispatch(push('/dashboard/request'));
			} else if (res.status === 203) {
				this.props.dispatch(push('/register/verify'));
			}
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
					<Typography
						type='body1'
						align='center' 
						className={classes.typography}
						style={{marginTop: 20}}
					> 
						Travel Areas in the 6ix 
					</Typography>
					
					<Typography 
						type='caption' 
						align='center' 
						className={classes.typography}
					>
						We service York, North-York, East York, Etobicoke, Scarborough, and Old Toronto
					</Typography>
					<Loader/>
				</Grid>
			</div>
		);
	}
}

export default connect()(withStyles(styleSheets)(Home));