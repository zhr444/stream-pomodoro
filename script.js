let WORK_TIME_MS = 25 * 60 * 1000;
let BREAK_TIME_MS = 5 * 60 * 1000;
let LONG_BREAK_TIME_MS = 15 * 60 * 1000;

let timeLeftMs = WORK_TIME_MS;
let totalTimeMs = WORK_TIME_MS; 
let timerId = null;
let endTime = null;
let currentMode = 'work'; 
let currentLang = 'ru';
let completedPomodoros = 0;

const translations = {
    ru: {
        title: 'Pomodoro', workMode: 'Работа', breakMode: 'Отдых', longBreakMode: 'Перерыв',
        start: 'Старт', pause: 'Пауза', reset: 'Сброс',
        workTab: 'Работа', breakTab: 'Отдых', longBreakTab: 'Перерыв',
        settingsShow: 'Настройки', settingsHide: 'Скрыть настройки',
        alertWorkEnd: 'Отличная работа! Пора отдохнуть.', alertBreakEnd: 'Отдых окончен! Возвращаемся к делам.',
        soundLabel: 'Звук уведомлений:', msLabel: 'Миллисекунды:', customTimeLabel: 'Время (ч:м):', applyBtn: 'OK',
        lblWork: 'Раб', lblBreak: 'Отд', lblLong: 'Пер'
    },
    en: {
        title: 'Pomodoro', workMode: 'Work', breakMode: 'Break', longBreakMode: 'Long Break',
        start: 'Start', pause: 'Pause', reset: 'Reset',
        workTab: 'Work', breakTab: 'Break', longBreakTab: 'L. Break',
        settingsShow: 'Settings', settingsHide: 'Hide Settings',
        alertWorkEnd: 'Great job! Time to take a break.', alertBreakEnd: 'Break is over! Let\'s get back to work.',
        soundLabel: 'Sound:', msLabel: 'Milliseconds:', customTimeLabel: 'Time (h:m):', applyBtn: 'OK',
        lblWork: 'Wrk', lblBreak: 'Brk', lblLong: 'Lng'
    },
    zh: {
        title: '番茄钟', workMode: '工作', breakMode: '休息', longBreakMode: '长休息',
        start: '开始', pause: '暂停', reset: '重置',
        workTab: '工作', breakTab: '休息', longBreakTab: '长休息',
        settingsShow: '设置', settingsHide: '隐藏设置',
        alertWorkEnd: '干得好！休息一下。', alertBreakEnd: '休息结束！回去工作。',
        soundLabel: '提示音:', msLabel: '毫秒:', customTimeLabel: '时间(时:分):', applyBtn: '应用',
        lblWork: '工作', lblBreak: '休息', lblLong: '长休'
    },
    uk: {
        title: 'Pomodoro', workMode: 'Робота', breakMode: 'Відпочинок', longBreakMode: 'Перерва',
        start: 'Старт', pause: 'Пауза', reset: 'Скинути',
        workTab: 'Робота', breakTab: 'Відпоч.', longBreakTab: 'Перерва',
        settingsShow: 'Налаштування', settingsHide: 'Сховати налаштування',
        alertWorkEnd: 'Чудова робота! Час відпочити.', alertBreakEnd: 'Відпочинок закінчено! До роботи.',
        soundLabel: 'Звук:', msLabel: 'Мілісекунди:', customTimeLabel: 'Час (г:хв):', applyBtn: 'OK',
        lblWork: 'Роб', lblBreak: 'Від', lblLong: 'Пер'
    },
    be: {
        title: 'Pomodoro', workMode: 'Праца', breakMode: 'Адпачынак', longBreakMode: 'Перапынак',
        start: 'Старт', pause: 'Паўза', reset: 'Скінуць',
        workTab: 'Праца', breakTab: 'Адпач.', longBreakTab: 'Перапынак',
        settingsShow: 'Налады', settingsHide: 'Схаваць налады',
        alertWorkEnd: 'Выдатная праца! Час адпачыць.', alertBreakEnd: 'Адпачынак скончаны! Да працы.',
        soundLabel: 'Гук:', msLabel: 'Мілісекунды:', customTimeLabel: 'Час (г:хв):', applyBtn: 'OK',
        lblWork: 'Пра', lblBreak: 'Адп', lblLong: 'Пер'
    },
    kk: {
        title: 'Pomodoro', workMode: 'Жұмыс', breakMode: 'Үзіліс', longBreakMode: 'Ұзақ үзіліс',
        start: 'Бастау', pause: 'Кідірту', reset: 'Қайтару',
        workTab: 'Жұмыс', breakTab: 'Үзіліс', longBreakTab: 'Ұ. үзіліс',
        settingsShow: 'Баптаулар', settingsHide: 'Баптауларды жасыру',
        alertWorkEnd: 'Жақсы жұмыс! Демалатын уақыт.', alertBreakEnd: 'Үзіліс аяқталды! Жұмысқа оралайық.',
        soundLabel: 'Дыбыс:', msLabel: 'Миллисекундтар:', customTimeLabel: 'Уақыт (с:м):', applyBtn: 'OK',
        lblWork: 'Жұм', lblBreak: 'Үзі', lblLong: 'Ұ.үз'
    },
    es: {
        title: 'Pomodoro', workMode: 'Trabajo', breakMode: 'Descanso', longBreakMode: 'Descanso largo',
        start: 'Inicio', pause: 'Pausa', reset: 'Reinicio',
        workTab: 'Trabajo', breakTab: 'Descanso', longBreakTab: 'D. Largo',
        settingsShow: 'Configuración', settingsHide: 'Ocultar',
        alertWorkEnd: '¡Buen trabajo! Hora de descansar.', alertBreakEnd: '¡Fin del descanso! A trabajar.',
        soundLabel: 'Sonido:', msLabel: 'Milisegundos:', customTimeLabel: 'Tiempo (h:m):', applyBtn: 'OK',
        lblWork: 'Tra', lblBreak: 'Des', lblLong: 'D.L'
    },
    fr: {
        title: 'Pomodoro', workMode: 'Travail', breakMode: 'Pause', longBreakMode: 'Longue pause',
        start: 'Démarrer', pause: 'Pause', reset: 'Réinit.',
        workTab: 'Travail', breakTab: 'Pause', longBreakTab: 'L. Pause',
        settingsShow: 'Paramètres', settingsHide: 'Masquer',
        alertWorkEnd: 'Bon travail ! Reposons-nous.', alertBreakEnd: 'La pause est finie ! Au travail.',
        soundLabel: 'Son:', msLabel: 'Millisecondes:', customTimeLabel: 'Temps (h:m):', applyBtn: 'OK',
        lblWork: 'Tra', lblBreak: 'Pau', lblLong: 'L.P'
    },
    de: {
        title: 'Pomodoro', workMode: 'Arbeit', breakMode: 'Pause', longBreakMode: 'Lange Pause',
        start: 'Start', pause: 'Pause', reset: 'Reset',
        workTab: 'Arbeit', breakTab: 'Pause', longBreakTab: 'L. Pause',
        settingsShow: 'Einstellungen', settingsHide: 'Ausblenden',
        alertWorkEnd: 'Gute Arbeit! Zeit für eine Pause.', alertBreakEnd: 'Die Pause ist vorbei! Zurück an die Arbeit.',
        soundLabel: 'Ton:', msLabel: 'Millisekunden:', customTimeLabel: 'Zeit (S:M):', applyBtn: 'OK',
        lblWork: 'Arb', lblBreak: 'Pau', lblLong: 'L.P'
    }
};

