const search = document.getElementById('search');
const submit = document.getElementById('submit');
const results = document.getElementById('results');
const result_heading = document.getElementById('result_heading');
const form = document.getElementById('form');
const roller = document.querySelector(".lds-roller")
const input = document.querySelector("input[type='text']")
const err = document.querySelector(".err")


async function search_image (e) {
    e.preventDefault()
  
    
    // get search term
    const term = search.value.trim();
    const url = `/.netlify/functions/fetch-image?term=${term}`;
    
     if (term === "") {
                   roller.style.display = "none"
                  
                           err.style.opacity = '1'
                           input.style.boxShadow = '0 0 0 2px #DF2E2E'
                    
                   setTimeout(() => {
                       err.style.opacity = '0'
                           input.style.boxShadow = '0 0 0 2px #d7e1ec'
                   }, 3000);
                //  result_heading.innerHTML = `<h3>Please enter a search term</h3>`
            } else {
                  roller.style.display = "inline-block"
    results.innerHTML = ""
    results.appendChild(roller)
    result_heading.innerHTML = `<p>searching for '${term}'</p>`
            
    try {
        let res = await fetch(url)
        let data = await res.json()

         result_heading.innerHTML = `<h2>Search Results for '${term}'</h2>`;

           if (data.results.length === 0) {
                                   roller.style.display = "none"

                results.innerHTML = `<p style="font-size:5em;text-align:center;">😔</p>`;
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

                setTimeout(() => {
                    search.value = ""
                }, 5000);

            }
    } catch (error) {
        console.error(error)
    }
}
}

form.addEventListener('submit', search_image);

// Same thing but using promises
/* function search_image(e) {
    e.preventDefault();

    // get search term
    const term = search.value.trim();

    const url = `/.netlify/functions/fetch-image?term=${term}`;


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


} */