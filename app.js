/**
 * TWICE K-pop Mobile Birthday Greeting Card Logic
 * Customized for 西瓜 from 松鼠 🐿️
 * Background Image: 瓜瓜.jpg
 */

const LETTER_DATA = {
    badge: '🎂 TWICE LOVELY BIRTHDAY LETTER',
    recipient: '西瓜🍉',
    stamps: [LOVELYS[3], LOVELYS[8]],
    message: `哥（松鼠、蛋黃哥）先恭喜妳又長大一歲啦～
解鎖17歲的人生！希望妳在今年的每一天都可以開開心心的，也要記得好好照顧自己。

雖然我們只見過一次面，在現實生活裡也沒有到非常熟悉，但不知道從什麼時候開始，哥真的已經把妳當成自己的妹妹了。知道妳在家裡經歷過的一些事情，也因為發現我們其實有很多地方都很像，所以有時候真的會特別希望妳可以好好的。

其實開學之後，我們真的變得比較少聊天了，基本上有時候一天可能就只有一個話題，聊個幾句就又各自去忙自己的事情了。
有時候回頭想想，會覺得「欸，我們以前好像不是這樣的」，以前可以一聊就聊滿久的，現在卻好像一天也說不了幾句話。

但哥知道妳現在也有自己的生活和事情要忙，所以我其實也沒有覺得怎麼樣，只是偶爾還是會有一點想念以前跟妳聊天的感覺。

不過就算我們現在沒有像以前那麼常聊天，也不代表哥就不在乎妳了。妳有自己的生活，哥也有自己的事情，偶爾忙到沒辦法聊天很正常。只是希望你知道，不管我們隔多久沒聊天，你哪天突然想找哥的時候，還是可以直接來找我。

如果有些事情真的讓妳覺得很煩、很躁，甚至難過到想哭、想找個地方發洩情緒，但又不知道可以跟誰說的時候，都可以來找哥。

妳可以傳訊息給哥，也可以直接打電話，想說什麼都可以。妳的訊息哥都會看，妳也知道哥基本上都是秒回的哈哈哈
所以不用怕打擾哥，也不用覺得不好意思，有什麼事情就直接跟哥說就好。

知道妳上了高二之後，事情變得更多了，學業也比以前更重，可能有時候會覺得很累、壓力很大。雖然哥不一定能幫妳解決所有事情，但至少妳累的時候，可以有一個人聽妳說。

17歲啦～希望妳不要給自己太大的壓力，該開心的時候就好好開心，累的時候就好好休息。希望妳今年可以遇到很多值得開心的事情，也希望不管發生什麼事，你都要記得照顧好自己。

然後，這個網站是專門為妳寫的。
裡面的信，是從我們認識到現在，哥一直想對妳說的一些話。

我沒有辦法給妳親筆信，就算真的寫了，也沒辦法親手交到妳手上（妳離我太遠了哈哈哈，所以最後就想說，那我乾潰自己寫一個網站送給妳。

這個網站是屬於妳的，我也不會把它刪掉，妳隨時都可以打開來看看。或許以後過了一段時間，妳再回來看的時候，會發現裡面有一些以前的回憶，也可以重新想起我們從認識到現在的一些事情。

不過這也是哥第一次自己寫網站送人，可能做得沒有很好，所以別太嫌棄它，希望妳會喜歡

最後再跟妳說一次——
生日快樂西瓜、유진（YUZHEN）、軍師妹妹～～～🎂🎉
妳身分真的好多喔哈哈哈

17歲要好好的，要開心，要照顧好自己。
還是那句話有心事可以來找哥聊聊~~~!

松鼠真的超級愛妳喔 💙❤️`,
    photoUrl: 'images/33.jpg',
    photoCaption: 'Be as ONE ✨ TWICE 💙 瓜瓜',
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

    for (let i = 0; i < 16; i++) {
        particlesArray.push(createAmbientParticle());
    }

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
