// const API = "https://csmevg.ru";
// const TENANT_ID = "de6030c6-006b-48eb-8b2a-bb214fba68f3";

array = []

let state = {
    page: 1,
    pages: 1,
    editId: null
};

function apiFetch(path, options = {}) {
    return fetch(API + path, {
        ...options,
        headers: {
            "X-Tenant-Id": TENANT_ID,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
}

const root = document.createElement("div");
const cards = document.createElement("div");
const form = document.createElement("div");
const pagination = document.createElement("div");

root.className = "root";
cards.className = "cards";
form.className = "form";
pagination.className = "pagination";

root.appendChild(form);
root.appendChild(cards);
root.appendChild(pagination);
document.body.appendChild(root);

form.innerHTML = `
    <input id="title" placeholder="Название" />
    <input id="price" placeholder="Цена" />
    <input id="category" placeholder="Категория" />
    <button id="add">Добавить</button>
`;

// Изменение и Создание
document.getElementById("add").onclick = async () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    if (!title || !price) return;

    if (state.editId) {
        await apiFetch(`/api/goods/${state.editId}`, {
            method: "PATCH",
            body: JSON.stringify({
                title,
                price: Number(price),
                category
            })
        });

        state.editId = null;
    } else {
        await apiFetch("/api/goods", {
            method: "POST",
            body: JSON.stringify({
                title,
                price: Number(price),
                category,
                description: "test product",
                count: 1,
                units: "pcs",
                discount: 0,
                image: ""
            })
        });
    }

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";

    state.page = 1;
    loadItems();
};

// Основная функция
async function loadItems() {
    const res = await apiFetch(`/api/goods?page=${state.page}`);
    const data = await res.json();

    const goods = data.goods;
    state.pages = data.pages;

    console.log(data, goods)

    cards.innerHTML = "";

    goods.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const price = document.createElement("p");
        price.textContent = item.price + " руб.";

        const category = document.createElement("p");
        category.textContent = item.category;

        const editBtn = document.createElement("button");
        editBtn.className = 'btn btn-edit'
        editBtn.textContent = "Изменить";

        editBtn.onclick = () => {
            document.getElementById("title").value = item.title;
            document.getElementById("price").value = item.price;
            document.getElementById("category").value = item.category;

            state.editId = item.id;
        };

        const delBtn = document.createElement("button");
        delBtn.className = 'btn btn-del'
        delBtn.textContent = "Удалить";

        delBtn.onclick = async () => {
            await apiFetch(`/api/goods/${item.id}`, {
                method: "DELETE"
            });

            loadItems();
        };

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(editBtn);
        card.appendChild(delBtn);

        cards.appendChild(card);
    });

    renderPagination();
}

// Пагинация
function renderPagination() {
    pagination.innerHTML = "";

    const prev = document.createElement("button");
    prev.textContent = "Назад";

    prev.onclick = () => {
        if (state.page > 1) {
            state.page--;
            loadItems();
        }
    };

    const info = document.createElement("span");
    info.textContent = `Page ${state.page} / ${state.pages}`;

    const next = document.createElement("button");
    next.textContent = "Вперед";

    next.onclick = () => {
        if (state.page < state.pages) {
            state.page++;
            loadItems();
        }
    };

    pagination.appendChild(prev);
    pagination.appendChild(info);
    pagination.appendChild(next);
}

loadItems();