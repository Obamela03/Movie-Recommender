//
//
//
// const form = document.getElementById('movieForm');
// const loading = document.getElementById('loading');
// const resultsDiv = document.getElementById('results');
//
// // ------------------ Load all movies on page load ------------------
// async function loadAllMovies() {
//     resultsDiv.innerHTML = '';
//     try {
//         const response = await fetch('/all_movies');
//         const data = await response.json();
//         displayMovies(data);
//     } catch (err) {
//         resultsDiv.innerHTML = `<p class="error">Failed to load movies.</p>`;
//         console.error(err);
//     }
// }
//
// // ------------------ Display movies ------------------
// function displayMovies(movies) {
//     resultsDiv.innerHTML = '';
//     movies.forEach(rec => {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.innerHTML = `
//             <h2>${rec.movie_name}</h2>
//             <hr>
//             <p><strong>Genre:</strong> ${rec.genre}</p>
//             <p><strong>Cast:</strong> ${rec.star}</p>
//             <p><strong>Year:</strong> ${rec.year}</p>
//             <p>${rec.description.substring(0, 150)}...</p>
//         `;
//         resultsDiv.appendChild(card);
//     });
// }
//
// // ------------------ Handle recommendation form ------------------
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//
//     resultsDiv.innerHTML = '';
//     resultsDiv.classList.add('hidden');
//     loading.classList.remove('hidden');
//
//     const movie_name = document.getElementById('movie_name').value.trim();
//
//     try {
//         const response = await fetch('/recommend', {
//             method: 'POST',
//             body: new URLSearchParams({ movie_name }),
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         });
//
//         const data = await response.json();
//
//         // Simulate a realistic loading delay (1 second)
//         setTimeout(() => {
//             loading.classList.add('hidden');
//             resultsDiv.classList.remove('hidden');
//
//             if (data.error) {
//                 resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
//             } else if (data.recs.length === 0) {
//                 resultsDiv.innerHTML = `<p class="error">No recommendations found.</p>`;
//             } else {
//                 displayMovies(data.recs);
//             }
//         }, 1000); // 1000ms = 1 second delay
//
//     } catch (err) {
//         loading.classList.add('hidden');
//         resultsDiv.classList.remove('hidden');
//         resultsDiv.innerHTML = `<p class="error">Error fetching recommendations.</p>`;
//         console.error(err);
//     }
// });
//
// // ------------------ Initialize ------------------
// window.addEventListener('DOMContentLoaded', loadAllMovies);


const formElement = document.getElementById('movieForm');
const spinnerElement = document.getElementById('loading');
const outputElement = document.getElementById('results');

// ------------------ Load all movies on page load (renamed) ------------------
async function fetchAllMovies() {
    outputElement.innerHTML = '';
    try {
        const response = await fetch('/all_movies');
        const data = await response.json();
        renderMovies(data);
    } catch (err) {
        outputElement.innerHTML = `<p class="error">Failed to load movies.</p>`;
        console.error(err);
    }
}

// ------------------ Render movie cards (renamed) ------------------
function renderMovies(movieArray) {
    outputElement.innerHTML = '';
    movieArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card'); // keep CSS class 'card' so styling remains intact
        card.innerHTML = `
            <h2>${item.movie_name}</h2>
            <hr>
            <p><strong>Genre:</strong> ${item.genre}</p>
            <p><strong>Year:</strong> ${item.year}</p>
            <p><strong>Cast:</strong> ${item.star}</p>

        `;
        outputElement.appendChild(card);
    });
}

// ------------------ Handle recommendation form (renamed handler and local vars) ------------------
formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    outputElement.innerHTML = '';
    outputElement.classList.add('hidden');
    spinnerElement.classList.remove('hidden');

    const queryVal = document.getElementById('movie_name').value.trim();

    try {
        const response = await fetch('/recommend', {
            method: 'POST',
            body: new URLSearchParams({ movie_name: queryVal }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const payload = await response.json();

        // Simulate a realistic loading delay (1 second)
        setTimeout(() => {
            spinnerElement.classList.add('hidden');
            outputElement.classList.remove('hidden');

            if (payload.error) {
                outputElement.innerHTML = `<p class="error">${payload.error}</p>`;
            } else if (!payload.recs || payload.recs.length === 0) {
                outputElement.innerHTML = `<p class="error">No recommendations found.</p>`;
            } else {
                renderMovies(payload.recs);
            }
        }, 1000); // 1000ms = 1 second delay

    } catch (err) {
        spinnerElement.classList.add('hidden');
        outputElement.classList.remove('hidden');
        outputElement.innerHTML = `<p class="error">Error fetching recommendations.</p>`;
        console.error(err);
    }
});

// ------------------ Initialize (renamed) ------------------
window.addEventListener('DOMContentLoaded', fetchAllMovies);
