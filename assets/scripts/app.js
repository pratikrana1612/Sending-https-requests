const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');


function sendHttpRequest(method, url,data) 
{
    const promise = new Promise((resolved,reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open(method, url);
        xhr.send(JSON.stringify(data));
        // const listOfPosts = JSON.parse(xhr.response);
        xhr.responseType = 'json';
        xhr.onload = function () {
            resolved(xhr.response);
            // console.log(listOfPosts);
        }
    })
    return promise;
}



async function fetchPosts() 
{
    const listOfPosts = await sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts')
        // const listOfPosts = responseData;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listElement.append(postEl);
            // console.log(postEl);
        }
}

async function createPost(title,content)
{
    const userId= Math.random();
    const post = {
        title:title,
        body:content,
        userId:userId
    };
    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',post);
}
fetchPosts();
createPost('DUMMY','A Dummy post!');

