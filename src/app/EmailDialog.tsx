import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/styles'
import registerEmail from './registerEmail'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Typography, Divider } from '@material-ui/core'

const useStyles = makeStyles({
  action: {
    margin: '1rem 0',
    padding: 0,
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem',
    fontStyle: 'oblique',
    color: 'grey',
  },
  form: {
    display: 'flex', 
    flexDirection:'column',
    '& > *:not(:last-child)': {
      height: '5rem',
    },
  },
  input: {
    height: '0.8rem',
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
  },
  successButton: {
    margin: '2rem 6rem'
  }, 
})

export interface Email {
  name: string
  email: string
  confirmedEmail?: string
} 

export interface Props {
    isOpen: boolean
    onClose: () => void
}

const EmailDialog: React.FC<Props> = (
  {
    isOpen,
    onClose
  }) => {  
    
  const classes = useStyles({})
  const initialValues: Email = {
    name: '',
    email: '',
    confirmedEmail: ''
}

  const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .required('Required'),

  email: Yup.string()
    .email()
    .required('Required'),
  
  confirmedEmail: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('email'), null], 'Email must match')
})

  const [isSubmitionCompleted, setSubmitionCompleted] = React.useState<Boolean>(false)
  const [hasErrorMessage, setHasErrorMessage] = React.useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState('')
    
  const handleOnSubmit = async(email: Email, actions: FormikHelpers<Email>) => {
    setErrorMessage('')
    const emailToSubmit = {
      name: email.name,
      email: email.email
    }
   
    const res = await registerEmail(emailToSubmit)
    actions.setSubmitting(false)
    
    if(res.errorMessage) {
      setHasErrorMessage(true)
      setErrorMessage(res.errorMessage)
    } else {
      setSubmitionCompleted(true)
    }
  }

  const handleOnClose = async () => {
    onClose()
    await new Promise(res => setTimeout(res, 500))
    setSubmitionCompleted(false) 
  }

    return ( 
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth= {isSubmitionCompleted? 'sm': 'xs'}
      >
        {!isSubmitionCompleted && ( 
          <React.Fragment>
          <DialogTitle className={classes.title}> 
              Request an invite
              <Divider variant='middle'/>
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              onSubmit={handleOnSubmit}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={validationSchema}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleSubmit,
                  isValid,
                } = props;
                return (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                      data-testid='name-input'
                      label='Full name'
                      name='name'
                      variant='outlined'
                      error={!!errors.name}
                      InputProps={{ classes: { input: classes.input } }}
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}           
                      disabled={isSubmitting}
                    />

                    <TextField
                      data-testid='email-input'
                      InputProps={{ classes: { input: classes.input } }}
                      error={!!errors.email }
                      label='Email'
                      name='email'
                      variant='outlined'
                      value={values.email}
                      onChange={handleChange}
                      helperText={errors.email}      
                      disabled={isSubmitting}
                    />
                    <TextField
                      data-testid='confirmedEmail-input'
                      InputProps={{ classes: { input: classes.input } }}
                      error={!!errors.confirmedEmail}
                      label='Confirm email'
                      name='confirmedEmail'
                      variant='outlined' 
                      value={values.confirmedEmail}
                      onChange={handleChange}
                      helperText={errors.confirmedEmail}
                      disabled={isSubmitting}
                    />
                    <DialogActions  
                      classes={{
                        root: classes.action,
                      }}
                      >
                      <Button type='submit'  disabled={isSubmitting} fullWidth color='default' variant='outlined'>
                        {isSubmitting? 'Sendinging please wait...': 'Send'}
                      </Button>
                    </DialogActions>
                    {isValid && hasErrorMessage && (
                    <Typography color = 'textSecondary' className={classes.message}>
                      {errorMessage}
                    </Typography>
                   )}    
                  </form>
                )
              }}
            </Formik>
          </DialogContent>
          </React.Fragment>
          )} 
          {isSubmitionCompleted && (
            <React.Fragment>
              <DialogTitle className={classes.title}> 
                  All done!
                  <Divider variant='middle'/>
              </DialogTitle>
                <Typography variant = 'h6' color = 'textSecondary' className={classes.message}>
                  You will be the one of the first to experience
                </Typography>
                <Typography variant = 'h6' color = 'textSecondary' className={classes.message}>
                  Broccoli & Co. when we launch
                </Typography>
              <DialogActions  
                classes={{
                  root: classes.successButton,
                }}
                >
                <Button fullWidth color='default' variant='outlined' onClick={handleOnClose}>
                  ok
                </Button>
              </DialogActions>
            </React.Fragment>
          )}   
      </Dialog>
  )
}

export default EmailDialog