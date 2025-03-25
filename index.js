let baseUrl = 'https://api.coinpaprika.com/v1/tickers'
let container = document.querySelector('#container');
let loader = document.querySelector('.loader');

// let getCoinsWayTwo = ()=> {
//     fetch(baseUrl)
//     .then(response => {
//         if (response.status != 200 || !response.ok) {
//             alert(`HTTP error! Status: ${response.status}`)
//         } else {
//             return response.json()
//         }
//     })
//     .then(data => {
//         console.log(data);
//     })
// }

let getCoins = async(URL)=> {
    loader.style.display = 'block';

    let response = await fetch(URL)
    console.log(response);

    if (response.status != 200 || !response.ok) {
        alert(`HTTP error! Status: ${response.status}`)
    } 
        
    let data = await response.json();

    // let firstPage = 0 ;
    // let nextPage = firstPage + 50 ; 

    let coins = data.slice(0, 50);

    console.log(coins);
    let dom = '';

    coins.forEach((coin,index)=> {
        // console.log(coin);
        dom += `<div class="coin">
            <img class= "coinIcon" src="https://static.coinpaprika.com/coin/${coin.id}/logo.png" alt="">
            <p class="rank">${coin.rank}</p>
            <p class="symbol">${coin.symbol}</p>
            <p class="name">${coin.name}</p>
            <p class="changeD ${String(coin.quotes.USD.percent_change_24h)[0] == '-' ? 'down':'up'}">${coin.quotes.USD.percent_change_24h} %</p>
            <p class="price">$ ${new Intl.NumberFormat().format(coin.quotes.USD.price.toFixed(2))}</p>
        </div>` 

        
    })
    
    let title = '';
    title = `<div class="coin">
            <p class="coinIcon"></p>
            <p class="rankT">RANK</p>
            <p class="symbolT">SYMBOL</p>
            <p class="nameT">NAME</p>
            <p class="changeDT">Change(24h)</p>
            <p class="priceT">PRICE</p>
        </div>`

    loader.style.display = 'none';
    container.innerHTML = title+dom;

    // let change = document.querySelector('.changeD')
    //     console.log(change);
    //     if (change.textContent[0] == '-') {
    //         change.classList.add("down");
    //     }else {
    //         change.classList.add("up");
    //     }
    

    // firstPage = nextPage;
}


getCoins(baseUrl)

    