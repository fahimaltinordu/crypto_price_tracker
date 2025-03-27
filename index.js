let baseUrl = 'https://api.coinpaprika.com/v1/tickers'
let container = document.querySelector('#container');
let loader = document.querySelector('.loader');
let searchArea = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let body = document.getElementsByTagName('body')[0];

searchBtn.addEventListener('click', ()=> {
    let input = searchArea.value.toUpperCase();
    console.log(input);

    if(searchArea.value == '') {
        alert('enter valid coin name')
        return
    }

    getCoinsWayTwo(input)

    searchArea.value ='';
}) 

let bounce = null;
let typeahead = '';
searchArea.addEventListener('keyup', (e)=> {

    clearTimeout(bounce);
    
    let char = String.fromCharCode(e.which);
    if (/[a-z]/i.test(char)) {
        typeahead += e.key.toUpperCase();
        console.log(typeahead);
    }

    bounce = setTimeout(debounce, 1000);
    
    function debounce() {
        getCoinsWayTwo(typeahead)
        
    }



})

let getCoinsWayTwo = (input)=> {
    fetch(baseUrl)
    .then(response => {
        if (response.status != 200 || !response.ok) {
            alert(`HTTP error! Status: ${response.status}`)
        } else {
            console.log(response);
            return response.json()
        }
    })
    .then(data => {
        let modal = '';
        for(let i = 0 ; i<data.length; i++) {
            // console.log(i, data[i].symbol);
            let str = data[i].symbol;
            if(str.includes(input)) {
                
                modal += `<div class="modal ${String(data[i].quotes.USD.percent_change_24h)[0] == '-' ? 'downM':'upM'}">
                            <img class= "coinIcon" src="https://static.coinpaprika.com/coin/${data[i].id}/logo.png" alt="">
                            <h2>${data[i].symbol}</h2>
                            <h3>$ ${data[i].quotes.USD.price.toFixed(6)}</h3>
                            <h2>${data[i].quotes.USD.percent_change_24h} %</h2>
                        </div>`
                // break
            }
        } 
        // if(modal == '') {
        //     alert('NOT FOUND')
        // }

        var z = document.createElement('div');
        z.className= 'zCont';

        z.innerHTML = modal;
        container.appendChild(z); 

        const myTimeout = setTimeout(stop, 5000);
        function stop() {
            container.removeChild(z)
            typeahead = '';
            searchArea.value ='';
        }
    })
}

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
            <p class="price">$ ${String(coin.quotes.USD.price)[0]=='0' ? coin.quotes.USD.price.toFixed(6) : new Intl.NumberFormat().format(coin.quotes.USD.price.toFixed(2)) }</p>
        </div>` 

        // ${new Intl.NumberFormat().format(coin.quotes.USD.price.toFixed(2))} 
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
    

    // firstPage = nextPage;
}


getCoins(baseUrl)

 