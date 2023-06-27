
const skills = {
    data: [{
        item: "javascript",
        level: 30,
        iconPath: "img/skills/javascript.svg",
    },
    {
        item: "html",
        level: 70,
        iconPath: "img/skills/html.svg",
    },
    {
        item: "CSS",
        level: 50,
        iconPath: "img/skills/css.svg",
    },
    {
        item: "C++",
        level: 50,
        iconPath: "img/skills/cpp.svg",
    },
    {
        item: "English",
        level: 40,
        iconPath: "img/skills/english.svg",
    }],
    isSorted: false,
    generateList: function(parentElement) {
        parentElement.innerHTML = '';
        this.data.forEach(element => {
            const dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.item;
            dt.style.backgroundImage = `url(${element.iconPath})`;

            const dd = document.createElement('dd');
            dd.classList.add('skill-level');
            
            const div = document.createElement('div');
            div.style.width = `${element.level}%`;
            div.textContent = `${element.level}%`;

            dd.append(div);
            parentElement.append(dt, dd);
        });
    },
    sortList: function(sortingType) {
        if (skills.isSorted !== sortingType) {
            switch (sortingType) {
                case 'name':
                    this.data.sort((a, b) => a.item.localeCompare(b.item)); break;
                case 'level':
                    this.data.sort((a, b) => b.level - a.level); break;
                default:
                    return;
            }
            console.log(`отсортировано по ${sortingType}`);
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
            console.log('инвертирован порядок сортировки');
        }
        this.generateList(skillListSelector);
    },
};

const skillListSelector = document.querySelector('dl.skill-list');

// Меню навигации: .main-header
const menu = {
    open: function() {
        nav.classList.remove('main-nav_closed');
        btn.classList.add('nav-btn_close');
        btn.classList.remove('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },
    close: function() {
        nav.classList.add('main-nav_closed');
        btn.classList.remove('nav-btn_close');
        btn.classList.add('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },
};

// Первое создание списка навыков
skills.generateList(skillListSelector);

// Сортировки списка по кнопкам
const sortBtnsBlock = document.querySelector('.skills-buttons');
sortBtnsBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
        skills.sortList(e.target.dataset.type);
    }
});

// Показ и скрытие меню (гамбургер)
const nav = document.querySelector('.main-nav');
const btn = document.querySelector('.nav-btn');
btn.addEventListener('click', (e) => {
    e.target.classList.contains('nav-btn_open') ? menu.open() : menu.close();
});
menu.close();

// Чекбокс темной темы
const changeTheme = (theme) => {
    theme
      ? document.body.classList.remove('dark-theme')
      : document.body.classList.add('dark-theme');
    localStorage.setItem('dark-theme-disabled', theme);
}
const checkbox = document.querySelector(".switch-checkbox");
checkbox.addEventListener("change", (e) => {
    changeTheme(checkbox.checked);
});
// Загрузка сохраненной темы
const darkThemeOnLoad = localStorage.getItem('dark-theme-disabled');
if (darkThemeOnLoad === null) {
    changeTheme(false);
    checkbox.checked = false;
} else {
    changeTheme(darkThemeOnLoad === "true");
    checkbox.checked = (darkThemeOnLoad === "true");
}