const searchInput = document.getElementById("playerSearch");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");

let players = [];

// Carica i dati dei player
fetch("data/players.json")
    .then(res => res.json())
    .then(data => {
        players = data.players;
    });

// Funzione per mostrare i suggerimenti
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (!value) {
        suggestions.style.display = "none";
        return;
    }

    const filtered = players.filter(p => p.name.toLowerCase().includes(value));

    filtered.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.name;
        li.addEventListener("click", () => {
            window.location.href = p.profile;
            suggestions.style.display = "none";
        });
        suggestions.appendChild(li);
    });

    suggestions.style.display = filtered.length ? "block" : "none";
});

// Funzione di ricerca principale
function searchPlayer() {
    const value = searchInput.value.toLowerCase().trim();
    const found = players.find(p => p.name.toLowerCase() === value);

    if (found) {
        window.location.href = found.profile;
    } else {
        alert("Player not found");
    }
}

// Ricerca con Enter
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") searchPlayer();
});

// Ricerca con bottone
searchBtn.addEventListener("click", searchPlayer);

// Chiudi i suggerimenti quando clicchi fuori
document.addEventListener("click", e => {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
    }
});
