import { events } from "./schedule.js";

let searchValue ='';
let filteredCategory = 'All';
let sortSelected = 'default';
let lineupEvents = new Set();


const categories =['All', ...(Array.from(new Set(events.map((e) => e.category))))];



function makeFilterButtons(){
    const filterGroups = document.getElementById('filter-groups');

    filterGroups.innerHTML = '';  // to remove old buttons and make new buttons

    categories.forEach(function(c){
        const button = document.createElement('button');
        button.className = 'button-' + (c === filteredCategory ? 'active' : 'inactive');
        button.textContent = c ;

        button.addEventListener('click',() => {
            filteredCategory = c;
            makeFilterButtons();
            renderEventCards();
        });

        filterGroups.appendChild(button);

    });
}


function filterSort(){
    let filteredEvents = events.filter(function(event){
        let searchMatch = event.name.toLowerCase().includes(searchValue.toLowerCase()); //match search
        let sameCategory = filteredCategory === 'All' || event.category === filteredCategory; //Category same
        return searchMatch && sameCategory
    })

    if (sortSelected === 'day-asc'){
        filteredEvents = filteredEvents.slice().sort((a,b) =>  a.day - b.day);
    }else if (sortSelected === 'reg-desc') {
        filteredEvents = filteredEvents.slice().sort((a,b) =>  b.registrations - a.registrations);
    }

    return filteredEvents;
}

function makeEventCard(event){
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';


    eventCard.innerHTML=`
    <div>
        <div class = "card-heading">
            <span class = "event-name">${event.name}</span> <button class = "bookmark-button">${lineupEvents.has(event.id) ? "-" : "+"}</button>
        </div>
        
        <div class = "category-tag">${event.category}</div>
        
        <div class = "card-details">
            <div>Day ${event.day} </div>
            <div>Time ${event.time} </div>
        </div>
        
        <div class = "card-details">
            <div>Venue ${event.venue} </div>
        </div>
        <div class = "card-registrations">
            <div>${event.registrations} Registrations</div>    
        </div>
    </div>`;

    const cardHeading = eventCard.querySelector(".card-heading");
    const bookmarkButton = cardHeading.querySelector(".bookmark-button");
    bookmarkButton.addEventListener('click',() => toggleEventInLineup(event.id));

    return eventCard;
}

function renderEventCards(){
    
    const eventsGrid = document.getElementById('events-grid');
    const noResultBox = document.getElementById('no-results');
    const eventCount = document.getElementById('event-count');

    eventsGrid.innerHTML=''

    let filteredEvents = filterSort()

    if (filteredEvents.length === 0){
        eventCount.innerHTML = `${filteredEvents.length}`
        eventsGrid.style.display = 'none' ;
        noResultBox.style.display = 'block';
        return;
    }
    
    eventsGrid.style.display = 'flex' ;
    noResultBox.style.display = 'none';
    eventCount.innerHTML = `${filteredEvents.length}`
    
    filteredEvents.forEach((event) =>{
        const card = makeEventCard(event);
        eventsGrid.appendChild(card);

    } )
}

function toggleEventInLineup(eventId){
    if  (lineupEvents.has(eventId)){
        lineupEvents.delete(eventId);
    } else {
        lineupEvents.add(eventId);
    }

    renderEventLineup(); // to render event lineup
    renderEventCards(); //to change the button icon

}

function renderEventLineup(){
    const lineupGrid = document.getElementById('lineup-grid');
    const emptyLineup = document.getElementById('empty-lineup');
    const lineupCount = document.getElementById('lineup-count');
    lineupCount.innerHTML =`${lineupEvents.size}`;

    lineupGrid.innerHTML = '';

    if (lineupEvents.size === 0){
        emptyLineup.style.display = "block";
        emptyLineup.textContent = 'Nothing in Lineup';
        lineupGrid.style.display = "none";
        return;
    }

    emptyLineup.style.display = "none";
    lineupGrid.style.display = "flex";
    
    function makeLineupCard(event){
        const lineupCard = document.createElement("div");
        lineupCard.className = "lineup-card";

        lineupCard.innerHTML=`
        <div>
            <div class = "lineup-heading">
                <span class = "lineup-name">${event.name}</span> <button class = "remove-button">x</button>
            </div>
            
            <div class = "category-tag">${event.category}</div>
            
            <div class = "lineup-details">
                <div>Day ${event.day}, Time ${event.time}, Venue ${event.venue} </div>
            </div>
        </div>`;

        const lineupCardHeading = lineupCard.querySelector(".lineup-heading");
        const removeButton = lineupCardHeading.querySelector(".remove-button");
        removeButton.addEventListener('click',() => toggleEventInLineup(event.id));


        return lineupCard;
    }

    let eventsInLineup = events.filter((e) => lineupEvents.has(e.id));

    eventsInLineup.forEach( (event) => {
        lineupGrid.appendChild(makeLineupCard(event));
    })
}


function getSearchAndSort() {    
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input',(e) => {
        searchValue = e.target.value;
        renderEventCards();
    })

    const sortBy = document.getElementById('sort-by-selected');
    sortBy.addEventListener('change',(e)=> {
        sortSelected = e.target.value;
        renderEventCards();
    })
}

makeFilterButtons()
filterSort()
getSearchAndSort()
renderEventCards()
renderEventLineup()