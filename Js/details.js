
class GameDetails {
   constructor(id) {
       this.id = id;
       this.containerDetails = null;
   }


   async fetchDetails() {
       const options = {
           method: 'GET',
           headers: {
               'x-rapidapi-key': 'cb2915e18emshdeef159e894ac15p1f521bjsn6ac1c7b5ac1a',
               'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
           }
       };
       try {
           const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`, options);
           const resultDetails = await response.json();
           this.containerDetails = resultDetails;
           this.displayData();
           console.log(resultDetails);
       } catch (error) {
           console.error('Error fetching game details:', error);
       }
   }

   displayData() {
       if (this.containerDetails) {
           let detailsBox = `
               <div class="col-md-4">
                   <div class="boxDet">
                       <div class="image-det">
                           <img src="${this.containerDetails.thumbnail}" class="w-100" alt="details image" />
                       </div>
                   </div>
               </div>

               <div class="col-md-8">
                   <div class="text-box">
                       <h1>${this.containerDetails.title}</h1>
                       <p>Category: <span>${this.containerDetails.genre}</span></p>
                       <p>Platform: <span>${this.containerDetails.platform}</span></p>
                       <p>Status: <span>${this.containerDetails.status}</span></p>
                       <p>${this.containerDetails.description}</p>
                       <a href="${this.containerDetails.game_url}" class="btn btn-primary" target="_blank">Show Now</a>
                   </div>
               </div>
           `;
           document.getElementById("detailsData").innerHTML = detailsBox;
       }
   }
}


class CloseButton {
   constructor(buttonId) {
       this.button = document.getElementById(buttonId);
       this.init();
   }

   init() {
       this.button.addEventListener("click", () => this.handleClose());
   }


   handleClose() {
       history.back();
   }
}


const params = new URLSearchParams(location.search);
const id = params.get("id");


document.addEventListener("DOMContentLoaded", () => {
   const gameDetails = new GameDetails(id);
   gameDetails.fetchDetails();

   const closeButton = new CloseButton("closeBtn");
});
