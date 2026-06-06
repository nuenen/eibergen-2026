/**
 * Auto-Upload Script voor Telegram Reunie
 * 
 * Dit script downloadt automatisch nieuwe foto's van Telegram en voegt ze toe aan de galerij.
 * 
 * Gebruik:
 * 1. Kopieer dit script naar /uploads/auto-upload.js op je hosting
 * 2. Configureer de Telegram bot token in het script (gebruik @BotFather)
 * 3. Voeg foto's toe via de Telegram bot: /upload <foto_id>
 */

// Configuratie - aanpassen door gebruiker
const CONFIG = {
    telegramBotToken: 'YOUR_BOT_TOKEN_HERE', // Stel dit in via BotFather
    telegramChannelId: '-1001234567890', // Het ID van de Telegram kanaal
    maxUploadsPerHour: 1, // Beperk upload frequentie
};

// Automatische upload functie
async function autoUploadPhotos() {
    console.log('🔄 Auto-upload gecontroleerd...');
    
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${CONFIG.telegramBotToken}/getUpdates?offset=1`
        );
        const data = await response.json();
        
        if (data.result && data.result.update_id) {
            console.log(`✅ Update ontvangen: ${data.result.update_id}`);
            processNewPhoto(data.result); // Verwerk nieuwe foto
        }
    } catch (error) {
        console.error('❌ Fout bij het ophalen van updates:', error.message);
    }
}

// Verwerk nieuw bericht met foto's
function processNewPhoto(update) {
    const photos = update.message?.photo;
    
    if (!photos && !update.edited_message?.photo) return;
    
    // Meest recente foto gebruiken (grootste bestandsgrootte)
    let photo = [...(photos || [])].sort((a, b) => b.file_size - a.file_size)[0];
    if (!photo && update.edited_message.photo) {
        photo = [...update.edited_message.photo.sort((a, b) => b.file_size - a.file_size)].pop();
    }
    
    // Download en upload
    downloadAndUpload(photo.file_id, photo.file_unique_id);
}

// Download foto en upload naar hosting
async function downloadAndUpload(fileId, fileUniqueId) {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${CONFIG.telegramBotToken}/getFile?file=${fileId}`
        );
        const data = await response.json();
        
        if (data.file_id && data.file_path) {
            // Download de foto
            const photoUrl = `https://api.telegram.org/file/bot${CONFIG.telegramBotToken}/${data.file_path}`;
            const photoBlob = await fetch(photoUrl).then(r => r.blob());
            
            console.log(`✅ Foto gedownload: ${photoBlob.size} bytes`);
            
            // Upload naar hosting (bijv. via FTP/SFTP, of gebruik een cloud API)
            uploadToHosting(photoBlob, fileUniqueId);
        }
    } catch (error) {
        console.error('❌ Fout bij download:', error.message);
    }
}

// Upload naar hosting - dit moet worden geïmplementeerd door gebruiker
async function uploadToHosting(blob, fileId) {
    // Optie 1: Gebruik FTP/SFTP (bijv. via Node.js fs module)
    // Optie 2: Gebruik cloud API (AWS S3, Google Cloud Storage, etc.)
    // Optie 3: Gebruik een middleware zoals Nginx + ngx_http_copy_module
    
    console.log('⏳ Upload naar hosting...');
    
    // Voorbeeldimplementatie met Node.js + express + multer:
    /*
    const fs = require('fs');
    const path = '/var/www/html/uploads';
    fs.writeFile(path + '/' + fileId, blob, async (err) => {
        if (err) {
            console.error(err);
            return;
        }
        // Verwerk de foto en voeg toe aan galerij
    });
    */
}

// Voeg nieuwe foto's toe aan HTML galerij
function addToGallery(blob, fileId) {
    const gallery = document.querySelector('#gallery');
    
    if (!gallery) return;
    
    // Create new photo card element
    const photoCard = document.createElement('article');
    photoCard.className = 'photo-card';
    photoCard.dataset.photoId = fileId.slice(-8); // Generate ID uit file_id
    photoCard.setAttribute('data-photo-id', fileId);
    
    photoCard.innerHTML = `
        <div class="upload-hint">📸 ${fileId}</div>
        <img src="/uploads/${fileId}.jpg" alt="Foto ${fileId}" class="photo-image" onerror="this.src='/placeholder.jpg'">
        <div class="photo-caption">
            <h3 class="photo-title">Foto #${fileId.slice(-8)}</h3>
            <span class="photo-year">2026</span>
        </div>
    `;
    
    gallery.appendChild(photoCard);
}

// Initialiseren bij paginalading
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Auto-upload geinitialiseerd');
    autoUploadPhotos(); // Begin automatisch met controleren
});
