const photos = [
    'https://loremflickr.com/400/400?1',
    'https://loremflickr.com/400/400?2',
    'https://loremflickr.com/400/400?3',
    'https://loremflickr.com/400/400?4',
    'https://loremflickr.com/400/400?5',
    'https://loremflickr.com/400/400?6',
    'https://loremflickr.com/400/400?7',
    'https://loremflickr.com/400/400?8',
    'https://loremflickr.com/400/400?9',
    'https://loremflickr.com/400/400?10'
];

const getPosts = async () => {
    const url = await fetch('https://gorest.co.in/public-api/posts');
    const responseData = await url.json();
    const posts = responseData.data;

    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const { pages } = responseData.meta.pagination;

    const container = document.createElement('div');
    container.setAttribute('class', 'root');
    document.body.appendChild(container)

    posts.forEach((item, index) => {
        const postElement = document.createElement('div');
        postElement.setAttribute('class', 'card');
        postElement.innerHTML = `
            <img src="${photos[index]}" alt="">
            <h2>${item.title}</h2>
            <p>${item.body.slice(0, 80)}...</p>
            <a href="./article.html?id=${item.id}">Читать больше</a>
        `;
        container.appendChild(postElement);
    });

    renderPagination(currentPage, pages);

    console.log(posts, responseData.meta.pagination)
};

const renderPagination = (current, total) => {
    const nav = document.createElement('nav');
    nav.className = 'pagination';
    document.body.appendChild(nav);

    const start = Math.max(1, current - 1);
    const end = Math.min(total, start + 2);

    const links = [];
    links.push({ page: current - 1, text: 'Назад ' });

    for (let i = start; i <= end; i++) {
        links.push({ page: i, text: i });
    }

    links.push({ page: current + 1, text: ' Далее' });

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.page === 1 ? 'blog.html' : `blog.html?page=${link.page}`;
        a.textContent = link.text;
        if (link.page === current) a.style.fontWeight = 'bold';
        nav.append(a);
    });
};

getPosts();