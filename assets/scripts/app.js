const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url) 
{
    const promise = new Promise((resolved,reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open(method, url);
        xhr.send();
        // const listOfPosts = JSON.parse(xhr.response);
        xhr.responseType = 'json';
        xhr.onload = function () {
            xhr.resolved(xhr.response);
            // console.log(listOfPosts);
        }
    })
    return promise;
}



function fetchPosts() 
{
    sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts').then(responseData =>
    {
        const listOfPosts = responseData;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listElement.append(postEl);
            // console.log(postEl);
        }
    });

}



