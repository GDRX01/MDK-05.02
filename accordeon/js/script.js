const accordionData = {
    1: {
        title: "Можно ли забронировать комнату онлайн?",
        description: "Да, забронировать комнату вы можете онлайн, заполнив форму на нашем сайте. Также вы можете забронировать комнату позвонив по телефону 8 (999) 958 - 48 - 38."
    },
    2: {
        title: "Могут ли мне вернуть деньги за бронь?",
        description: "При отмене более чем за 24 часа мы возвращаем полную стоимость бронирования. Если до визита осталось меньше суток, деньги не сгорают, а переносятся на ваш депозит для оплаты следующего посещения."
    },
    3: {
        title: "Какая комната самая популярная?",
        description: "Наш лидер — VIP-комната. Она пользуется самым большим спросом благодаря профессиональному звуку и экрану максимального размера. Отлично подходит для тех, кто ценит максимальный комфорт и качество картинки."
    },
    4: {
        title: "Как получить VIP карту?",
        description: "Карта выдается автоматически при сумме чеков от 10 000 рублей, либо её можно приобрести у администратора. Владельцам карты предоставляется постоянная скидка 15% на все услуги нашего заведения."
    },
    5: {
        title: "Какая комната самая популярная?",
        description: "Наш лидер — VIP-комната. Она пользуется самым большим спросом благодаря профессиональному звуку и экрану максимального размера. Отлично подходит для тех, кто ценит максимальный комфорт и качество картинки."
    }
};

function accordionFunction() {
    const body = document.body;

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main')

    const h1 = document.createElement('h1');
    h1.textContent = 'ЧАСТЫЕ ВОПРОСЫ';
    mainDiv.appendChild(h1);

    const accordionContainer = document.createElement('div');
    accordionContainer.setAttribute('class', 'accordion')
    
    Object.values(accordionData).forEach(item => {
        const contentBox = document.createElement('div');
        contentBox.setAttribute('class', 'contentBox')

        const label = document.createElement('div');
        label.setAttribute('class', 'label')
        label.textContent = item.title;

        const content = document.createElement('div');
        content.setAttribute('class', 'content')

        const p = document.createElement('p');
        p.textContent = item.description;


        content.appendChild(p);
        contentBox.appendChild(label);
        contentBox.appendChild(content);

        label.addEventListener('click', () => {
            document.querySelectorAll('.contentBox').forEach(box => {
                if (box !== contentBox) box.classList.remove('active');
                console.log(box)
            });

            contentBox.classList.toggle('active');
        });

        accordionContainer.appendChild(contentBox);
    });

    mainDiv.appendChild(accordionContainer);
    body.appendChild(mainDiv);
}


document.addEventListener('DOMContentLoaded', accordionFunction());