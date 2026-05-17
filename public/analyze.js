document.getElementById("analyzebt").addEventListener("click", () => {
    
    const username = document.getElementById("username").value.trim();

    if (!username) return;
    window.location.href = `dashboard.html?user=${username}`;

});