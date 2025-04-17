const apiKey = 'AIzaSyBxoULROXHKrOY2R7Qu4HpKdsT_16n4ErA'; // Replace with your YouTube Data API key
const fetchButton = document.getElementById('fetchButton');
const channelIdInput = document.getElementById('channelId');
const channelNameSpan = document.getElementById('channelName');
const subCountSpan = document.getElementById('subCount');
const scoreSpan = document.getElementById('score');

fetchButton.addEventListener('click', () => {
    const channelId = channelIdInput.value.trim();
    if (!channelId) {
        alert('Please enter a channel ID');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const channel = data.items[0];
                const channelName = channel.snippet.title;
                const subCount = channel.statistics.subscriberCount;
                const score = parseInt(subCount) * 10; // Simple score calculation

                channelNameSpan.textContent = channelName;
                subCountSpan.textContent = subCount;
                scoreSpan.textContent = score;
            } else {
                alert('Channel not found. Please check the channel ID.');
                channelNameSpan.textContent = '-';
                subCountSpan.textContent = '-';
                scoreSpan.textContent = '-';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Check your API key or internet connection.');
        });
});
