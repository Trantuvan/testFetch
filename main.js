const getTextBtn = document.getElementById('getText');
const addForm = document.getElementById('addPost');

function checkStatus(response) {
  if (response.ok === true) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

function addPost(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then(checkStatus)
    .then((res) => res.json())
    .then(console.log);
}

addForm.addEventListener('submit', (e) => addPost(e));

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
      let outputs = '<h2 class="mb-4">Posts</h2';

      data.forEach((post) => {
        outputs += `
        <div class="card card-body mb-3">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>`;
      });

      document.getElementById('output').innerHTML = outputs;
    })
    .catch((e) => console.log('there was an error', e));
}
getTextBtn.addEventListener('click', getPosts);
