import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './Form.css'

interface FormData {
    name: string;
    email: string;
    mobile: string;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.mobile) {
            setOpenSnackbar(true);
        } else {
            console.log(formData); // For debugging purposes

            // Store form data in localStorage
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
                        size='small'
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        size='small'
                        margin="normal"
                    />
                    <TextField
                        label="Mobile Number"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        size='small'
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        All the fields should be filled to proceed to the next page
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
};

export default Form;
