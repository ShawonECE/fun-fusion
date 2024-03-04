// utility functions

const getInnerText = (id) => {
    const element = document.getElementById(id);
    return element.innerText;
};

const setInnerText = (text, id) => {
    document.getElementById(id).innerText = text;
};

const handleMarkRead = (title, view) => {
    const container = document.getElementById('marked-container');
    const element = document.createElement('div');
    element.classList.add('card', 'shadow-xl', 'mt-2', 'p-4');
    element.innerHTML = `<div class="grid grid-cols-4">
                            <div class="col-span-3">
                                <h3 class="font-semibold">${title}</h3>
                            </div>
                            <div class="col-span-1 flex items-center">
                                <div class="flex justify-end">
                                    <img src="./images/eye.png" alt="" class="mr-2">
                                    <p>${view}</p>
                                </div>
                            </div>
                        </div>`;
    container.appendChild(element);
    let marks = parseInt(getInnerText('marked-read'));
    setInnerText(marks + 1, 'marked-read');
};

const loadPosts = async(url) => {
    const res = await fetch(url)
    const data = await res.json();
    const posts = data.posts;
    const container = document.getElementById('all-posts');

    for (const post of posts) {
        const indicatorColor = post.isActive?'#10B981' : '#FF3434';
        const element = document.createElement('div');
        element.classList.add('card', 'bg-[#F3F3F5]', 'shadow-xl', 'p-4', 'lg:p-12', 'mb-5');
        element.innerHTML = `
                        <div class="grid grid-cols-8 gap-8">
                            <div class="col-span-2 lg:col-span-1">
                                <div class="indicator" style="width:100%;">
                                    <span class="indicator-item badge bg-[${indicatorColor}]"></span>
                                    <img src=${post.image} alt="" class="w-100 rounded-md">
                                </div>
                            </div>
                            <div class="col-span-6 lg:col-span-7">
                                <div class="flex gap-12 font-medium mb-3">
                                    <p>#<span>${post.category}</span></p>
                                    <p>Author: <span>${post.author.name}</span></p>
                                </div>
                                <div class="pb-4 border-b-2 border-slate-300 border-dashed mb-5">
                                    <h3 class="text-xl font-bold mb-4">${post.title}</h3>
                                    <p>${post.description}</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-0 justify-between">
                                        <div class="flex gap-2 items-center">
                                            <img src="./images/chat.png" alt="" class="w-5 h-5">
                                            <p>${post.comment_count}</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <img src="./images/eye.png" alt="" class="w-5 h-5">
                                            <p>${post.view_count}</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <img src="./images/clock.png" alt="" class="w-5 h-5">
                                            <p>${post.posted_time} min</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-end cursor-pointer">
                                        <img src="./images/mail.png" alt="" class="w-8 h-8" id="mark-read-${post.id}">
                                    </div>
                                </div>
                            </div>
                        </div>`;
        container.appendChild(element);
        document.getElementById(`mark-read-${post.id}`).addEventListener('click', () => handleMarkRead(`${post.title}`, `${post.view_count}`));
    }
};

const loadLatestPosts = async(url) => {
    const res = await fetch(url)
    const posts = await res.json();
    const container = document.getElementById('latest-posts');
    
    for (const post of posts) {
        const date = post.author.posted_date ? post.author.posted_date : 'No Published Date';
        const designation = post.author.designation ? post.author.designation : 'Unknown';
        const element = document.createElement('div');
        element.classList.add('col-span-3', 'lg:col-span-1');
        element.innerHTML = `<div class="card bg-base-100 shadow-xl p-6">
                                <figure>
                                    <img src=${post.cover_image} alt="Shoes"
                                    class="rounded-xl" />
                                </figure>
                                <div class="card-body p-0 mt-6">
                                    <div class="flex items-center gap-3">
                                        <img src="./images/calendar.png" alt="" class="w-6 h-6">
                                        <p>${date}</p>
                                    </div>
                                    <h3 class="text-lg font-extrabold">${post.title}</h3>
                                    <p>${post.description}</p>
                                    <div class="flex gap-3 mt-4">
                                        <img src=${post.profile_image} alt="" class="rounded-full w-12">
                                        <div>
                                            <p class="font-bold">${post.author.name}</p>
                                            <p>${designation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        container.appendChild(element);
    }
};

const searchPosts = async() => {
    const container = document.getElementById('all-posts');
    const category = document.getElementById('search-text').value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    const message = data.message;
    container.innerHTML = '';
    document.getElementById('search-text').value = '';
    my_modal_1.showModal();

    setTimeout(() => {
        document.getElementById('modal-form').submit();

        if (posts.length) {
            for (const post of posts) {
                const indicatorColor = post.isActive?'#10B981' : '#FF3434';
                const element = document.createElement('div');
                element.classList.add('card', 'bg-[#F3F3F5]', 'shadow-xl', 'p-4', 'lg:p-12', 'mb-5');
                element.innerHTML = `
                                <div class="grid grid-cols-8 gap-8">
                                    <div class="col-span-2 lg:col-span-1">
                                        <div class="indicator" style="width:100%;">
                                            <span class="indicator-item badge bg-[${indicatorColor}]"></span>
                                            <img src=${post.image} alt="" class="w-100 rounded-md">
                                        </div>
                                    </div>
                                    <div class="col-span-6 lg:col-span-7">
                                        <div class="flex gap-12 font-medium mb-3">
                                            <p>#<span>${post.category}</span></p>
                                            <p>Author: <span>${post.author.name}</span></p>
                                        </div>
                                        <div class="pb-4 border-b-2 border-slate-300 border-dashed mb-5">
                                            <h3 class="text-xl font-bold mb-4">${post.title}</h3>
                                            <p>${post.description}</p>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-0 justify-between">
                                                <div class="flex gap-2 items-center">
                                                    <img src="./images/chat.png" alt="" class="w-5 h-5">
                                                    <p>${post.comment_count}</p>
                                                </div>
                                                <div class="flex gap-2 items-center">
                                                    <img src="./images/eye.png" alt="" class="w-5 h-5">
                                                    <p>${post.view_count}</p>
                                                </div>
                                                <div class="flex gap-2 items-center">
                                                    <img src="./images/clock.png" alt="" class="w-5 h-5">
                                                    <p>${post.posted_time} min</p>
                                                </div>
                                            </div>
                                            <div class="flex justify-end cursor-pointer">
                                                <img src="./images/mail.png" alt="" class="w-8 h-8" id="mark-read-${post.id}">
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                container.appendChild(element);
                document.getElementById(`mark-read-${post.id}`).addEventListener('click', () => handleMarkRead(`${post.title}`, `${post.view_count}`));
            }
        } else {
            const element = document.createElement('div');
            element.classList.add('card', 'bg-[#F3F3F5]', 'shadow-xl', 'p-4', 'lg:p-12', 'mb-5');
            element.innerHTML = `<p class="text-xl text-red-500">${message}</p>`;
            container.appendChild(element);
        }
    }, 2000);
};

// ----------------------------------------------------------------

loadPosts('https://openapi.programming-hero.com/api/retro-forum/posts');
loadLatestPosts('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
document.getElementById('search-btn').addEventListener('click', searchPosts);


