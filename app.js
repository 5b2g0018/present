/**
 * TWICE K-pop Mobile Birthday Greeting Card Logic
 * Customized for 西瓜 from 松鼠 🐿️
 * Background Image: 瓜瓜.jpg
 */

const LETTER_DATA = {
    badge: 'BIRTHDAY LETTER',
    recipient: '西瓜🍉',
    stamps: [LOVELYS[3], LOVELYS[8]],
    message: `先祝西瓜生日快樂～～

雖然我們見過一次面了，但是感覺彼此還沒有那麼熟悉。第一次知道妳是在群通裡，那時候妳正在講妳自己的小故事，而我只是底下的一個聽眾。那時候就覺得，妳應該是一位很有故事的人。

後來聽右右說，妳是一個報喜不報憂的人，所以也希望妳之後可以多多照顧自己一點，不只是把開心的事情分享給大家，遇到不開心的事情，也可以找值得信任的人說說。很多事情不用都自己一個人扛著，偶爾脆弱一下也沒關係。

雖然我們現在還沒有很熟，但還是很開心能夠認識妳，也希望未來有機會可以慢慢變熟一點。

新的一歲，希望妳可以繼續做自己喜歡的事情，遇見更多讓妳開心的人和事。

生日快樂呀西瓜
願妳新的一歲，有很多很多值得開心的日子，也有人陪妳一起分享那些開心與不開心的事情。`,
    photoUrl: 'images/twice.jpg',
    photoCaption: 'TWICE 💙💜 瓜瓜',
    date: '2026.09.05',
    sender: '松鼠 🐿️'
};

document.addEventListener('DOMContentLoaded', () => {
    initParticleEngine();
    parseURLParameters();
    loadLetterData();
    initInnerLetterDecorations();
    initPolaroidLightbox();
});

/* ==========================================================================
   1. K-POP CANVAS PARTICLE ENGINE (60 FPS)
   ========================================================================== */
let particleCtx, particlesArray = [];

function initParticleEngine() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    particleCtx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createAmbientParticle() {
    const symbols = ['✨', '💙', '🌸', '⭐', '💎', '💖', '🍉', '🎉'];
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.floor(Math.random() * 12 + 12),
        speedY: - (Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.3
    };
}

function spawnBurst(x, y, count = 30) {
    try {
        const symbols = ['💙', '✨', '🌟', '💖', '🌸', '🎉', '💎', '🎂', '🍉'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 3;
            particlesArray.push({
                x: x || window.innerWidth / 2,
                y: y || window.innerHeight / 2,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                size: Math.floor(Math.random() * 16 + 14),
                speedX: Math.cos(angle) * velocity,
                speedY: Math.sin(angle) * velocity - 2,
                gravity: 0.2,
                opacity: 1,
                fadeSpeed: Math.random() * 0.025 + 0.02,
                isBurst: true
            });
        }
    } catch (err) { }
}

let lastTime = 0;
function animateParticles(timestamp) {
    if (!particleCtx) return;

    if (timestamp - lastTime > 16) {
        lastTime = timestamp;
        particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = particlesArray.length - 1; i >= 0; i--) {
            const p = particlesArray[i];

            if (p.isBurst) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += p.gravity;
                p.opacity -= p.fadeSpeed;

                if (p.opacity <= 0) {
                    particlesArray.splice(i, 1);
                    continue;
                }
            } else {
                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y < -20) {
                    p.y = window.innerHeight + 20;
                    p.x = Math.random() * window.innerWidth;
                }
            }

            particleCtx.save();
            particleCtx.globalAlpha = Math.max(0, p.opacity);
            particleCtx.font = `${p.size}px Arial`;
            particleCtx.fillText(p.symbol, p.x, p.y);
            particleCtx.restore();
        }
    }

    requestAnimationFrame(animateParticles);
}

/* Image Zoom Lightbox Functions */
function initPolaroidLightbox() {
    const frame = document.getElementById('polaroid-frame');
    if (frame) {
        frame.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = document.getElementById('polaroid-img');
            const caption = document.getElementById('polaroid-caption');
            if (img) {
                openImageLightbox(img.src, caption ? caption.textContent : '');
            }
        });
    }
}

function openImageLightbox(src, caption) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';

    lightbox.classList.add('active');
    playPopSound();
}

function closeImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

function playPopSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1150, ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    } catch (e) { }
}

/* ==========================================================================
   2. SINGLE ENVELOPE OPEN & CLOSE CONTROLLER
   ========================================================================== */
function loadLetterData() {
    const badge = document.getElementById('badge-tag');
    if (badge) badge.textContent = LETTER_DATA.badge;

    const recipient = document.getElementById('letter-recipient-text');
    if (recipient) recipient.textContent = LETTER_DATA.recipient;

    const body = document.getElementById('letter-body-text');
    if (body) body.textContent = LETTER_DATA.message;

    const img = document.getElementById('polaroid-img');
    if (img) img.src = LETTER_DATA.photoUrl;

    const caption = document.getElementById('polaroid-caption');
    if (caption) caption.textContent = LETTER_DATA.photoCaption;

    const date = document.getElementById('letter-date-text');
    if (date) date.textContent = LETTER_DATA.date;

    const sender = document.getElementById('letter-sender-text');
    if (sender) sender.textContent = LETTER_DATA.sender;

    updateLetterStamps(LETTER_DATA.stamps);
}

function openEnvelope(e) {
    if (e) e.stopPropagation();

    const wrapper = document.getElementById('single-envelope-wrapper');
    const paperModal = document.getElementById('letter-paper');
    const overlay = document.getElementById('modal-overlay');

    if (wrapper) wrapper.classList.add('opened');

    try {
        playPopSound();
        const clickX = (e && e.clientX) ? e.clientX : window.innerWidth / 2;
        const clickY = (e && e.clientY) ? e.clientY : window.innerHeight / 2;
        spawnBurst(clickX, clickY, 35);
    } catch (err) { }

    if (overlay) overlay.classList.add('active');
    if (paperModal) paperModal.classList.add('active');
}

function closeEnvelope() {
    const wrapper = document.getElementById('single-envelope-wrapper');
    const paperModal = document.getElementById('letter-paper');
    const overlay = document.getElementById('modal-overlay');

    if (paperModal) paperModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');

    setTimeout(() => {
        if (wrapper) wrapper.classList.remove('opened');
    }, 250);
}

function updateLetterStamps(stampList) {
    const stamps = document.getElementById('letter-stamps');
    if (!stamps || typeof LOVELYS === 'undefined') return;

    stamps.innerHTML = '';
    const listToRender = stampList || [LOVELYS[3], LOVELYS[8]];
    listToRender.forEach(lovely => {
        const stamp = document.createElement('div');
        stamp.className = 'mini-lovely-stamp';
        stamp.innerHTML = createLovelyHTML(lovely, { size: 32 });
        stamps.appendChild(stamp);
    });
}

/* ==========================================================================
   3. INNER LETTER DECORATIONS & STAMPS
   ========================================================================== */
function initInnerLetterDecorations() {
    const innerList = document.getElementById('inner-lovelys-list');
    if (typeof LOVELYS === 'undefined') return;

    if (innerList) {
        innerList.innerHTML = '';

        const topRow = document.createElement('div');
        topRow.className = 'lovelys-row-top';

        const bottomRow = document.createElement('div');
        bottomRow.className = 'lovelys-row-bottom';

        LOVELYS.slice(0, 8).forEach(lovely => {
            const icon = createLovelyClickableIcon(lovely);
            topRow.appendChild(icon);
        });

        const tzuyuIcon = createLovelyClickableIcon(LOVELYS[8]);
        bottomRow.appendChild(tzuyuIcon);

        innerList.appendChild(topRow);
        innerList.appendChild(bottomRow);
    }
}

function createLovelyClickableIcon(lovely) {
    const icon = document.createElement('div');
    icon.className = 'inner-lovely-icon';
    icon.title = `${lovely.name} - ${lovely.member}`;
    icon.innerHTML = createLovelyHTML(lovely, { size: 36 });

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        playPopSound();
        const rect = icon.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top, 25);
        showToast(`💙 ${lovely.name}: ${lovely.quote}`);
    });

    return icon;
}

/* ==========================================================================
   4. URL PARAMETER OVERRIDES
   ========================================================================== */
function parseURLParameters() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('to')) {
        LETTER_DATA.recipient = params.get('to');
    }
    if (params.has('from')) {
        LETTER_DATA.sender = params.get('from');
    }
}

/* Toast Helper */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
