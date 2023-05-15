import axios from 'axios';
import { Post } from './Post'



// Define the API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Function to fetch posts
export async function fetchPosts(): Promise<Post[]> {
    try {
        // Make the API request
        const response = await axios.get(API_URL);

        // Extract the data from the response
        const data = response.data;

        // Convert the data into an array of Post objects
        const posts: Post[] = data.map((post: any) => ({
            userId: post.userId,
            id: post.id,
            title: post.title,
            body: post.body,
        }));

        return posts;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching posts:', error);
        return [];
    }
}
