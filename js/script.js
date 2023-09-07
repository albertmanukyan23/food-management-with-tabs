window.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }
    function showTab(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTab();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTab(i);
                }
            })
        }
    })

    //TIMER 
    const deadline = '2023-09-07';
    function getTimeRemaining(endTime) {
        const delta = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(delta / (1000 * 60 * 60 * 24)),
            hours = Math.floor((delta / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((delta / 1000 * 60) % 60),
            seconds = Math.floor((delta / 1000) % 60);
        return {
            'total': delta,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInteryal = setInterval(updateCloak, 1000);

        updateCloak();

        function updateCloak() {
            const temp = getTimeRemaining(endtime);
            days.innerHTML = temp.days;
            hours.innerHTML = temp.hours;
            minutes.innerHTML = temp.minutes;
            seconds.innerHTML = temp.seconds;
            if (temp.total <= 0) {
                clearInterval(timeInteryal);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    })

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    })


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    })

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll);


    // class for cards 
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                    <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Menu "Fitnes"',
        'Menu "Fitnes" - is the new way to cook dishes!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Menu "Simple"',
        'Menu Simple - its a deep way to cook dishes: complete absence of products of animal origin, milk from almonds, oats, coconut or buckwheat, the right amount of proteins due to tofu and imported vegetarian steaks.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Menu Premium',
        'In the "Premium" menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - restaurant menu without going to the restaurant!',
        21,
        ".menu .container"
    ).render();
});