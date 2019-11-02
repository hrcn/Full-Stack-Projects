import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { DropzoneArea } from 'material-ui-dropzone'

const styles = {
    form: {
        textAlign: 'center',
        color: ''
    },
    pageTitle: {
        margin: 'auto',
    },
    textField: {
        margin: 'auto',
        marginTop: '5px',
        width: 300
    },
    selectField: {
        marginTop: '20px',
        width: 300
    },
    button: {
        marginTop: '20px',
        width: 300
    },
    input: {
        marginTop: '20px',
    },
    dropZone: {
        marginTop: '50px',
        width: 450
    }
}

const genders = [
    {
        value: 'Male',
        label: 'Male'
    },
    {
        value: 'Female',
        label: 'Female'
    }
]

class Form extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            faceImage: [],
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

    handleImageUpload = (files) => {
        this.setState({
            faceImage: files
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Personal Info
                    </Typography>
                    <form noValidate className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            required
                            name="firstName"
                            label="First Name"
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        
                        <TextField
                            required
                            name="lastName"
                            label="Last Name"
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        
                        <TextField
                            required
                            select
                            name="gender"
                            label="Select Your Gender"
                            className={classes.textField}
                            value={this.state.gender}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            margin="normal"
                            >
                            {genders.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            name="lastName"
                            label="Age"
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <DropzoneArea
                            dropzoneClass={classes.dropZone}
                            onChange={this.handleImageUpload}
                            dropzoneText='Upload Face Image (.jpg Format) Here'
                            acceptedFiles={['image/jpeg']}
                            filesLimit={1}
                        />

                        <p>* The image should be clear and it should be forward facing.</p>

                        <Button
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            className={classes.button}
                            fullWidth>
                                SUBMIT
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