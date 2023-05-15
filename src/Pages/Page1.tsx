import Typography from '@mui/material/Typography';
import Form from '../Components/Form'
function Page1() {
    return (
        <>
            <Typography variant="h4" align='center'
                style={{
                    position: 'fixed',
                    top: '25%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                gutterBottom>
                Form
            </Typography>
            <Form />
        </>

    )
}

export default Page1
