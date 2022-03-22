import i18Obj from './translate.js';

let lang = "en";
let theme = "dark";
// burger menu
// получаем бургер кнопку
const burgerBtn = document.querySelector(".burger-btn");

// получаем dropdown-body
const dropdownBody = document.querySelector(".dropdown-body");

// получаем body
const body = document.querySelector("body");

// функция которая открывает и закрывает меню по клику на бургер
function openAndCloseBtn() {
    dropdownBody.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    // запрещаем прокрутку страницы при открытом меню
    body.classList.toggle("over");
}

// функция которая закрывает меню по клику ссылку меню
function closeDropdown(e) {
    if (e.target.classList.contains("nav-link")) {
        dropdownBody.classList.remove("active");
        burgerBtn.classList.remove("active");
        // запрещаем прокрутку страницы при открытом меню
        body.classList.toggle("over");
    }
}

// вызываем эти две функции
burgerBtn.addEventListener("click", openAndCloseBtn);
dropdownBody.addEventListener("click", closeDropdown);


// кэшируем картинки
function preloadSummerImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `img/${season}/${i}.jpg`;
        }
    })
}
preloadSummerImages();



// смена картинок по сезонам
const portfolioImages = document.querySelectorAll(".portfolio-img");
const portfolioBtnsBody = document.querySelector(".portfolio-btn-body");



// функция которая переключает активный класс у элементов
// последним параметром передается event события, к которому и будет применяться активный класс
function changeActiveClass(itemsParentContainer, activeClass, currentItem) {

    if (!currentItem.target.classList.contains(`${activeClass}`)) {
        for (let i = 0; i < itemsParentContainer.children.length; i++) {
            itemsParentContainer.children[i].classList.remove(`${activeClass}`);
        }
        currentItem.target.classList.add(`${activeClass}`);
    }
}



// обрабатываем клики кнопок которые должны выбирать сезон
portfolioBtnsBody.addEventListener("click", e => {
    changeActiveClass(portfolioBtnsBody, "active", e)

    portfolioImages.forEach((img, index) => {
        img.src = `img/${e.target.dataset.season}/${index + 1}.jpg`
    })
})



// перевод страницы
function getTranslate(lang) {
    const elForTranslate = document.querySelectorAll("[data-i18n]");
    elForTranslate.forEach((el, i) => {
        const data = el.dataset.i18n
        // переводим placeholder если есть елемент с таким атрибутом 
        if (el.placeholder) {
            el.placeholder = i18Obj[lang][data];
            el.textContent = "";
        } else {
            el.textContent = i18Obj[lang][data];
        }
    })
}
const en = document.querySelector(".en");
const ru = document.querySelector(".ru");
const langContainer = document.querySelector(".lang");

langContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("ru")) {
        changeActiveClass(langContainer, "lang-active", e);
        lang = "ru";
        getTranslate(lang);
    } 
    else if (e.target.classList.contains("en")) {
        changeActiveClass(langContainer, "lang-active", e);
        lang = "en";
        getTranslate(lang);
    }

})


// смена темы
const themeIcons = document.querySelector(".theme");
let classesForLightTheme = ["body", ".section-title",".section-title::before",".section-title::after", ".skill-item", ".btn-transparent", ".price-heading", ".description"];
let items = [];
classesForLightTheme.forEach(item => {
    items.push(document.querySelectorAll(item))
})
function changeTheme (e) {
    e.currentTarget.classList.toggle("toggle");
    // если поменяли тему, то записываем новое значение для переменной,
    // для передачи этого значения в localstorage
    theme = document.body.classList.contains("light-theme") ? "dark" : "light";
    // перебираем все эллементы, для добавление к ним класса с светлой темой
    items.forEach(item => {
        item.forEach(el => {
            el.classList.toggle("light-theme") 
        })
    })
}
themeIcons.addEventListener("click", changeTheme)


// перед выходом или перезагрузкой страницы сохраняем значения перевода текста и темы
window.addEventListener("beforeunload", () => {
    localStorage.setItem("lang", lang);
    localStorage.setItem("theme", theme);
})

// предварительно переводим и меняем цвет темы, если есть данные в localstorage
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("lang") === "ru") {
        getTranslate("ru");
        en.classList.remove("lang-active");
        ru.classList.add("lang-active");
    } else if (localStorage.getItem("lang") === "en") {
        ru.classList.remove("lang-active");
        en.classList.add("lang-active");
    }
    if (localStorage.getItem("theme") === "light") {
        items.forEach(item => {
            item.forEach(el => {
                el.classList.add("light-theme");
            })
        })
        themeIcons.classList.add("toggle")
    }   
})
