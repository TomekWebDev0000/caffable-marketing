const entriesContainer = document.getElementById('entries');
const linksContainer = document.getElementById('links');
let entries = JSON.parse(localStorage.getItem('dashboardEntries')) || [];

// Pinned links with descriptions
const pinnedLinks = [
    { name: 'Marketing Handbook', url: 'https://docs.google.com/document/d/1d3WIos6s50-CU2bJv3bslctABP0zR9iuAT7qr-MEZV0/edit?usp=sharing', description: 'View the information about being a Marketing Executive here @ Caffable.' },
    { name: 'Marketing Executive Pay Sheet', url: 'https://docs.google.com/document/u/3/d/1xFi7loFpVfTRG84E5TL3BF0EJP3LpV8kz64lxX22SXs/edit', description: 'Details on our Marketing Executive pay.' },
    { name: 'Caffable Roblox Group', url: 'https://www.roblox.com/groups/11341801/Caffable#!/about', description: 'Check out the Caffable Roblox Group' },
];

// Populate pinned links
pinnedLinks.forEach(link => {
    const linkElement = document.createElement('div');
    linkElement.className = 'link';
    linkElement.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a><p>${link.description}</p>`;
    linksContainer.appendChild(linkElement);
});

// Check password
function checkPassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    if (inputPassword === 'Caffable2024') {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadEntries();
        updateTime();
        setInterval(updateTime, 1000);
        document.body.classList.add('loaded'); // Add loaded class for fade-in effect
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Load entries from local storage
function loadEntries() {
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';
        entryElement.innerHTML = `
            <span class="entry-text">${entry}</span>
            <div class="button-group">
                <button class="copy-btn" onclick="copyToClipboard('${entry}')">Copy</button>
                <button class="delete-btn" onclick="deleteEntry('${entry}')">Delete</button>
            </div>
        `;
        entriesContainer.appendChild(entryElement);
    });
}

// Update time
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('datetime').innerText = `Current Time: ${timeString}`;
}

// Create new entry
function createEntry(button) {
    const newEntry = prompt("Enter your new entry:");
    if (newEntry) {
        entries.push(newEntry);
        localStorage.setItem('dashboardEntries', JSON.stringify(entries));
        loadEntries();
        // Animate the button on click
        button.classList.add('button-animated');
        setTimeout(() => {
            button.classList.remove('button-animated');
            button.classList.add('button-original');
        }, 1000); // Animation duration
        setTimeout(() => {
            button.classList.remove('button-original');
        }, 2000); // Return to original color after second timeout
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// Delete entry
function deleteEntry(entry) {
    entries = entries.filter(e => e !== entry);
    localStorage.setItem('dashboardEntries', JSON.stringify(entries));
    loadEntries();
}

// Load all content
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded'); // Add loaded class for fade-in effect
});