const timeDisplay = document.getElementById('time');
const modeDisplay = document.getElementById('mode');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const workTab = document.getElementById('work-tab');
const breakTab = document.getElementById('break-tab');
const longBreakTab = document.getElementById('long-break-tab');

const titleText = document.getElementById('title-text');
const cyclesDisplay = document.getElementById('cycles-display');
const progressFill = document.getElementById('progress-fill');

const settingsToggleBtn = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const realTimeDisplay = document.getElementById('real-time-display');
const langSelect = document.getElementById('lang-select');
const soundToggle = document.getElementById('sound-toggle');
const msToggle = document.getElementById('ms-toggle');

const soundLabel = document.getElementById('sound-label');
const msLabel = document.getElementById('ms-label');
const customTimeLabel = document.getElementById('custom-time-label');

const lblWork = document.getElementById('lbl-work');
const lblBreak = document.getElementById('lbl-break');
const lblLong = document.getElementById('lbl-long');

const customWorkH = document.getElementById('custom-work-h');
const customWorkM = document.getElementById('custom-work-m');
const customBreakH = document.getElementById('custom-break-h');
const customBreakM = document.getElementById('custom-break-m');
const customLongH = document.getElementById('custom-long-h');
const customLongM = document.getElementById('custom-long-m');
const applyTimeBtn = document.getElementById('apply-time-btn');

