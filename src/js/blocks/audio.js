import "../../scss/blocks/audio.scss";

class AudioPlayer {

    static players = [];

    static speed = [
        {'text': '0.5x', value: 0.5, selected: false},
        {'text': '1.0x', value: 1.0, selected: true},
        {'text': '1.5x', value: 1.5, selected: false},
        {'text': '2.0x', value: 2.0, selected: false},
    ];

    static init(selector) {

        const audio = document.querySelectorAll(selector);

        audio.forEach((el) => {
            const id = `audio-player-${AudioPlayer.players.length + 1}`;

            el.outerHTML = `<div class="audio-player-wrapper">` +
                `<div class="audio-player" id="${id}">` +
                `${el.outerHTML}${AudioPlayer.getControls()}` +
                `</div>` +
                `</div>`;

            el = document.getElementById(id);

            const audioEl = el.querySelector('audio');
            const audio = new Audio();
            audio.src = audioEl.src;
            audio.preload = 'metadata';
            audioEl.remove();

            AudioPlayer.players.push(el);
            AudioPlayer.attachEvents(el, audio);
        });

    }

    static getControls() {
        return `<div class="audio-player__controls">` +
            '<button class="audio-player__play-btn"></button>' +
            `<div class="audio-player__speed">` +
            `<span class="audio-player__speed-text">1x</span>` +
            `<div class="audio-player__speed-list">` +
            AudioPlayer.speed.map((data) => `<div class="audio-player__speed-item${data.selected ? ' selected' : ''}" ` +
                `data-value="${data.value}">${data.text}</div>`).join('') +
            `</div>` +
            `</div>` +
            `<div class="audio-player__progress">` +
            `<div class="audio-player__progress-slider">` +
            `</div>` +
            `</div>` +
            `<div class="audio-player__duration"></div>` +
            `</div>`;
    }

    static attachEvents(el, audio) {
        el.querySelector('.audio-player__play-btn').addEventListener('click', (e) => {
            audio[`${audio.paused ? 'play' : 'pause'}`]();
        });

        const speedEl = el.querySelector('.audio-player__speed');

        speedEl.addEventListener('click', () => {
            const speedList = speedEl.querySelector('.audio-player__speed-list');

            speedList.classList[`${speedList.classList.contains('visible') ? 'remove' : 'add'}`]('visible');
        });

        speedEl.addEventListener('click', (e) => {
            const speedItem = e.target.closest('.audio-player__speed-item');

            if (!speedItem) {
                return;
            }

            speedEl.querySelector('.audio-player__speed-text').innerText = speedItem.innerText;

            speedEl.querySelector('.audio-player__speed-item.selected').classList.remove('selected');
            speedItem.classList.add('selected');
            audio.playbackRate = Number(speedItem.dataset.value);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.audio-player__speed')) {
                document.querySelectorAll('.audio-player__speed-list').forEach((list) => {
                    list.classList.remove('visible');
                });
            }
        });

        AudioPlayer.attachAudioEvents(el, audio);
        AudioPlayer.attachProgressEvents(el, audio);
    }

    static attachAudioEvents(el, audio) {
        audio.addEventListener('loadedmetadata', () => {
            AudioPlayer.setCurrentDuration(el, audio);
        });

        audio.addEventListener('timeupdate', () => {
            const progressSlider = el.querySelector('.audio-player__progress-slider');

            progressSlider.style.left = `${(audio.currentTime / audio.duration) * 100}%`;

            AudioPlayer.setCurrentDuration(el, audio);
        });

        audio.addEventListener('play', () => {
            el.querySelector('.audio-player__play-btn').classList.add('audio-player__play-btn--playing');
        });

        audio.addEventListener('pause', () => {
            el.querySelector('.audio-player__play-btn').classList.remove('audio-player__play-btn--playing');
        })
    }

    static attachProgressEvents(el, audio) {
        const progress = el.querySelector('.audio-player__progress');

        progress.addEventListener('click', (e) => {

            if (audio.paused) {
                return;
            }

            const progressWidth = progress.offsetWidth;
            const ratio = e.offsetX / progressWidth;

            audio.currentTime = Math.round(audio.duration * ratio);

        });
    }

    static setCurrentDuration(el, audio) {
        const audioCurrentDuration = el.querySelector('.audio-player__duration');

        audioCurrentDuration.innerText = `${AudioPlayer.convertTimeToString(audio.currentTime)} / ` +
            `${AudioPlayer.convertTimeToString(audio.duration)}`;
    }

    static convertTimeToString(duration) {
        const seconds = Math.floor(duration) % 60;
        const minutes = Math.floor(duration / 60);
        const hours = Math.floor(duration / 1440);

        return `${hours ? `${hours < 10 ? '0' : ''}${hours}` : ''}` +
            `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    AudioPlayer.init('audio');

});


