import React, { Component } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const styles = {
    button: {
        marginTop: '90px'
    }
}

class QuestionResult extends Component {
    constructor() {
        super();
        this.state = {
            questionResult: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        // fetch data from python
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container>
                    <Grid align='center'>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained" 
                            color="secondary">
                                SEE THE ANSWER NOW!
                        </Button>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(QuestionResult);
