document.getElementById('start').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }
    fetch(`/start-capture?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => console.log(data.message));
});

document.getElementById('stop').addEventListener('click', () => {
    fetch('/stop-capture')
        .then(response => response.json())
        .then(data => console.log(data.message));
});

document.getElementById('generate').addEventListener('click', () => {
    fetch('/generate-report')
        .then(response => response.json())
        .then(data => console.log(data.message));
});
