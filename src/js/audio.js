class Karaoke {

    /**
     * @description create a karaoke
     * @param {string} audio (audio name)
     * @param {string} control (div where the audio will be loaded)
     */
    constructor(audioName, player) {
        this.audioName = audioName
        this.player = player
        this.logs = []
    }

    generate() {
        const audioUrl = this.audioUrl()

        if (audioUrl) {
            let audio = document.createElement("audio")
            audio.setAttribute("id", this.player)
            audio.setAttribute("controls", "controls")
    
            let source = document.createElement("source")
            source.setAttribute("src", audioUrl)
            source.setAttribute("type", "audio/mpeg")
    
            audio.appendChild(source)
    
            document.getElementById(this.player).appendChild(audio)
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

    getLogs() {
        return this.logs.forEach(log => {
            console.log(log)
        });
    }

    // var timeToText  = {};


    // function formatTime(time) 
    // {
    //     minutes = "0" + Math.floor(time / 60);

    //     seconds = Math.floor(time % 60);

    //     if(seconds < 10){ seconds = "0" + seconds; }

    //     milliseconds = Math.floor(time * 1000);
    //     milliseconds = milliseconds.toString().substr(0, 2);

    //     num = seconds + "." + milliseconds;
        
    //     return minutes + ":" + num;
    // }


    // function getTimeLine(text)
    // {
    //     var start_pos = text.indexOf('[') + 1;
    //     var end_pos = text.indexOf(']', start_pos);
    //     var text_to_get = text.substring(start_pos, end_pos)

    //     return text_to_get;
    // }


    // function getTextLine(str) 
    // {
    //     return str.split(']')[1];
    // }


    // function getLyrics(txt, currentTime)
    // {
    //     var loadLyrics = new XMLHttpRequest();

    //     loadLyrics.onreadystatechange = function() 
    //     {
    //         if(this.readyState == 4 && this.status == 200) 
    //         {
    //             var lines = this.responseText.split("\n");

    //             for(var i = 0; i < lines.length; i++)
    //             {
    //                 var time = getTimeLine(lines[i]);
    //                 var text = getTextLine(lines[i]);

    //                 timeToText[time] = text;
    //             }

    //             setInterval(function(){
    //                 var currentTime = formatTime(myAudio.currentTime);
    //                 return console.log(currentTime);
    //                 //console.log(timeToText[currentTime]);
    //             }, 100);
                
    //         }
    //     };
    //     loadLyrics.open("GET", txt, true);
    //     loadLyrics.send();
    // }




    // // PLAY / PAUSE AUDIO (MAIN SCRIPT)
    // myAudio.addEventListener('play', function(){

    //     document.body.style.backgroundColor = "#ff4d4d"; // change body color

    //     getLyrics(myLyrics);  

    // });

    // myAudio.addEventListener('pause', function(){

    //     document.body.style.backgroundColor = "#111"; // reset body color

    // });

}