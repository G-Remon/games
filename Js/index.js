
class Menu {
    constructor(menuSelector) {
        this.menuLinks = document.querySelectorAll(menuSelector);
        this.init();
    }

    init() {
        this.menuLinks.forEach(link => {
            link.addEventListener("click", (event) => this.handleClick(event));
        });
    }

    handleClick(event) {
        const link = event.target;
        const current = document.querySelector(".menu a.active");

        if (current) current.classList.remove("active");
        link.classList.add("active");

        const category = link.getAttribute("data-category");
        console.log(category);

        const gameAPI = new GameAPI();
        gameAPI.getGames(category);
    }
}

class GameAPI {
    constructor() {
        this.apiUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        this.apiKey = 'cb2915e18emshdeef159e894ac15p1f521bjsn6ac1c7b5ac1a';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
    }

    async getGames(category) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };


        document.querySelector(".loading").classList.remove("d-none");

        try {
            const response = await fetch(`${this.apiUrl}?category=${category}`, options);
            const result = await response.json();
            const gameDisplay = new GameDisplay(result);
            gameDisplay.displayGames();
        } catch (error) {
            console.error(error);
        } finally {
        
            document.querySelector(".loading").classList.add("d-none");
        }
    }
}


class GameDisplay {
    constructor(games) {
        this.games = games;
    }

    displayGames() {
        let boxCard = "";
        this.games.forEach(game => {
            boxCard += `
            <div class="col-md-3 mb-4">
                <div class="card h-100 position-relative overflow-hidden" onclick="showdetails(${game.id})">
                    <div class="image-card position-relative">
                        <img src="${game.thumbnail}" alt="${game.title}" class="img-fluid object-fit-cover w-100" style="height: 200px;">
                    </div>
                    <div class="card-body">
                        <div class="header d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${game.title}</h5>
                            <span class="badge bg-success">Free</span>
                        </div>
                        <p class="card-text">${game.short_description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <span>${game.genre}</span>
                        <span>${game.platform}</span>
                    </div>
                </div>
            </div>
            `;
        });

        document.querySelector("#rowData").innerHTML = boxCard;
    }
}


function showdetails(id) {
    location.href = "./details.html?id=" + id;
}


document.addEventListener("DOMContentLoaded", () => {
    new Menu(".menu a");
    const gameAPI = new GameAPI();
    gameAPI.getGames("mmorpg");
});
