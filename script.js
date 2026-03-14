/* ─────────────────────────────────────────────────────────
   Pi Day Website — Script
   Matrix rain, countdown, digits display, marquee
   ───────────────────────────────────────────────────────── */

// First 1000 decimal digits of Pi (after "3.")
const PI_DIGITS =
    "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679" +
    "8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196" +
    "4428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273" +
    "7245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094" +
    "3305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912" +
    "9833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132" +
    "0005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235" +
    "4201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859" +
    "5024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303" +
    "5982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

// ─── Matrix Pi Rain ─────────────────────────────────────
(function initMatrix() {
    const canvas = document.getElementById("piMatrix");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    const chars = "3.141592653589793238462643383279502884197π∞∑∫√";

    function draw() {
        ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff41";
        ctx.font = fontSize + "px monospace";

        // Recalculate columns if window was resized
        const newCols = Math.floor(canvas.width / fontSize);
        if (newCols !== columns) {
            columns = newCols;
            drops = new Array(columns).fill(1);
        }

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Vary brightness
            const brightness = Math.random();
            if (brightness > 0.95) {
                ctx.fillStyle = "#ffffff";
            } else if (brightness > 0.8) {
                ctx.fillStyle = "#00ff41";
            } else {
                ctx.fillStyle = "#00aa28";
            }

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let lastTime = 0;
    const interval = 45;

    function animate(timestamp) {
        if (timestamp - lastTime >= interval) {
            draw();
            lastTime = timestamp;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})();

// ─── Countdown to Pi Day ────────────────────────────────
(function initCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownEl = document.getElementById("countdown");
    const celebrationEl = document.getElementById("celebration");
    const titleEl = document.getElementById("countdownTitle");

    if (!daysEl) return;

    function getNextPiDay() {
        const now = new Date();
        let year = now.getFullYear();
        // Pi Day is March 14 (month index 2, day 14)
        let piDay = new Date(year, 2, 14, 0, 0, 0, 0);

        // If Pi Day has already passed this year, target next year
        if (now > new Date(year, 2, 14, 23, 59, 59, 999)) {
            piDay = new Date(year + 1, 2, 14, 0, 0, 0, 0);
        }
        return piDay;
    }

    function isPiDay() {
        const now = new Date();
        return now.getMonth() === 2 && now.getDate() === 14;
    }

    function update() {
        if (isPiDay()) {
            countdownEl.classList.add("hidden");
            celebrationEl.classList.remove("hidden");
            titleEl.textContent = "🥳 Happy Pi Day!";
            return;
        }

        const now = new Date();
        const target = getNextPiDay();
        const diff = target - now;

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        daysEl.textContent = String(days).padStart(3, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
})();

// ─── Pi Digits Marquee ──────────────────────────────────
(function initMarquee() {
    const el = document.getElementById("piMarquee");
    if (!el) return;

    const fullPi = "3." + PI_DIGITS;
    // Duplicate for seamless scroll
    const marqueeText = ("π = " + fullPi + "…    ").repeat(4);
    el.textContent = marqueeText;
})();

// ─── First 1000 Digits Display ──────────────────────────
(function initDigitsDisplay() {
    const container = document.getElementById("piDigits");
    if (!container) return;

    const fullPi = "3." + PI_DIGITS;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < fullPi.length; i++) {
        const span = document.createElement("span");
        span.textContent = fullPi[i];

        if (i === 0) {
            span.className = "digit-3";
        } else if (fullPi[i] === ".") {
            span.className = "digit-dot";
        } else if (i % 10 === 0) {
            span.className = "digit-highlight";
        }
        fragment.appendChild(span);
    }

    container.appendChild(fragment);
})();
