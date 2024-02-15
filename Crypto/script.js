// Function to fetch cryptocurrency data based on the selected option
function fetchCryptoData() {
    const selectedCrypto = document.getElementById('cryptoInput').value.toLowerCase();

    // Fetch cryptocurrency data from the CoinCap API based on the selected option
    if (selectedCrypto) {
        fetch(`https://api.coincap.io/v2/assets/${selectedCrypto}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Extract relevant information from the API response
                const crypto = data.data;

                // Update the HTML content with the cryptocurrency details
                const cryptoCard = `
                    <div class="col-md-4 mb-5">
                        <div class="card crdClr">
                            <div class="card-header">
                                ${crypto.name} (${crypto.symbol})
                            </div>
                            <div class="card-body">
                                <p class="card-text">Price (USD): $${parseFloat(crypto.priceUsd).toFixed(2)}</p>
                                <p class="card-text">Change (24h): ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%</p>
                            </div>
                        </div>
                    </div>
                `;
                // Update the HTML content with the cryptocurrency details
                document.getElementById('crypto-cards').innerHTML = cryptoCard;
            })
            .catch(error => {
                console.error('Error fetching cryptocurrency data:', error);
            });
    } else {
        // Clear the cryptocurrency cards if no option is selected
        document.getElementById('crypto-cards').innerHTML = '';
    }
}

// Fetch the list of cryptocurrencies and populate the dropdown options
function fetchCryptoList() {
    return new Promise((resolve, reject) => {
        fetch('https://api.coincap.io/v2/assets')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Fetch the cryptocurrency list and populate the dropdown options
fetchCryptoList()
    .then(cryptoList => {
        const cryptoSelect = document.getElementById('cryptoInput');
        cryptoList.forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = crypto.name;
            cryptoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching cryptocurrency list:', error);
    });

// Function to fetch cryptocurrency data and populate the table
function fetchData() {
    fetch('https://api.coincap.io/v2/assets?limit=10')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('crypto-table-body');
            tableBody.innerHTML = ''; // Clear previous data

            data.data.forEach(crypto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${crypto.name}</td>
                    <td>${crypto.symbol}</td>
                    <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                    <td>${parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
                    <td>${parseFloat(crypto.changePercent24Hr).toFixed(2)}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchData(); // Fetch cryptocurrency data and populate the table on page load