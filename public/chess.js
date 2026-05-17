const params = new URLSearchParams(window.location.search);

const username = params.get("user")

window.addEventListener("DOMContentLoaded", () => {
    if (username) {
        getPlayer(username);
        getStats(username);
    }
});

async function getPlayer(username) {
    const response = await fetch(`/api/player/${username}`);
    const data = await response.json();

    document.getElementById("playerName").innerText = data.username;
    
}

async function getStats(username) {
    const response = await fetch(`/api/stats/${username}`);

    const data = await response.json();
    
    const blitz = data.chess_blitz?.last?.rating || 0;

    const rapid = data.chess_rapid?.last?.rating || 0;

    const bullet = data.chess_bullet?.last?.rating || 0;

    document.getElementById("blitz").innerText = blitz;
    document.getElementById("rapid").innerText = rapid;
    document.getElementById("bullet").innerText = bullet;
        
    
    const result = generateArchetype(blitz, rapid, bullet);
    createChart(blitz, rapid, bullet);
    
    fetch("/save-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            archetype: result.archetype,
        })
    });
    getHistory();
}
    
async function getHistory() {
    const container = document.getElementById("herstoryList");
     
    if (!container) return;

    const response = await fetch("/history");
    const data = await response.json();

    container.innerHTML = data.map(item =>
        `<p>${item.username} - ${item.archetype}</p>`
    ).join("");
        
}
    function generateArchetype(blitz, rapid, bullet) {
    

        let archetype = "";
        let description = "";

        if (bullet > rapid && bullet > blitz) {
            archetype = "Speeder";
            description = "You thrive in fast-paced games and rely on quick tactics under pressure.";
         
        } else if (rapid > blitz && rapid > bullet) {
            archetype = "Strategist";
            description = "You prefer slower games where planning and positional play matter most.";
        
        
        } else if (blitz > rapid && blitz > bullet) {
            archetype = "Blitzer";
            description = "You are strongest in blitz games and perform well under time pressure with consistency."
        
        }
        else {
            archetype = "Balanced";
            description = "You perform consistently across multiple formats.";
    
        }

        document.getElementById("archetype").innerText = archetype;
        document.getElementById("description").innerText = description;
    
        return { archetype };

    }

    function createChart(blitz, rapid, bullet) {
        const ctx = document.getElementById('ratingChart');

        new Chart(ctx, {
            type: 'bar',

            data: {
                labels: ['Blitz', 'Rapid', 'Bullet'],


                datasets: [{
                    label: 'Ratings',

                    data: [blitz, rapid, bullet]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }