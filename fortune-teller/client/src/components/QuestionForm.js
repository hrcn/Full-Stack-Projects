import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Page Styling
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
            question: '',
            questionResult: '',
            isLoaded: false
        }
    }

    handleSubmit = (event) => {
        alert('Form Submitted!')

        event.preventDefault();
        console.log(this.state);

        // post data to express
        // axios.post('http://localhost:4000/api/newquestion', this.state)
        // .then(response => {
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error)
        // })

        // post data to flask
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        axios.post('http://localhost:5000/api/newquestion', this.state, config)
        .then(response => {
            console.log(response)
            this.setState({questionResult: response.data, isLoaded: true})
        })
        .catch(error => {
            console.log(error)
        })

        // use history object to redirect
        // this.props.history.push('/questionresult');
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { questionResult, isLoaded } = this.state;

        if (!isLoaded) {
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
                                name="question"
                                onChange={this.handleChange}
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
        } else {
            return(
                <Grid container className={classes.form}>
                    <Grid item sm>
                        <h1>{questionResult}</h1>
                    </Grid>

                    {/* <Grid item sm>
                            <Button
                                variant="contained" 
                                color="secondary"
                                className={classes.button}
                                fullWidth>
                                    ASK ANOTHER ONE!
                            </Button>
                    </Grid> */}
                </Grid>
            )
        }
        
    }
}

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(QuestionForm));