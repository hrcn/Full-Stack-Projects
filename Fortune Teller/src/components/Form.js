import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: 'auto'
    },
    textField: {
        margin: 'auto'
    },
    button: {
        marginTop: '20px'
    }
}

const genders = [
    {
        value: 'Male'
    },
    {
        value: 'Female'
    }
]

class Form extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        alert('Form Submitted!');

        // to do backend
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        // redux store
        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Personal Information
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="firstName" 
                            name="firstName"
                            label="FirstName"
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                        <TextField 
                            id="lastName" 
                            name="lastName"
                            label="LastName"
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                        <TextField 
                            id="select-gender"
                            select
                            label="Select"
                            className={classes.TextField}
                            value={genders}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Select Your Gender"
                            margin="normal">
                                {genders.map(option => (
                                    <MenuItem 
                                        key={option.value}
                                        value={option.value}>
                                            {option.value}
                                    </MenuItem>
                                ))}
                        </TextField>
                        

                        <br />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            className={classes.button}>
                                submit
                        </Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Form);