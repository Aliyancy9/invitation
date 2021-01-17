import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import {AppBar, Typography, Button } from '@material-ui/core'
import EmailDialog from './EmailDialog'

const useStyles = makeStyles({
    container: {
        height:'100%',
        backgroundColor: 'white'
    },
    header: {
        height: '5rem',
    },
    headerText: {
        color: 'grey',
        display: 'flex',
        alignItems: 'center',
        height: '5rem',
        marginLeft: '3rem',
        fontSize: '2rem',
    }, 
    footer: {
        height: '5rem',
        top: 'auto',
        bottom: 0,
      },
    
    footerText: {
        color: 'grey',
        height: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontStyle: 'oblique',
    }, 
    content: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        margin: '1rem 0',
    },
    button: {
        margin: '1rem 0',
    },

})

const Main: React.FC = () => {
    const classes = useStyles({})

    const [open, setOpen] = React.useState(false)

    const onToggle = () => setOpen(!open)

return (
    <div className={classes.container}>
        <AppBar
            className={classes.header}
            color = 'inherit'
        >
            <Typography className={classes.headerText}>
                 Broccoli & Co.
            </Typography>
        </AppBar>
        <div className={classes.content}>
            
            <Typography variant = 'h3' color = 'textSecondary'>
                A better way
            </Typography>
            <Typography variant = 'h3' color = 'textSecondary'>
                to enjoy every day.
            </Typography>
            
            <Typography variant = 'h6' color = 'textSecondary' className={classes.text}>
                Be the first to know when we launch.
            </Typography>

            <Button 
                variant="outlined" 
                className={classes.button}
                onClick={onToggle}
            >
                Request an invite
            </Button>
        </div>
            <EmailDialog 
                isOpen={open}
                onClose={onToggle}
            />
        <AppBar
            className={classes.footer}
            color = 'inherit'
        >
            <div className={classes.footerText}>
                <Typography >
                Made with &hearts; in Melbourne.  
                </Typography>
                <Typography>
                © 2016 Broccoli & Co. All rights reserved.   
                </Typography>
            </div>
        </AppBar>
    </div>
)}

export default Main