const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 5;

// Custom headers
const customHeaders = {
    'Content-Type': 'application/json',
};

function fetchData(page) {
    fetch(`${apiUrl}?_page=${page}&_limit=${itemsPerPage}`, {
        method: 'GET',
        headers: customHeaders // Include custom headers here
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayData(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear previous data

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.body}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    fetchData(currentPage);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

// Initial fetch
fetchData(currentPage);