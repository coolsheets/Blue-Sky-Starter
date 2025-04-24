const fetch = require('node-fetch')
const fs = require('fs');
const path = require('path');

// Timestamp formatter
function getFormattedTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[-:.]/g, '').replace('T', 'T').replace('Z', 'Z');
}

// Pad to 3-digit folder/file number
function padCameraNumber(numStr) {
  return numStr.padStart(3, '0');
}

// Extract camera number from URL (e.g., loc75.jpg → 075)
function extractCameraNumberFromUrl(url) {
  const match = url.match(/loc(\d+)\.jpg/i);
  return match ? padCameraNumber(match[1]) : null;
}

// Download image
async function downloadImage(url, folder, filename) {
  try {
    await fs.promises.mkdir(folder, { recursive: true });

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = await res.buffer();
    const fullPath = path.join(folder, filename);
    fs.writeFileSync(fullPath, buffer);
    console.log(`✅ Saved: ${fullPath}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to download ${url}: ${err.message}`);
    return false;
  }
}

// Main
async function captureImages() {
  const API_URL = 'https://data.calgary.ca/resource/k7p9-kppz.geojson';
  const IMAGE_URL_REGEX = /(https?:\/\/[^\s"]+\.jpg)/i;
  const logEntries = [];

  try {
    console.log(`🌐 Fetching GeoJSON from ${API_URL}...`);
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`GeoJSON fetch failed: ${response.status} ${response.statusText}`);

    const geojson = await response.json();
    if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
      throw new Error('GeoJSON does not contain a valid "features" array.');
    }

    const validCameras = geojson.features
      .map((feature) => {
        const raw = feature.properties?.camera_url?.url;
        if (typeof raw !== 'string') return null;
        const match = raw.match(IMAGE_URL_REGEX);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    console.log(`✅ Found ${validCameras.length} valid camera URLs`);

    for (const imageUrl of validCameras) {
      const camNum = extractCameraNumberFromUrl(imageUrl);
      if (!camNum) {
        console.warn(`⚠️ Could not extract camera number from ${imageUrl}`);
        continue;
      }

      const timestamp = getFormattedTimestamp();
      const filename = `${camNum}_image_${timestamp}.jpeg`;
      const folder = path.join(__dirname, camNum);

      const success = await downloadImage(imageUrl, folder, filename);

      if (success) {
        logEntries.push({
          Camera_URL: imageUrl,
          folder: folder,
          filename: filename
        });
      }
    }

    // Write log
    const logFilename = `capture_log_${getFormattedTimestamp()}.json`;
    const logDir = path.join(__dirname, 'logs');
    await fs.promises.mkdir(logDir, { recursive: true });
    fs.writeFileSync(path.join(logDir, logFilename), JSON.stringify(logEntries, null, 2));
    console.log(`📝 Log written to logs/${logFilename}`);

  } catch (err) {
    console.error('❌ Error during image capture:', err.message);
  }
}

// Run
captureImages().then(() => {
  console.log('✅ Test run complete.');
});
