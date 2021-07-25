const search = document.getElementById('search');
const submit = document.getElementById('submit');
const results = document.getElementById('results');
const result_heading = document.getElementById('result_heading');
const form = document.getElementById('form');

const client_id = "=";


function search_image(e) {
    e.preventDefault();

    // get search term
    const term = search.value.trim();

    const url = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${term}`;


    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results.length, data.results);

            result_heading.innerHTML = `<h2>Search Results for '${term}'</h2>`;

            if (data.results.length === 0) {
                result_heading.innerHTML = `<p>There are no search results for '${term}', please try again</p>`;
            } else {
                results.innerHTML = data.results.map(data =>
                    `<div><img src="${data.urls.regular}" alt="${data.alt_description}">
                    <p class="author">
                     Photo by <a href="${data.user.links.html}?utm_source=ImG_Search&utm_medium=referral">${data.user.username}</a> on <a
        href="https://unsplash.com/?utm_source=ImG_Search&utm_medium=referral">Unsplash</a>
</p>
<a class="download" href="${data.links.download}" download><i class="fa fa-arrow-down" aria-hidden="true"></i>
    </a>
</div>`
                ).join(' ');

            }

        });


}


const new_img = `<div><img src="images/image6.jpeg" alt=""></div>`;

form.addEventListener('submit', search_image);