import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { isValidEmail, isValidMobileNumber } from '../helper/validations'
import './Form.css'


import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface FormData {
    name: string;
    email: string;
    mobile: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile: '',
    });
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (name === 'email') {
            setIsEmailValid(value === "" || isValidEmail(value));
        }
        else if (name === 'mobile') {
            setIsMobileNumberValid(value === "" || isValidMobileNumber(value));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.mobile) {
            setOpenSnackbar(true);
        } else {

            localStorage.setItem('formData', JSON.stringify(formData));

            // Reset form data
            setFormData({
                name: '',
                email: '',
                mobile: '',
            });

            // Redirect to the next page
            navigate('/posts');
        }

    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="container">

            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" maxWidth={300}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        size='medium'
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        size='medium'
                        margin="normal"
                        error={!isEmailValid}
                        helperText={!isEmailValid && "Invalid email"}
                    />
                    <TextField
                        label="Mobile Number"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        size='medium'
                        margin="normal"
                        error={!isMobileNumberValid}
                        helperText={!isMobileNumberValid && "Invalid mobile number"}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={!isMobileNumberValid || !isEmailValid}>
                        Submit
                    </Button>
                </Box>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        Please Fill all the fields to proceed to the next page
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
};

export default Form;
