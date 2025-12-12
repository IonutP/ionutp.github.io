// YouTube Video Downloader - Client-side handler
// Note: Direct YouTube downloads from browser are limited due to CORS and YouTube's policies

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('downloadForm');
    const videoUrlInput = document.getElementById('videoUrl');
    const formatSelect = document.getElementById('format');
    const qualitySelect = document.getElementById('quality');
    const downloadBtn = document.getElementById('downloadBtn');
    const statusDiv = document.getElementById('status');
    const videoInfoDiv = document.getElementById('videoInfo');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const url = videoUrlInput.value.trim();
        const format = formatSelect.value;
        const quality = qualitySelect.value;

        if (!url) {
            showStatus('Please enter a valid YouTube URL', 'error');
            return;
        }

        if (!isValidYouTubeUrl(url)) {
            showStatus('Please enter a valid YouTube URL', 'error');
            return;
        }

        // Show loading state
        downloadBtn.disabled = true;
        downloadBtn.querySelector('.btn-text').style.display = 'none';
        downloadBtn.querySelector('.btn-loader').style.display = 'inline';

        try {
            // Attempt to get video info (this will fail due to CORS, but we can show alternatives)
            await handleDownload(url, format, quality);
        } catch (error) {
            console.error('Error:', error);
            showStatus(
                'Direct browser downloads are not possible due to security restrictions. ' +
                'Please use the Python script or a desktop application.',
                'error'
            );
            showPythonScriptInstructions();
        } finally {
            downloadBtn.disabled = false;
            downloadBtn.querySelector('.btn-text').style.display = 'inline';
            downloadBtn.querySelector('.btn-loader').style.display = 'none';
        }
    });

    function isValidYouTubeUrl(url) {
        const patterns = [
            /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/,
            /^https?:\/\/youtube\.com\/watch\?v=[\w-]+/,
            /^https?:\/\/youtu\.be\/[\w-]+/
        ];
        return patterns.some(pattern => pattern.test(url));
    }

    async function handleDownload(url, format, quality) {
        // Extract video ID
        const videoId = extractVideoId(url);
        
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Show info about limitations
        showStatus(
            'Browser-based downloads are limited. Here are your options:',
            'info'
        );

        // Display video info and download options
        displayVideoInfo(url, format, quality);
    }

    function extractVideoId(url) {
        const patterns = [
            /[?&]v=([^&]+)/,
            /youtu\.be\/([^?]+)/,
            /^([\w-]+)$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    function displayVideoInfo(url, format, quality) {
        const videoId = extractVideoId(url);
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        
        videoInfoDiv.style.display = 'block';
        videoInfoDiv.innerHTML = `
            <h3>Video Information</h3>
            <p><strong>URL:</strong> ${url}</p>
            <p><strong>Format:</strong> ${format === 'audio' ? 'Audio (MP3)' : 'Video (MP4)'}</p>
            <p><strong>Quality:</strong> ${quality}</p>
            <div style="margin-top: 15px;">
                <h4>Download Options:</h4>
                <ol style="margin-left: 20px; margin-top: 10px;">
                    <li style="margin: 8px 0;">
                        <strong>Use Python Script:</strong> Run <code>python download_youtube.py "${url}"</code>
                    </li>
                    <li style="margin: 8px 0;">
                        <strong>Use yt-dlp directly:</strong> <code>yt-dlp "${url}"</code>
                    </li>
                    <li style="margin: 8px 0;">
                        <strong>Browser Extension:</strong> Install a YouTube downloader extension
                    </li>
                </ol>
            </div>
        `;
    }

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status-message ${type}`;
        statusDiv.style.display = 'block';
    }

    function showPythonScriptInstructions() {
        const instructions = `
            <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                <h4 style="margin-bottom: 10px;">💡 Recommended Solution</h4>
                <p style="margin-bottom: 10px;">Use the Python script for reliable downloads:</p>
                <code style="display: block; padding: 10px; background: #2d2d2d; color: #f8f8f2; border-radius: 4px; margin-top: 10px;">
                    pip install yt-dlp<br>
                    python download_youtube.py "${videoUrlInput.value}"
                </code>
            </div>
        `;
        videoInfoDiv.innerHTML = instructions;
        videoInfoDiv.style.display = 'block';
    }
});

