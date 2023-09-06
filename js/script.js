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
})