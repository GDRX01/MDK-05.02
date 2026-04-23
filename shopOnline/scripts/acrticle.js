const fullPosts = async () => {
    const url = await fetch('https://gorest.co.in/public-api/posts');
    const responseData = await url.json();
    const posts = responseData.data;

    const container = document.createElement('div');
    container.setAttribute('class', 'root');
    document.body.appendChild(container)

    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');
    const post = posts.find(item => item.id == postID)
    console.log(post)

    if (post) {
        const postElement = document.createElement('div');
        postElement.setAttribute('class', 'card');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <a href="./blog.html">К списку статей</a>
            <p>Создатель статьи - ${post.user_id}</p>
        `;
        container.appendChild(postElement);
    }

    console.log(posts, responseData.meta.pagination)
};

fullPosts();