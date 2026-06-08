let localGoods = [
    { id: 1, title: "Дверная ручка латунная", price: 1200, category: "Фурнитура" },
    { id: 2, title: "Набор простых карандашей", price: 150, category: "Канцелярия" },
    { id: 3, title: "Шариковая ручка синяя", price: 45, category: "Канцелярия" },
    { id: 4, title: "Коврик для йоги", price: 1800, category: "Спорт" },
    { id: 5, title: "Зеркало настольное", price: 650, category: "Декор" },
    { id: 6, title: "Настольная лампа LED", price: 2100, category: "Освещение" },
    { id: 7, title: "Деревянная разделочная доска", price: 850, category: "Кухня" },
    { id: 8, title: "Керамическая чашка", price: 350, category: "Посуда" },
    { id: 9, title: "Подушка ортопедическая", price: 2400, category: "Спальня" },
    { id: 10, title: "Беспроводная мышь", price: 1100, category: "Электроника" },
    { id: 11, title: "Блокнот в кожаном переплете", price: 950, category: "Канцелярия" },
    { id: 12, title: "Настенные часы", price: 1600, category: "Декор" },
    { id: 13, title: "Френч-пресс для кофе", price: 1300, category: "Посуда" },
    { id: 14, title: "Стеклянная ваза", price: 780, category: "Декор" },
    { id: 15, title: "Ароматическая свеча", price: 420, category: "Уют" },
    { id: 16, title: "Органайзер для документов", price: 550, category: "Канцелярия" },
    { id: 17, title: "Спортивная бутылка для воды", price: 690, category: "Спорт" },
    { id: 18, title: "Термокружка", price: 1250, category: "Посуда" },
    { id: 19, title: "Плед флисовый", price: 1950, category: "Уют" },
    { id: 20, title: "Степлер металлический", price: 320, category: "Канцелярия" },
    { id: 21, title: "Кухонные весы", price: 990, category: "Кухня" },
    { id: 22, title: "Кабель USB-C 1.5м", price: 450, category: "Электроника" },
    { id: 23, title: "Навесной металлический замок", price: 600, category: "Фурнитура" },
    { id: 24, title: "Сетевой фильтр", price: 1150, category: "Электроника" }
];

const urlParams = new URLSearchParams(window.location.search);
const initialPage = Number(urlParams.get("page")) || 1;
console.log(urlParams, initialPage)

let state = {
    page: initialPage,
    limit: 8,
    pages: 1,
    editId: null
};

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

// Функция для обработки клика, добавление нового товара или сохранение изменений
document.getElementById("add").onclick = () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    if (!title || !price) return;

    if (state.editId) {
        const item = localGoods.find(g => g.id === state.editId);
        if (item) {
            item.title = title;
            item.price = Number(price);
            item.category = category;
        }
        state.editId = null;
    } else {
        const newProduct = {
            id: Date.now(),
            title,
            price: Number(price),
            category
        };
        localGoods.push(newProduct);
    }

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";

    state.page = 1;
    loadItems();
};

// Функция для расчета страниц, фильтрации локального массива и отрисовки карточек товаров
function loadItems() {
    state.pages = Math.ceil(localGoods.length / state.limit) || 1;

    if (state.page > state.pages) {
        state.page = state.pages;
    }

    // Обновляем параметр ?page= в адресной строке браузера без перезагрузки
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", state.page);
    window.history.pushState({}, "", newUrl);

    const start = (state.page - 1) * state.limit;
    const end = start + state.limit;
    const goodsForPage = localGoods.slice(start, end);

    cards.innerHTML = "";

    goodsForPage.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const price = document.createElement("p");
        price.textContent = item.price + " руб.";

        const category = document.createElement("p");
        category.textContent = item.category;

        const editBtn = document.createElement("button");
        editBtn.className = 'btn btn-edit';
        editBtn.textContent = "Изменить";

        editBtn.onclick = () => {
            document.getElementById("title").value = item.title;
            document.getElementById("price").value = item.price;
            document.getElementById("category").value = item.category;

            state.editId = item.id;
        };

        const delBtn = document.createElement("button");
        delBtn.className = 'btn btn-del';
        delBtn.textContent = "Удалить";

        delBtn.onclick = () => {
            localGoods = localGoods.filter(g => g.id !== item.id);
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

// Функция для создания кнопок переключения страниц и вывода текущей страницы
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