import Karaoke from './audio'

let audio = new Karaoke('rage-against-the-machine-killing-in-the-name', 'myAudio')
console.log(audio)
audio.generate()
audio.getLogs()