function playBeep() {
    if (!soundToggle.checked) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + (i * 100), ctx.currentTime + (i * 0.3)); 
            gainNode.gain.setValueAtTime(0.5, ctx.currentTime + (i * 0.3));
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (i * 0.3) + 0.2);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start(ctx.currentTime + (i * 0.3));
            osc.stop(ctx.currentTime + (i * 0.3) + 0.2);
        }
    } catch (e) {}
}

function updateCyclesDisplay() {
    let cyclesText = '';
    for (let i = 1; i <= 4; i++) {
        if (i <= completedPomodoros % 4 || (completedPomodoros > 0 && completedPomodoros % 4 === 0 && i === 4 && currentMode !== 'work')) {
            cyclesText += '🍅 ';
        } else {
            cyclesText += '⚪ ';
        }
    }
    cyclesDisplay.textContent = cyclesText.trim();
}

function formatTabTime(ms) {
    let totalMins = Math.round(ms / 60000);
    let h = Math.floor(totalMins / 60);
    let m = totalMins % 60;
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}`;
    }
    return totalMins;
}

function applyLocalization() {
    const t = translations[currentLang];
    titleText.textContent = t.title;
    
    if (currentMode === 'work') modeDisplay.textContent = t.workMode;
    else if (currentMode === 'break') modeDisplay.textContent = t.breakMode;
    else modeDisplay.textContent = t.longBreakMode;
    
    startBtn.textContent = t.start;
    pauseBtn.textContent = t.pause;
    resetBtn.textContent = t.reset;
    
    workTab.textContent = `${t.workTab} (${formatTabTime(WORK_TIME_MS)})`;
    breakTab.textContent = `${t.breakTab} (${formatTabTime(BREAK_TIME_MS)})`;
    longBreakTab.textContent = `${t.longBreakTab} (${formatTabTime(LONG_BREAK_TIME_MS)})`;
    
    soundLabel.textContent = t.soundLabel;
    msLabel.textContent = t.msLabel;
    customTimeLabel.textContent = t.customTimeLabel;
    applyTimeBtn.textContent = t.applyBtn;
    
    lblWork.textContent = t.lblWork;
    lblBreak.textContent = t.lblBreak;
    lblLong.textContent = t.lblLong;
    
    const isHidden = settingsPanel.classList.contains('hidden');
    settingsToggleBtn.textContent = isHidden ? t.settingsShow : t.settingsHide;
    
    updateDisplay();
    updateRealTimeClock();
}

function changeLanguage(event) {
    currentLang = event.target.value;
    applyLocalization();
}

function updateRealTimeClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', year: 'numeric', month: 'long', 
        day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    
    let locale = 'ru-RU';
    if (currentLang === 'en') locale = 'en-US';
    if (currentLang === 'zh') locale = 'zh-CN';
    if (currentLang === 'uk') locale = 'uk-UA';
    if (currentLang === 'be') locale = 'be-BY';
    if (currentLang === 'kk') locale = 'kk-KZ';
    if (currentLang === 'es') locale = 'es-ES';
    if (currentLang === 'fr') locale = 'fr-FR';
    if (currentLang === 'de') locale = 'de-DE';

    realTimeDisplay.textContent = now.toLocaleDateString(locale, options);
}

function toggleSettingsPanel() {
    const isHidden = settingsPanel.classList.contains('hidden');
    if (isHidden) {
        settingsPanel.classList.remove('hidden');
        settingsToggleBtn.textContent = translations[currentLang].settingsHide;
    } else {
        settingsPanel.classList.add('hidden');
        settingsToggleBtn.textContent = translations[currentLang].settingsShow;
    }
}

function applyCustomTime() {
    let wH = parseInt(customWorkH.value) || 0;
    let wM = parseInt(customWorkM.value) || 0;
    let bH = parseInt(customBreakH.value) || 0;
    let bM = parseInt(customBreakM.value) || 0;
    let lH = parseInt(customLongH.value) || 0;
    let lM = parseInt(customLongM.value) || 0;

    let wMins = wH * 60 + wM;
    let bMins = bH * 60 + bM;
    let lMins = lH * 60 + lM;

    // Защита: от 1 до 1440 минут (24 часа) максимум
    const maxMins = 1440;
    
    wMins = Math.min(Math.max(1, wMins), maxMins);
    bMins = Math.min(Math.max(1, bMins), maxMins);
    lMins = Math.min(Math.max(1, lMins), maxMins);

    // Возвращаем отформатированные значения в инпуты
    customWorkH.value = Math.floor(wMins / 60);
    customWorkM.value = wMins % 60;
    customBreakH.value = Math.floor(bMins / 60);
    customBreakM.value = bMins % 60;
    customLongH.value = Math.floor(lMins / 60);
    customLongM.value = lMins % 60;

    WORK_TIME_MS = wMins * 60 * 1000;
    BREAK_TIME_MS = bMins * 60 * 1000;
    LONG_BREAK_TIME_MS = lMins * 60 * 1000;

    applyLocalization();
    switchMode(currentMode);
}

function updateDisplay() {
    let totalSeconds = Math.floor(timeLeftMs / 1000);
    let msPart = Math.floor((timeLeftMs % 1000) / 10);
    
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let timeStr = "";
    if (hours > 0) {
        timeStr += hours.toString().padStart(2, '0') + ':';
    }
    timeStr += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    if (msToggle.checked) {
        timeStr += '.' + msPart.toString().padStart(2, '0');
    }

    timeDisplay.textContent = timeStr;
    
    let titleStr = "";
    if (hours > 0) titleStr += hours.toString().padStart(2, '0') + ':';
    titleStr += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    document.title = `${titleStr} - ${translations[currentLang].title}`;
    
    const progressPercent = ((totalTimeMs - timeLeftMs) / totalTimeMs) * 100;
    progressFill.style.width = `${progressPercent}%`;
}

function switchMode(mode) {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    currentMode = mode;
    const t = translations[currentLang];
    
    workTab.classList.remove('active');
    breakTab.classList.remove('active');
    longBreakTab.classList.remove('active');
    
    if (mode === 'work') {
        timeLeftMs = WORK_TIME_MS;
        totalTimeMs = WORK_TIME_MS;
        modeDisplay.textContent = t.workMode;
        modeDisplay.style.color = 'var(--danger)';
        progressFill.style.backgroundColor = 'var(--danger)';
        workTab.classList.add('active');
    } else if (mode === 'break') {
        timeLeftMs = BREAK_TIME_MS;
        totalTimeMs = BREAK_TIME_MS;
        modeDisplay.textContent = t.breakMode;
        modeDisplay.style.color = 'var(--success)';
        progressFill.style.backgroundColor = 'var(--success)';
        breakTab.classList.add('active');
    } else if (mode === 'long-break') {
        timeLeftMs = LONG_BREAK_TIME_MS;
        totalTimeMs = LONG_BREAK_TIME_MS;
        modeDisplay.textContent = t.longBreakMode;
        modeDisplay.style.color = 'var(--primary)';
        progressFill.style.backgroundColor = 'var(--primary)';
        longBreakTab.classList.add('active');
    }
    
    updateCyclesDisplay();
    updateDisplay();
}

function startTimer() {
    if (timerId !== null) return;
    
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        new AudioContext().resume();
    } catch(e) {}

    endTime = Date.now() + timeLeftMs;
    
    timerId = setInterval(() => {
        timeLeftMs = endTime - Date.now();
        
        if (timeLeftMs <= 0) {
            timeLeftMs = 0;
            clearInterval(timerId);
            timerId = null;
            updateDisplay();
            playBeep();
            
            setTimeout(() => {
                const t = translations[currentLang];
                if (currentMode === 'work') {
                    completedPomodoros++;
                    updateCyclesDisplay();
                    alert(t.alertWorkEnd);
                    if (completedPomodoros > 0 && completedPomodoros % 4 === 0) {
                        switchMode('long-break');
                    } else {
                        switchMode('break');
                    }
                } else {
                    alert(t.alertBreakEnd);
                    switchMode('work');
                }
            }, 100);
            return;
        }
        updateDisplay();
    }, 30);
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        timeLeftMs = Math.max(0, endTime - Date.now());
        updateDisplay();
    }
}

function resetTimer() {
    switchMode(currentMode);
}

updateRealTimeClock();
setInterval(updateRealTimeClock, 1000);
updateCyclesDisplay();

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workTab.addEventListener('click', () => switchMode('work'));
breakTab.addEventListener('click', () => switchMode('break'));
longBreakTab.addEventListener('click', () => switchMode('long-break'));

settingsToggleBtn.addEventListener('click', toggleSettingsPanel);
langSelect.addEventListener('change', changeLanguage);
applyTimeBtn.addEventListener('click', applyCustomTime);
msToggle.addEventListener('change', updateDisplay);

applyLocalization();