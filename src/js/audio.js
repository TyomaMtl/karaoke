class Karaoke {

    /**
     * @description create a karaoke
     * @param {string} audio (audio name)
     * @param {string} control (div where the audio will be loaded)
     */
    constructor(audioName, playerContainer) {
        this.audioName = audioName
        this.playerContainer = playerContainer
        this.logs = []
    }

    generate() {
        const audioUrl = this.audioUrl()

        if (audioUrl) {
            // audio player
            let audio = document.createElement("audio")
            audio.setAttribute("id", "player")
            audio.setAttribute("controls", "controls")
    
            let source = document.createElement("source")
            source.setAttribute("src", audioUrl)
            source.setAttribute("type", "audio/mpeg")
    
            audio.appendChild(source)
            document.getElementById(this.playerContainer).appendChild(audio)

            // audio actions
            const player = document.getElementById("player")
            
            this.getLyrics().then((lyrics) => {
                console.log(lyrics)
            })

            player.onplay = () => {
                console.log('play')
            }

            player.onpause = () => {
                console.log('pause')
            }
        }

        return false
    }

    audioUrl() {
        const audioUrl = window.location.origin + '/src/audio/sounds/' + this.audioName + '.mp3'

        if (this.fileExist(audioUrl)) {
            return audioUrl
        }
        
        this.logs.push("AudioUrl: Le fichier audio n'existe pas")
        return false
    }

    lyricsUrl() {
        const lyricsUrl = window.location.origin + '/src/audio/lyrics/' + this.audioName + '.txt'

        if (this.fileExist(lyricsUrl)) {
            return lyricsUrl
        }

        this.logs.push("LyricsUrl: Le fichier audio n'existe pas")
        return false
    }

    fileExist(fileUrl) {
        return fetch(fileUrl).then((response) => {
            return response
        }).then((data) => {
            if (data.status == 200) {
                return true
            }

            this.logs.push('File : ' + fileUrl + 'not found')
            return false
        })
    }

    getLyrics() {
        const lyricsUrl = this.lyricsUrl()

        if (lyricsUrl) {

            let lyrics = fetch(lyricsUrl).then((response) => {
                return response.text()
            })

            return lyrics.then((data) => {
                let fileContentAsArray = data.split('\n')
                const lyrics = {}

                fileContentAsArray.forEach((line) => {
                    let hms = line.substring(line.indexOf('[') + 1, line.indexOf(']'))
                    let s = this.hmsToSecondsOnly(hms)
                    let lyric = line.split(']')[1]

                    lyrics[s] = {lyric: lyric, time: hms, second: s}
                })

                return lyrics
            })
        }

        this.logs.push("getLyrics : impossible de parser le fichier, lyricsUrl return false")
        return false
    }

    hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0, m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
    }

    getLogs() {
        return this.logs.forEach(log => {
            console.log(log)
        });
    }
}