import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone'

const styles = {
    form: {
        textAlign: 'center',
        color: ''
    },
    pageTitle: {
        marginTop: '20px',
    },
    selectField: {
        marginTop: '20px',
        width: 300
    },
    dropZone: {
        marginTop: '50px',
        width: 450
    }
}

class FaceForm extends Component {
    constructor() {
        super();
        this.state = {
            handImage: [],
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
                        Palm Prediction
                    </Typography>
                    <form noValidate className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
                        <DropzoneArea
                            dropzoneClass={classes.dropZone}
                            onChange={this.handleImageUpload}
                            dropzoneText='Upload Palm Image (.jpg Format) Here'
                            acceptedFiles={['image/jpeg']}
                            filesLimit={1}
                        />

                        <p>* The image should be clear.</p>

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

FaceForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FaceForm);