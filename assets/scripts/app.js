const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchBtn = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url,data) 
{
    // const promise = new Promise((resolved,reject) => {
        // const xhr = new XMLHttpRequest();
        // xhr.sendRequestHeader('content-type','applicaton/json')
        // xhr.open(method, url);
        // xhr.send(JSON.stringify(data));
        // // const listOfPosts = JSON.parse(xhr.response);
        // xhr.responseType = 'json';
        // xhr.onload = function () {
        //     if(xhr.status >= 200 && xhr.status <300)
        //     {
        //         resolved(xhr.response);
        //     }
        //     else{
                    // xhr.response;
        //         reject(new Error("Something Went Wrong"));
        //     }
        //     // console.log(listOfPosts);
        // }
        // xhr.onerror = function () 
        // {
        //     console.log(xhr.response);
        //     console.log(xhr.status);
        // }
        // });
        // return promise;
        return fetch(url,{
            method:method,
            // body:JSON.stringify(data),
            body:data,
            // headers:{
            //     'Content-Type':'application/json'
            // }
        }).then(response => {
            if(response.status >=200 && response.status < 300)
            {
                return response.json();
            }
            else{
                // response.json();
                throw new Error('something went wrong- server side.');
            }
        });
}



async function fetchPosts() 
{
    try{
        const listOfPosts = await sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts')
        listElement.innerHTML = ``;
            // const listOfPosts = responseData;
            for (const post of listOfPosts) {
                const postEl = document.importNode(postTemplate.content, true);
                postEl.querySelector('h2').textContent = post.title.toUpperCase();
                postEl.querySelector('p').textContent = post.body;
                postEl.querySelector('li').id = post.id;
                listElement.append(postEl);
                // console.log(postEl);
            }
    }catch(error){
        console.log(error);
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
    const fd = new FormData(form);
    // fd.append('title',title);
    // fd.append('body',content);
    fd.append('userId',userId);
    console.log("Post is create and sending...");
    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',fd);
}
// fetchPosts();
// createPost('DUMMY','A Dummy post!');

form.addEventListener('submit',event =>
{
    event.preventDefault();
    const title = event.target.querySelector('#title').value;
    const content = event.target.querySelector('#content').value;

    createPost(title,content);
})

const deleteListItem = (postId) =>
{
    const li = document.getElementById(postId);
    console.log(li);
    li.remove();
    // postList.removeChild(li);
}
postList.addEventListener('click',event =>
{
    if(event.target.tagName === 'BUTTON')
    {
        // console.log("You have just clicked on button");
        const postId = event.target.closest('li').id;
        // console.log(postId);
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`);
        deleteListItem(postId);
    }
})
fetchBtn.addEventListener('click',fetchPosts);