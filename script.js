// utility functions

const getInnerText = (id) => {
    const element = document.getElementById(id);
    return element.innerText;
};

const setInnerText = (text, id) => {
    document.getElementById(id).innerText = text;
};

const loadPosts = async(url) => {
    const res = await fetch(url)
    const data = await res.json();
    const posts = data.posts;
    console.log(posts[0]);
    for (const post of posts) {
        const indicatorColor = post.isActive?'#10B981' : '#FF3434';
        const container = document.getElementById('all-posts');
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
                            <div class="col-span-6 lg:col-span-6">
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
                                    <div class="flex justify-end">
                                        <img src="./images/mail.png" alt="" class="w-8 h-8">
                                    </div>
                                </div>
                            </div>
                        </div>`;
        container.appendChild(element);
    }
};

// ----------------------------------------------------------------

loadPosts('https://openapi.programming-hero.com/api/retro-forum/posts');