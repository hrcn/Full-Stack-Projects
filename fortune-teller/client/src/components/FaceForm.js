import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone'

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: 'auto',
    },
    dropZone: {
        marginTop: '20px',
        width: 450
    }
}

class Form extends Component {
    constructor(){
        super();
        this.state = {
          faceImage: null
        };
      }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        const fd = new FormData();
        fd.append('faceImage', this.state.faceImage);

        const contentType = {
            headers: { "content-type": "multipart/form-data" }
        }

        // post data to express
        axios.post('http://localhost:4000/api/newface', fd, contentType)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        // post data to flask
        axios.post('http://localhost:5000/api/newface', fd, contentType)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleImageUpload = (files) => {
        this.setState({
            faceImage: files[0]
        });
        console.log(files[0]);
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Face Prediction
                    </Typography>
                    <form 
                        noValidate 
                        className={classes.container} 
                        onSubmit={this.handleSubmit} 
                        autoComplete="off"
                        encType="multipart/form-data">

                        <DropzoneArea
                            dropzoneClass={classes.dropZone}
                            onChange={this.handleImageUpload.bind(this)}
                            dropzoneText='Upload Face Image (.jpg Format) Here'
                            acceptedFiles={['image/jpeg']}
                            filesLimit={1}
                        />

                        <p>* The image should be clear and it should be forward-facing.</p>

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