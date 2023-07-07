(async function(e,t){e=await e("../st7789_display/library.js");t(Object.assign({},e,{"buzzer_music.js":`
        // class BuzzerMusic
        (function () {
            const NOTE_FREQ = [
                // C    C#     D    D#     E     F    F#     G    G#     A    A#     B
                [8, 9, 9, 10, 10, 11, 12, 12, 13, 14, 15, 15], // -1
                [16, 17, 18, 19, 21, 22, 23, 24, 26, 28, 29, 31], // 0
                [33, 35, 37, 39, 41, 44, 46, 49, 52, 55, 58, 62], // 1
                [65, 69, 73, 78, 82, 87, 93, 98, 104, 110, 117, 123], // 2
                [131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247], // 3
                [262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494], // 4
                [523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988], // 5
                [1042, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976], // 6
                [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951], // 7
                [4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040, 7459, 7902], // 8
                [8372, 8870, 9397, 9956, 10548, 11175, 11840, 12544, 13290, NaN, NaN, NaN], // 9
            ];
            const NOTES = "cCdDefFgGaAb";

            class BuzzerMusic {
                constructor(pin, rhythm = 4, tempo = 120, toneInversion = -1) {
                    this.pin = pin;
                    this.pos = -1;
                    this.octave = 4;
                    this.duration = 4;
                    this.loop = false;
                    this.playing = false;
                    this.tempo = tempo; // default 120bpm
                    this.rhythm = rhythm; // default is quarter note
                    this.toneOption = toneInversion > -1 ? { inversion: toneInversion } : {};
                }

                get DADADADUM() {
                    return "r4:2,g,g,g,D:8,r:2,f,f,f,d:8".split(',');
                }

                get WAWAWAWAA() {
                    return "e3:3,r:1,D:3,r:1,d:4,r:1,C:8".split(',');
                }

                get ENTERTAINER() {
                    return "d4:1,D,e,c5:2,e4:1,c5:2,e4:1,c5:3,c:1,d,D,e,c,d,e:2,b4:1,d5:2,c:4".split(',');
                }

                get PRELUDE() {
                    return "c4:1,e,g,c5,e,g4,c5,e,c4,e,g,c5,e,g4,c5,e,c4,d,g,d5,f,g4,d5,f,c4,d,g,d5,f,g4,d5,f,b3,d4,g,d5,f,g4,d5,f,b3,d4,g,d5,f,g4,d5,f,c4,e,g,c5,e,g4,c5,e,c4,e,g,c5,e,g4,c5,e".split(',');
                }

                get ODE() {
                    return "e4,e,f,g,g,f,e,d,c,c,d,e,e:6,d:2,d:8,e:4,e,f,g,g,f,e,d,c,c,d,e,d:6,c:2,c:8".split(',');
                }

                get NYAN() {
                    return "F5:2,G,C:1,D:2,b4:1,d5:1,C,b4:2,b,C5,d,d:1,C,b4:1,C5:1,D,F,G,D,F,C,d,b4,C5,b4,D5:2,F,G:1,D,F,C,D,b4,d5,D,d,C,b4,C5,d:2,b4:1,C5,D,F,C,d,C,b4,C5:2,b4,C5,b4,F:1,G,b:2,F:1,G,b,C5,D,b4,e5,D,e,F,b4:2,b,F:1,G,b,F,e5,D,C,b4,F,D,e,F,b:2,F:1,G,b:2,F:1,G,b,b,C5,D,b4,F,G,F,b:2,b:1,A,b,F,G,b,e5,D,e,F,b4:2,C5".split(',');
                }

                get RINGTONE() {
                    return "c4:1,d,e:2,g,d:1,e,f:2,a,e:1,f,g:2,b,c5:4".split(',');
                }

                get FUNK() {
                    return "c2:2,c,D,c:1,f:2,c:1,f:2,F,g,c,c,g,c:1,F:2,c:1,F:2,f,D".split(',');
                }

                get BLUES() {
                    return "c2:2,e,g,a,A,a,g,e,c2:2,e,g,a,A,a,g,e,f,a,c3,d,D,d,c,a2,c2:2,e,g,a,A,a,g,e,g,b,d3,f,f2,a,c3,D,c2:2,e,g,e,g,f,e,d".split(',');
                }

                get BIRTHDAY() {
                    return "c4:3,c:1,d:4,c:4,f,e:8,c:3,c:1,d:4,c:4,g,f:8,c:3,c:1,c5:4,a4,f,e,d,A:3,A:1,a:4,f,g,f:8".split(',');
                }

                get WEDDING() {
                    return "c4:4,f:3,f:1,f:8,c:4,g:3,e:1,f:8,c:4,f:3,a:1,c5:4,a4:3,f:1,f:4,e:3,f:1,g:8".split(',');
                }

                get FUNERAL() {
                    return "c3:4,c:3,c:1,c:4,D:3,d:1,d:3,c:1,c:3,b2:1,c3:4".split(',');
                }

                get PUNCHLINE() {
                    return "c4:3,g3:1,F,g,G:3,g,r,b,c4".split(',');
                }

                get PYTHON() {
                    return "d5:1,b4,r,b,b,A,b,g5,r,d,d,r,b4,c5,r,c,c,r,d,e:5,c:1,a4,r,a,a,G,a,F5,r,e,e,r,c,b4,r,b,b,r,c5,d:5,d:1,b4,r,b,b,A,b,b5,r,g,g,r,d,C,r,a,a,r,a,a:5,g:1,F:2,a:1,a,G,a,e:2,a:1,a,G,a,d,r,C,d,r,C,d:2,r:3".split(',');
                }

                get BADDY() {
                    return "c3:3,r,d:2,D,r,c,r,F:8".split(',');
                }

                get CHASE() {
                    return "a4:1,b,c5,b4,a:2,r,a:1,b,c5,b4,a:2,r,a:2,e5,D,e,f,e,D,e,b4:1,c5,d,c,b4:2,r,b:1,c5,d,c,b4:2,r,b:2,e5,D,e,f,e,D,e".split(',');
                }

                get BA_DING() {
                    return "b5:1,e6:3".split(',');
                }

                get JUMP_UP() {
                    return "c5:1,d,e,f,g".split(',');
                }

                get JUMP_DOWN() {
                    return "g5:1,f,e,d,c".split(',');
                }

                get POWER_UP() {
                    return "g4:1,c5,e,g:2,e:1,g:3".split(',');
                }

                get POWER_DOWN() {
                    return "g5:1,D,c,g4:2,b:1,c5:3".split(',');
                }

                _playNote(octave, i, option) {
                    tone(this.pin, NOTE_FREQ[octave][i], option);
                }

                _play(notes, pos) {
                    if (pos >= notes.length) {
                        if (this.loop) {
                            this.reset();
                        } else {
                            this.stop();
                        }
                        return;
                    }
                    const note = notes[pos];
                    const n = note.indexOf(":");
                    if (n !== -1) {
                        this.duration = parseInt(note[n + 1], 10);
                    }
                    if (note.length > 1 && note[1] !== ":") {
                        this.octave = parseInt(note[1], 10);
                    }
                    if (note[0] === "r") {
                        noTone(this.pin);
                        return;
                    }
                    const i = NOTES.indexOf(note[0]);
                    if (i >= 0) {
                        this._playNote(this.octave + 1, i, this.toneOption);
                    }
                }

                play(notes, loop = false) {
                    this.stop();
                    this.reset();
                    this.loop = loop;
                    this.playing = true;
                    return new Promise((resolve, reject) => {
                        const play = () => {
                            if (!this.playing) {
                                return resolve();
                            }
                            try {
                                this.pos++;
                                this._play(notes, this.pos);
                            } catch (e) {
                                reject(e);
                            }
                            setTimeout(() => {
                                play();
                            }, Math.round(this.duration * (60000 / this.tempo / this.rhythm)));
                        };
                        play();
                    });
                }

                stop() {
                    noTone(this.pin);
                    this.playing = false;
                }

                reset() {
                    this.duration = 4;
                    this.octave = 4;
                    this.pos = -1;
                }
            }
        })()
        `}))})((Scratch,require),exports);