let userData = { mood: '', genre: '', energy: 50 };

const genreMap = {
    motivation: ["Phonk", "Rock", "Hardstyle", "Jumpstyle"],
    chill: ["LoFi", "Jazz", "Wavephonk", "Synthwave"],
    focus: ["Classical", "Ambient", "Nature"],
    sad: ["Indie", "Piano", "Slowed"]
};

document.querySelectorAll('#step-1 .option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        userData.mood = e.target.dataset.value;
        renderGenres();
        nextStep(2);
    });
});

function renderGenres() {
    const container = document.getElementById('genre-options');
    container.innerHTML = ''; 
    genreMap[userData.mood].forEach(genre => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = genre;
        btn.onclick = () => {
            userData.genre = genre;
            nextStep(3);
        };
        container.appendChild(btn);
    });
}

function nextStep(num) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${num}`).classList.add('active');
    if (num === 4) sendToBackend();
}

async function sendToBackend() {
    userData.energy = document.getElementById('energy-range').value;
    try {
        const res = await fetch(`/recommend?mood=${userData.mood}&genre=${userData.genre}`);
        const data = await res.json();
        
        // FIXED LINE BELOW: Added $ before {data.playlist_id}
        document.getElementById('results-list').innerHTML = `
            <iframe style="border-radius:12px; margin: 20px 0;" 
                src="https://open.spotify.com/embed/playlist/${data.playlist_id}?utm_source=generator&theme=0" 
                width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
            </iframe>`;
        
        setTimeout(() => nextStep(5), 1500);
    } catch (e) {
        console.error("Connection Error:", e);
        nextStep(5);
    }
}