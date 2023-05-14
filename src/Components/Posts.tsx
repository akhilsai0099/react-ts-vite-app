import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchPosts } from '../helper/fetchPosts';
import DepartmentList from './DepartmentList'
import { Post } from '../helper/fetchPosts';

function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch the posts when the component mounts
        async function getPosts() {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
        }

        getPosts();
    }, []);

    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'User_ID', width: 90 },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'body', headerName: 'Body', width: 400 },
    ];

    return (
        <div
            style={{
                height: 400,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div>
                <div style={{ height: 373, width: '100%', maxWidth: '800px' }}>
                    <DataGrid
                        rows={posts}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }} />
                </div>
                <div>

                    <DepartmentList />
                </div>
            </div>
        </div>
    );

}

export default Posts;
