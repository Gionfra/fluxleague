let allPlayers = [];

fetch("data/players.json")
    .then(res => res.json())
    .then(data => {
        allPlayers = data.players;
        render();
    });

const winsList = document.getElementById("wins-list");
const podiumsList = document.getElementById("podiums-list");
const regionFilters = document.querySelectorAll(".filter-region");

function getActiveRegions() {
    const active = [...regionFilters]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    return active.length ? active : ["EU", "NA", "AS", "SA"];
}

function render() {
    const regions = getActiveRegions();

    winsList.innerHTML = "";
    podiumsList.innerHTML = "";

    const filtered = allPlayers.filter(p =>
        regions.includes(p.region)
    );

    const sortedWins = filtered
        .filter(p => Number(p.wins) > 0)
        .sort((a, b) => b.wins - a.wins);

    const sortedPodiums = filtered
        .filter(p => Number(p.podiums) > 0)
        .sort((a, b) => b.podiums - a.podiums);

    sortedWins.forEach(p => {
        winsList.innerHTML += `
            <div class="player-card">
                <span class="player-name">${p.name}</span>
                <span class="player-stat">${p.wins} wins</span>
                <a class="btn-view" href="players/${p.name}.html">View</a>
            </div>
        `;
    });

    sortedPodiums.forEach(p => {
        podiumsList.innerHTML += `
            <div class="player-card">
                <span class="player-name">${p.name}</span>
                <span class="player-stat">${p.podiums} podiums</span>
                <a class="btn-view" href="players/${p.name}.html">View</a>
            </div>
        `;
    });
}

// Re-render quando clicchi un filtro
regionFilters.forEach(cb =>
    cb.addEventListener("change", render)
);

