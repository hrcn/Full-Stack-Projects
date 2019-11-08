import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        marginTop: 'auto',
    },
    selectField: {
        marginTop: '20px',
        width: 500
    },
    button: {
        marginTop: '20px'
    }
}

class QuestionForm extends Component {
    constructor() {
        super();
        this.state = {
            userQuestion: []
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

        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Ask a question here!
                    </Typography>
                    <form noValidate className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
                    
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows="4"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
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

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionForm);