
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
    generateList: function(parentElement) {
        this.data.forEach(function(element) {
            const dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.item;
            dt.style.backgroundImage = `url(${element.iconPath})`;

            const dd = document.createElement('dd');
            dd.classList.add('skill-level');
            
            const div = document.createElement('div');
            div.style.width = `${element.level}%`;
            div.textContent = `${element.level}%`;

            dd.appendChild(div);
            parentElement.appendChild(dt);
            parentElement.appendChild(dd);
        });
    }
};

skills.generateList(document.querySelector('dl.skill-list'));