
const skills = {
    data: [],
    isSorted: false,
    isInErrorState: false,
    jsonPath: 'db/skills.json',
    skillList: null,
    sectionSkills: null,
    initList: function(jsonPath, skillList, sectionSkills) {
        this.jsonPath = jsonPath;
        this.skillList = skillList;
        this.sectionSkills = sectionSkills;
        console.log(jsonPath);
        fetch(jsonPath)
            .then(data => data.json())
            .then(object => {
                if (this.isInErrorState) {
                    this.isInErrorState = false;
                    this.renderErrorToggle(skillList, sectionSkills);
                }
                this.data = object;
                this.generateList(skillList);
            })
            .catch(() => {
                // Данные, для отображения в случае ошибки
                skills.data =  [
                    {"item": "Sample","level": 90, "iconPath": "img/skills/cpp.svg"},
                    {"item": "Sample","level": 80, "iconPath": "img/skills/css.svg"},
                    {"item": "Sample","level": 70, "iconPath": "img/skills/english.svg"},
                    {"item": "Sample","level": 60, "iconPath": "img/skills/html.svg"},
                    {"item": "Sample","level": 50, "iconPath": "img/skills/vue.svg"}]
                this.generateList(skillList);
                this.isInErrorState = true;
                this.renderErrorToggle(skillList, sectionSkills);
            });
    },

    renderErrorToggle: function(skillList, sectionSkills) {
        errorMsg = document.querySelector('#createdErrorMessage');
        if (!this.isInErrorState) {
            if (errorMsg !== null) {
                errorMsg.remove();
            }
            skillList.style.webkitFilter = '';
            this.btns.forEach((btn) => {
                btn.disabled = false;
            })
            return;
        }

        if (errorMsg === null) {
            skillsWrapper = document.querySelector('.skills-wrapper');
            this.btns = sortBtnsBlock.querySelectorAll('button')
            this.btns.forEach((btn) => {
                btn.disabled = true;
            })
            skillList.style.webkitFilter = 'blur(30px)';
            skillList.style.zIndex = 0;

            errorMsg = document.createElement('div');
            errorMsg.textContent = 'При загрузке данных произошла ошибка.'
            errorMsg.classList.add('error-message');
            errorBtn = document.createElement('button');
            errorBtn.textContent = 'Попробовать еще раз';
            errorMsg.appendChild(errorBtn);
            errorMsg.id = 'createdErrorMessage';
            errorBtn.addEventListener('click', () => {
                this.initList('db/skills_copy.json', this.skillList, this.sectionSkills);
            })
            skillsWrapper.append(errorMsg);
        }
    },
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
const skillList = document.querySelector('dl.skill-list');
const sectionSkills = document.querySelector('section.skills');
skills.initList('db/skills.json', skillList, sectionSkills);

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