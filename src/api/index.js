
import Promise from 'bluebird';
import axios from 'axios';

// const endpoint = '/api';
const endpoint = '';

axios.interceptors.response.use(
    response => response.data,
    (error) => {
        const { data, status } = error.response;
        if (status === 422) return Promise.reject(data);
        console.error(data);
    },
);

const request = (url, process) => {
    const tokens = url.split('/');
    return (...args) =>
        new Promise((resolve, reject) => {
            const mappedURL = 'http://localhost:4000' + endpoint +
                tokens.map((token, i) => (token.startsWith(':') ? args.shift() : token)).join('/');
            return resolve(process(mappedURL, args));
        });
};

const GET = (URL, headers) =>
    request(URL, (mappedURL, args) => {
        const [params] = args;
        return axios.get(mappedURL, { params, headers });
    });

const DELETE = (URL, headers) =>
    request(URL, (mappedURL, args) => {
        const [params] = args;
        return axios.delete(mappedURL, { params, headers });
    });

const POST = (URL, headers) =>
    request(URL, (mappedURL, args) => {
        const [body, params] = args;
        return axios.post(mappedURL, body, { params, headers });
    });

const PUT = (URL, headers) =>
    request(URL, (mappedURL, args) => {
        const [body, params] = args;
        return axios.put(mappedURL, body, { params, headers });
    });

const PostsApi = {
    list: GET('/posts/'),
    add: POST('/posts/'),
    get: GET('/posts/:posts_id'),
    update: PUT('/posts/:posts_id'),
    delete: DELETE('/posts/:posts_id'),
};
const CommentsApi = {
    list: GET('/comments/'),
    add: POST('/comments/'),
    get: GET('/comments/:comments_id'),
    update: PUT('/comments/:comments_id'),
    delete: DELETE('/comments/:comments_id'),
}

export {
    PostsApi,
    CommentsApi
};