import Posts from '../Components/Posts'
import DepartmentList from '../Components/DepartmentList'
import Divider from '@mui/material/Divider';

const Page2 = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div style={{ flexDirection: 'column' }}>
                <div style={{ margin: '10px' }}>
                    <Posts />
                </div>

                <Divider />

                <div style={{ margin: '10px' }}>
                    <DepartmentList />
                </div>
            </div>
        </div >
    )
}

export default Page2
