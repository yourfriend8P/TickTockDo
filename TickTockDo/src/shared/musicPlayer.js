import lofi from "../assets/Lofi.mp3";

const audio = new Audio(lofi);
audio.loop = true;
audio.volume = 0.3;

export default audio;