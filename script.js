import { events } from './schedule.js';


const state = {
    search : '',
    category : 'All',
    sort : 'default',      
    lineup : new Set()
};

const maxRegistrations = Math.max(...events.map(function(e) {return e.registrations;}));

const totalCategories = Array.from(new Set(events.map(function(e) {return e.category; })));



function buildFilterButtons() {
    const categories = ['All', ...totalCategories];
    const filterGroup = document.getElementById('filterGroup');

    filterGroup.innerHTML = ''; 

    categories.forEach(function(categ) {
        const btn = document.createElement('button');
        btn.className = 'btn' + (categ === state.category ? ' active' : ''); 
        btn.textContent = categ;

        btn.addEventListener('click', function() {
            state.category = categ;
            buildFilterButtons();
            renderCards();
        });

        filterGroup.appendChild(btn);
    });
}



function getFilteredAndSorted() {
    let result = events.filter(function(event) {
        return (event.name.toLowerCase().includes(state.search.toLowerCase())) && (state.category === 'All' || event.category === state.category);
    });

    if (state.sort === 'day-asc') {
        result = result.slice().sort(function(a,b) { return a.day - b.day; });
    } else if (state.sort === 'day-desc') {
        result = result.slice().sort(function(a,b) { return b.day - a.day; });
    } else if (state.sort === 'regs-asc') {
        result = result.slice().sort(function(a,b) { return a.registrations - b.registrations; });
    } else if (state.sort === 'regs-desc') {
        result = result.slice().sort(function(a,b) { return b.registrations - a.registrations; });
    }

    return result;
}



function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';

    const isSaved = state.lineup.has(event.id);

    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';

    const eventName = document.createElement('div');
    eventName.className = 'event-name';
    eventName.textContent = event.name;

    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.className = 'bookmark-btn' + (isSaved ? ' saved' : ''); 
    bookmarkBtn.title = isSaved ? 'Remove from Favourites' : 'Add to Favourites';
    bookmarkBtn.textContent = isSaved ? '-' : '+';
    bookmarkBtn.addEventListener('click', function() { toggleLineup(event.id); }); 

    cardTop.appendChild(eventName);
    cardTop.appendChild(bookmarkBtn);

    const categoryTags = document.createElement('div');
    categoryTags.className = 'category-tag';
    categoryTags.textContent = event.category;

    const cardDetails = document.createElement('div');
    cardDetails.className = 'card-details';
    cardDetails.innerHTML = `
    <div class="detail-item">
        <span class="detail-label">Day</span>
        <span class="detail-value">${event.day}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Time</span>
        <span class="detail-value">${event.time}</span>
    </div>
    <div class="detail-item full-width">
        <span class="detail-label">Venue</span>
        <span class="detail-value">${event.venue}</span>
    </div>`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';

    const regLabel = document.createElement('div');
    regLabel.className = 'registrations';
    regLabel.innerHTML = event.registrations.toLocaleString() + ' registered';

    cardFooter.appendChild(regLabel);

    card.appendChild(cardTop);
    card.appendChild(categoryTags);
    card.appendChild(cardDetails);
    card.appendChild(cardFooter);

    return card;
}



function renderCards() {
    const structure = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noResults');
    const countBadge = document.getElementById('countBadge');

    structure.innerHTML = '';  

    const filtered = getFilteredAndSorted();

    if (filtered.length === 0) {
        noResults.style.display = 'block';
        countBadge.textContent = '0';
        return;
    }

    noResults.style.display = 'none';
    countBadge.textContent = filtered.length;

    filtered.forEach(function(event) {
        structure.appendChild(createEventCard(event));
    });
}



function toggleLineup(eventId) {
    if (state.lineup.has(eventId)) {
        state.lineup.delete(eventId);
    } else {
        state.lineup.add(eventId);
    }
    document.getElementById('statSaved').textContent = state.lineup.size;
    renderLineup();   
    renderCards();
}

function renderLineup() {
    const lineupList = document.getElementById('lineupList');
    const savedEvents = events.filter(function(e) { return state.lineup.has(e.id); });

    lineupList.innerHTML = '';   

    if (savedEvents.length === 0) {
        const empty = document.createElement('div');
        empty.id = 'lineupEmpty';   
        empty.textContent = 'Click + on a card to save it.';
        lineupList.appendChild(empty);
        return;
    }

    savedEvents.forEach(function(event) {
        const item = document.createElement('div');
        item.className = 'lineup-item';

        const info = document.createElement('div');

        const name = document.createElement('div');
        name.className   = 'lineup-item-name';
        name.textContent = event.name;

        const details = document.createElement('div');
        details.className   = 'lineup-item-details';
        details.textContent = 'Day ' + event.day + ' · ' + event.time + ' · ' + event.venue;

        info.appendChild(name);
        info.appendChild(details);

        const removeBtn = document.createElement('button');
        removeBtn.className   = 'lineup-remove';
        removeBtn.textContent = 'x';
        removeBtn.title       = 'Remove';
        removeBtn.addEventListener('click', function() { toggleLineup(event.id); });

        item.appendChild(info);
        item.appendChild(removeBtn);
        lineupList.appendChild(item);
    });
}



function renderStats() {
    document.getElementById('statTotal').textContent = events.length;

    const totalRegs = events.reduce(function(acc, event) {
        return acc + event.registrations;
    }, 0);
    document.getElementById('statRegs').textContent = totalRegs.toLocaleString();

    const categoryTotals = {};
    events.forEach(function(event) {
        if (!categoryTotals[event.category]) { categoryTotals[event.category] = 0; }
        categoryTotals[event.category] += event.registrations;
    });

    const topCategory = Object.entries(categoryTotals).sort(function(a, b) {
        return b[1] - a[1];
    })[0];
    document.getElementById('statPopular').textContent = topCategory[0];
}


function setupListeners() {
    document.getElementById('searchInput').addEventListener('input', function(e) {
        state.search = e.target.value;
        renderCards();
    });

    document.getElementById('sortSelect').addEventListener('change', function(e) {
        state.sort = e.target.value;
        renderCards();
    });
}


function init() {
    renderStats();
    buildFilterButtons();
    renderCards();
    renderLineup();
    setupListeners();
}

init();