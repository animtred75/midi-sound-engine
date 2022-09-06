/*
Midi Sound Engine

my custom sound engine

https://scratch.mit.edu/projects/718048299/

2022/9/3 Anim Tred
*/

var MidSE = (function(){

	var audioContext = new AudioContext();

	var BASE64 = "0123456789abcdefghijklmnopqrstuvwxyz!\"£$%^&*()-=[];'#,./_+{}:@~<";

	var DRUMS = [

		{ name: "d-1", volume: 1 },
		{ name: "d-2", volume: 0.7 }, 
		{ name: "d-3", volume: 0.4 },
		{ name: "d-4", volume: 1 },
		{ name: "d-5", volume: 0.7 },
		{ name: "d-6", volume: 1 },
		{ name: "d-7", volume: 0.4 },
		{ name: "d-8", volume: 0.4 },
		{ name: "d-9", volume: 0.7 },
		{ name: "d-10", volume: 0.7 },
		{ name: "d-11", volume: 0.4 },
		{ name: "d-12", volume: 0.4 },
		{ name: "d-13", volume: 0.8 },
		{ name: "d-14", volume: 0.8 },
		{ name: "d-15", volume: 0.7 },
		{ name: "d-16", volume: 0.6 },
		{ name: "d-17", volume: 0.8 },
		{ name: "d-18", volume: 0.8 }
		
	]
	
	var INSTRUMENT = [

		{ name: "n-1", releasePatch: 60, releaseTime: 0.5, volume: 0.6, duration: [
			[24, 8.01],
			[36, 7.97],
			[48, 6.02],
			[60, 6],
			[72, 5.05],
			[84, 2.99],
			[96, 2.95],
			[108, 0.99]
		] },

		{ name: "n-2", releasePatch: 70, releaseTime: 0.5, volume: 0.8, duration: 3.01 },
		{ name: "n-3", releasePatch: 65, releaseTime: 0.5, volume: 0.7, duration: 3 },
		{ name: "n-4", releasePatch: 60, releaseTime: 0.5, volume: 0.6, duration: 3 },
		{ name: "n-5", releasePatch: 60, releaseTime: 0.5, volume: 0.46, duration: 3 },

		{ name: "n-6", releasePatch: 62, releaseTime: 0.25, volume: [[36, 0.67], [48, 0.36]], duration: 3 },

		{ name: "n-7", releasePatch: 65, releaseTime: 0.25, volume: 0.55, duration: 2.14 },

		{ name: "n-8", releasePatch: 57, releaseTime: 0.1, volume: [[36, 0.3], [48, 0.43], [60, 0.35]], duration: [
			[36, 2.27],
			[48, 3.16],
			[60, 2.44]
		] },

		{ name: "n-9", releasePatch: 65, volume: [[36, 0.7], [48, 0.6], [60, 0.5]], duration: [
			[36, 2.97],
			[48, 3.01],
			[60, 3.01]
		] },

		{ name: "n-10", releasePatch: 58, volume: [[48, 0.45], [60, 0.3]], duration: 3.01 },
		{ name: "n-11", releasePatch: 60, volume: 0.4, duration: 3.01 },

		{ name: "n-12", releasePatch: 68, volume: [[60, 0.6], [72, 0.7]], duration: 3.01 },
		{ name: "n-13", releasePatch: 60, volume: 0.9 },
		{ name: "n-14", releasePatch: 57, volume: [[36, 0.6], [48, 0.65], [60, 0.3]], duration: 3.01 },

		{ name: "n-15", releasePatch: 65, releaseTime: 0.25, volume: 0.56, duration: 3.01 },
		{ name: "n-16", releasePatch: 70, releaseTime: 0.5, volume: 0.8, duration: 3.01 },
		{ name: "n-17", releasePatch: 60, releaseTime: 0.25, volume: 0.5, duration: 3.01 },
		{ name: "n-18", releasePatch: 60, releaseTime: 0.5, volume: 0.6, duration: 3.01 },

		{ name: "n-19", releasePatch: 68, volume: 0.8, duration: 1 },

		{ name: "n-20", releasePatch: 63, releaseTime: 0.1, volume: 0.8, duration: 5 },
		{ name: "n-21", releasePatch: 60, releaseTime: 0.25, volume: 0.45, duration: 3.01 }
		

	]

	var Midi_Info = {
		instruments: [
			"1. Friendship is Musical | Season 1 Episode 17-18",
			"2. My Little Pony: Friendship is Magic - Season 4 Episode 3",
			"3. Friendship is Randomly Musical 7 (Halloween Edition)",
			"4. MLP FIM Season 4 Episode 13 Simple Ways 1080p HD",
			"5. Friendship is Musical VGM #1",
			"6. Friendship is Musical Season 2 First Half",
			"7. Friendship is Musical | Season 3",
			"8. Crescend Cinnamon on Twitter: \"https://t.co/zNTcb7oUSz\" / Twitter",
			"9. [1080p] My little Pony Friendship is Magic Season 6 Episode 14 The Cart Before the Ponies",
			"10. My Little Pony Friendship Is Magic Season 4 Episode 21 Testing, 1, 2, 3 HD",
			"11. My Little Pony Friendship is Magic season 2 episode 22 \"Hurricane Fluttershy\"",
			"12. Friendship is Musical | Season 5 (First Half)",
			"13. Peppa Pig Plays the Recorder",
			"14. Friendship is Randomly Musical 5",
			"15. Friendship is Musical | Season 1 Episode 21-22",
			"16. My Little Pony friendship is magic season 2 episode 10 \"Secret of My Excess\"",
			"17. Friendship is Randomly Musical 3 [REUPLOAD]",
			"18. My Little Pony Friendship Is Magic Season 3 Episode 1 and 2 The Crystal Empire HD",
			"19. Friendship is Musical | Season 1 Episode 17-18",
			"20. Friendship is Musical | Season 1 Episode 21-22",
			"21. Friendship is Musical | Season 1 Episode 13-14"
		],
		percussions: [
			"1. Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
			"2. Friendship is Musical | Season 3",
			"3. My little pony-season 8 episode 10:The Break Up Breakdown",
			"4. Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
			"5. My little pony-season 8 episode 10:The Break Up Breakdown",
			"6. My Little Pony Friendship is Magic season 2 episode 19 \"Putting Your Hoof Down\"",
			"7. Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			"8. Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			"9. Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			"10. Friendship is Randomly Musical 1",
			"11. Chicken Little",
			"12. [Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
			"13. Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			"14. Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			"15. My little pony season 8 episode 4(Fake it 'Til you make it)",
			"16. Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			"17. youtube copyright basics",
			"18. Friendship is Randomly Musical 8"
		]
	}

	var mod = function (x, y) {
		var r = x % y;
		if (r / y < 0) {
			r += y;
		}
		return r;
	};

	var listIndex = function (list, index, length) {
		var i = index | 0;
		if (i === index) return i > 0 && i <= length ? i - 1 : -1;
		if (index === 'random' || index === 'any') {
			return Math.random() * length | 0;
		}
		if (index === 'last') {
			return length - 1;
		}
		return i > 0 && i <= length ? i - 1 : -1;
	};

	var insertInList = function (list, index, value) {
		var i = listIndex(list, index, list.length + 1);
		if (i === list.length) {
			list.push(value);
		} else if (i !== -1) {
			list.splice(i, 0, value);
		}
	};

	var listIndexOf = function (list, value) {
	    for (var i = 0; i < list.length; i++) {
	        if (list[i] == value) return i;
	    }
	    return -1;
	};

	const ASSET_URL = 'https://assets.scratch.mit.edu/internalapi/asset/$md5ext/get/';

	var SOUNDBANK_FILES = {

		"d-1": "f8e9a4862f16d6e0bb58e8595cd5a4ad.wav",
		"d-2": "ac6720717ecc6d344345090e3e203bc4.wav",
		"d-3": "b9e66ba61d882cca86735e6beef11381.wav",
		"d-4": "d2047cb8e805c3d127c469de2fc1d329.wav",
		"d-5": "a1499cbaa1ad01779c6c6f058d4d267a.wav",
		"d-6": "fed557065a5c346d02780664fcfc915d.wav",
		"d-7": "2c900dbd0e748ed17adaff318e7b2766.wav",
		"d-8": "be02fc68efacb15fadf4fe2ff2766741.wav",
		"d-9": "f8f8f7f3686b47202fc93489ce66c4ec.wav",
		"d-10": "a51c901191799af0c43dd3a44dcd65c6.wav",
		"d-11": "7c01df7f19b3c695a920da896d0c0f0b.wav",
		"d-12": "0136ce7fbd955f39bb46de40e12be0bc.wav",
		"d-13": "bbf347ab91de055864c6f824fad5de3e.wav",
		"d-14": "418efa1f240e82272fd0fe689932d5f8.wav",
		"d-15": "1b016b3a0da5a82c8a1289def41dbad5.wav",
		"d-16": "089aa4803da3718400c5b66246ee539d.wav",
		"d-17": "e999dc0c9afa811ef2b5f6fa2cc0f5da.mp3",
		"d-18": "aa466ac4f5ae55281105f0c822e26cff.wav",

		"n-1": "39237faddf2e6c7d3d8f6d39ae30d8e6.wav",
		"n-2": "239376de6880e06b58d4afde4922d9d1.wav",
		"n-3": "dc54c4335b9b365320ce2f0b5a3096ff.wav",
		"n-4": "91d0e16f13ab6b3454293e6a4cad91a4.wav",
		"n-5": "ace30ecd40b0ee7e7d77361e53e1f607.wav",
		"n-6": "c87bdd77085d5ef9688a4c88b5317947.wav",
		"n-7": "f527e3719ee8b7b64062e5f9a4b33169.wav",
		"n-8": "054b0e4e9c9a82943e1679ea79abb6d9.wav",
		"n-9": "0cf114d78ea7cabea0713816ed68cf55.wav",
		"n-10": "ff9331e94a2e0db1770fe300152a98ae.wav",
		"n-11": "eb0008b75519dbbb6fa3c53207ae6bc5.wav",
		"n-12": "f1a832a593567364f0595f80d38aa75e.wav",
		"n-13": "0e2654aa4377850f6e0323d55e67c023.wav",
		"n-14": "47b31a30a697235a77f5a79a53c38578.wav",
		"n-15": "d3d0e39b50e6769c6cfc8201ffb63e3f.wav",
		"n-16": "48db10e775081b2d6670a95d82aee2ec.wav",
		"n-17": "0cda7b25644763d13a6e35ae737f49d8.wav",
		"n-18": "0abb838fc7baf866ec637c79c6ae6d21.wav",
		"n-19": "aa0531b278664dfdf9254f2f5676d0e4.wav",
		"n-20": "5e604969b817c91ab9ef5c9e831b6d3f.wav",
		"n-21": "4839b5b36d939907b865b8bfaadb7e01.wav",

	}

	var MIDI_INSTRUMENT = [
		1, 1, 2, 1,
		2, 2, 1, 1,
		19, 19, 17, 16,
		19, 19, 19, 19,
		3, 3, 3, 3,
		3, 3, 3, 3,
		4, 4, 5, 5,
		5, 5, 5, 4,
		6, 6, 7, 6,
		6, 6, 6, 6,
		8, 8, 8, 8,
		8, 7, 8, 8,
		8, 8, 8, 8,
		15, 15, 15, 8,
		9, 9, 9, 9,
		9, 9, 9, 9,
		11, 11, 11, 11,
		14, 10, 14, 10,
		12, 12, 13, 13,
		13, 13, 13, 13,
		20, 3, 20, 20,
		20, 20, 20, 20,
		21, 21, 21, 21,
		21, 21, 21, 21,
		21, 0, 7, 15,
		16, 16, 18, 0,
		4, 7, 19, 21,
		19, 21, 8, 0,
		7, 0, 18, 19,
		0, 18, 21, 7,
		5, 19, 18, 13,
		16, 18, 15, 18
	];
	var DRUMS_MIDI = [
		2, 2, 3, 1,
		8, 1, 14, 6,
		13, 6, 14, 5,
		14, 13, 4, 13,
		5, 4, 7, 7,
		4, 11, 4, 17,
		4, 13, 14, 13,
		13, 14, 13, 14,
		9, 10, 15, 15,
		12, 12, 16, 16,
		9, 10, 10, 18,
		18, 12, 12
	];

	function loadSoundbankFile(src) {
		return fetch(src).then((r) => r.arrayBuffer());
	}

	function settled(promise) {
		return new Promise((resolve, _reject) => {
			promise.then(() => resolve()).catch(() => resolve());
		});
	}

	const ADPCM_STEPS = [

	    7, 8, 9, 10, 11, 12, 13, 14, 16, 17,
	    19, 21, 23, 25, 28, 31, 34, 37, 41, 45,
	    50, 55, 60, 66, 73, 80, 88, 97, 107, 118,
	    130, 143, 157, 173, 190, 209, 230, 253, 279, 307,
	    337, 371, 408, 449, 494, 544, 598, 658, 724, 796,
	    876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066,
	    2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358,
	    5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
	    15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767,
	    
	];

	const ADPCM_INDEX = [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8];

	function decodeADPCMAudio(ab, cb) {

		var dv = new DataView(ab);

		if (dv.getUint32(0) !== 0x52494646 || dv.getUint32(8) !== 0x57415645) {
			return cb(new Error('Unrecognized audio format'));
		}

	    var blocks = {};
	    var i = 12, l = dv.byteLength - 8;

		while (i < l) {
			blocks[String.fromCharCode(dv.getUint8(i), dv.getUint8(i + 1), dv.getUint8(i + 2), dv.getUint8(i + 3))] = i;
			i += 8 + dv.getUint32(i + 4, true);
		}

	    var format = dv.getUint16(20, true);
	    var channels = dv.getUint16(22, true);
	    var sampleRate = dv.getUint32(24, true);
	    var byteRate = dv.getUint32(28, true);
	    var blockAlign = dv.getUint16(32, true);
	    var bitsPerSample = dv.getUint16(34, true);

	    if (format === 17) {

	        var samplesPerBlock = dv.getUint16(38, true);
	        var blockSize = ((samplesPerBlock - 1) / 2) + 4;
	        var frameCount = dv.getUint32(blocks.fact + 8, true);
	        var buffer = audio.context.createBuffer(1, frameCount, sampleRate);
	        var channel = buffer.getChannelData(0);
	        var sample, index = 0;
	        var step, code, delta;
	        var lastByte = -1;
	        var offset = blocks.data + 8;
	        i = offset;
	        var j = 0;

	        while (true) {

	            if ((((i - offset) % blockSize) == 0) && (lastByte < 0)) {

	                if (i >= dv.byteLength) break;
	                sample = dv.getInt16(i, true);
	                i += 2;
	                index = dv.getUint8(i);
	                i += 1;
	                i++;
	                if (index > 88) index = 88;
	                channel[j++] = sample / 32767;

	            } else {

	                if (lastByte < 0) {
	                    if (i >= dv.byteLength) break;
	                    lastByte = dv.getUint8(i);
	                    i += 1;
	                    code = lastByte & 0xf;
	                } else {
	                    code = (lastByte >> 4) & 0xf;
	                    lastByte = -1;
	                }

	                step = ADPCM_STEPS[index];
	                delta = 0;
	                if (code & 4) delta += step;
	                if (code & 2) delta += step >> 1;
	                if (code & 1) delta += step >> 2;
	                delta += step >> 3;
	                index += ADPCM_INDEX[code];
	                if (index > 88) index = 88;
	                if (index < 0) index = 0;
	                sample += (code & 8) ? -delta : delta;
	                if (sample > 32767) sample = 32767;
	                if (sample < -32768) sample = -32768;
	                channel[j++] = sample / 32768;

	            }

	        }

	        return cb(null, buffer);

	    }

	    cb(new Error('Unrecognized WAV format ' + format));

	}

	function decodeAudio(ab) {
		return new Promise((resolve, reject) => {
		    decodeADPCMAudio(ab, function (err1, buffer) {
		        if (buffer) {
		            resolve(buffer);
		            return;
		        }
		        audioContext.decodeAudioData(ab, function (buffer) {
		            resolve(buffer);
		        }, function (err2) {
		            reject(`Could not decode audio: ${err1} | ${err2}`);
		        });
		    });
		});
	}

	const soundbank = {};

	function loadSoundbankBuffer(name) {
		return loadSoundbankFile(ASSET_URL.replace('$md5ext', SOUNDBANK_FILES[name])).then((buffer) => decodeAudio(buffer)).then((sound) => soundbank[name] = sound);
	}

	var Note = function(e) {

		this.duraction = e.duraction;
		this.times = e.times;
		this.pitch = e.pitch;
		this.instrument = e.instrument;
		this.volume = e.volume;
		this.type = "note";
		this.channel = 0;

	}

	var Drum = function(e) {

		this.duraction = e.duraction;
		this.times = e.times;
		this.drum = e.drum;
		this.volume = e.volume;
		this.type = "drum";
		this.channel = 0;

	}

	var MidiLoader = function(data) {

		this.data = new Uint8Array(data);
		this.index = 0;
		this.tracks = [];
		this.tempo = 0;
		this.chuckSize = 0;

		this.finalList = {
			duration: [],
			instrument: [],
			pitch: [],
			start: [],
			channel: [],
			volume: []
		}

		this.newList = {
			channel: [],
			instrument: [],
			noteOn: [],
			pitch: [],
			tempoSetting: [],
			tempoTick: [],
			tickOff: [],
			tickOn: [],
			trackNumber: [],
			volume: [],
		}

	}

	MidiLoader.prototype.load = function() {

		// Default tempo is equivalent to 120 bpm (and is the length of one quarter beat)

		this.ReadHeader();
		this.splitTracks();
		this.processAllTracks();
		this.MunchData();
		
	}

	MidiLoader.prototype.CompressAndStore = function() {
		var fgf = []
		var index = 0;
		for (var i = 0; i < this.finalList.start.length; i++) {
			if (this.finalList.instrument[index] < 128) {
				fgf.push([this.finalList.instrument[index] + 1, this.finalList.pitch[index], this.finalList.duration[index], this.finalList.start[index], this.finalList.volume[index]]);
			} else {
				fgf.push([0, this.finalList.instrument[index] - 127, this.finalList.duration[index], this.finalList.start[index], this.finalList.volume[index]]);
			}
			index += 1;
		}
		return {
			"name": "Midi File",
			"notes": fgf
		}
	}

	MidiLoader.prototype.MunchData = function() {

		var index = 0;
		var gh = this.finalList.start.length;

		for (var i = 0; i < gh; i++) {
			this.finalList.start[index] = Math.round((this.finalList.start[index]) / 1000) / 1000;
			this.finalList.duration[index] = Math.round(this.finalList.duration[index] / 1000) / 1000;
			index += 1;
		}

	}

	MidiLoader.prototype.splitTracks = function() {

		// Store byte data for all tracks separately

		this.tracks = [];
		var trackNumber = 1;

		while (!(trackNumber > this.numberTracks)) {

			var fdg = this.ReadUnsignedLong();

			if (!(fdg == 1297379947)) {
				throw new Error("MTrk not found for track number " + trackNumber + " - invalid MIDI file");
			}

			var chuckSize = this.ReadUnsignedLong();
			var trackData = [];

			for (var i = 0; i < chuckSize; i++) {
				trackData.push(this.data[this.index]);
				this.index += 1;
			}

			this.tracks.push(trackData);
			trackNumber += 1;

		}

		this.data.length = 0;

	}

	MidiLoader.prototype.processAllTracks = function() {

		for (var i = 0; i < this.tracks.length; i++) {

			this.cleanProcessAllTracksDataIncludingTempoData(((!(this.formatType == 1)) || i == 0));
			this.trackNumber = (i + 1);
			this.ProcessTrackNumber(i);
			this.convertToNoteBlocks();

		}

		this.cleanProcessAllTracksDataIncludingTempoData(true);

	}

	MidiLoader.prototype.ProcessTrackNumber = function(trackNumber) {

		//Set a default tempo of 120 bpm
		this.tempo = (500000 / this.timeDivision);
		this.data = this.tracks[trackNumber];
		this.chuckSize = this.data.length;
		this.pulseCounter = 0;
		this.eventType = '';
		this.index = 0;

		while (!(this.index > (this.chuckSize - 1))) {

			var hgg = this.ReadVariableLength();
			this.pulseCounter += hgg;
			this.ReadMidiEvent();

			if (this.eventType == "midi") {
				this.ProcessMidiControlEvent();
			} else {

				if (this.eventType == "meta") {
					this.ProcessMetaEvent();
				} else {

					if (this.eventType == "system") {
						this.ProcessSystemExclusiveEvent();
					} else {
						// This is probably a non-standard meta event or similar
					}

				}
			}
		}
		if (!(this.index == this.chuckSize)) {
			throw new Error("Track number " + this.trackNumber + " has overrun - invalid MIDI file");
		}
	}

	MidiLoader.prototype.ProcessMidiControlEvent = function() {

		if (this.eventTypeValue == 8) {
			this.NoteOff();
		}

		if (this.eventTypeValue == 9) {

			if (this.parameter2 > 0) {
				this.NoteOn();
			} else {
				this.NoteOff();
			}

		}

		if (this.eventTypeValue == 12) {
			this.SetInstrument();
		}

		// Ignored MIDI Channel Voice Messages are -
		// 10: Poly key pressure
		// 11: Controller change
		// 13: Channel pressure / Pitch bend

	}

	MidiLoader.prototype.NoteOff = function() {
		var temp = this.newList.pitch.length - 1;
		var f = this.newList.pitch.length;
		for (var i = 0; i < f; i++) {
			if (((this.trackNumber == (this.newList.trackNumber[temp] ?? 0) && this.parameter1 == (this.newList.pitch[temp] ?? 0)) && (this.midiChannel == (this.newList.channel[temp] ?? 0) && this.newList.noteOn[temp] == true))) {
				this.newList.tickOff[temp] = this.pulseCounter;
				this.newList.noteOn[temp] = false;
				return;
			}
			temp -= 1;
		}
	}

	MidiLoader.prototype.NoteOn = function() {
		this.newList.tickOn.push(this.pulseCounter);
		this.newList.tickOff.push(0);
		this.newList.trackNumber.push(this.trackNumber);
		this.newList.channel.push(this.midiChannel);
		if (this.midiChannel == 9) {
			if (this.parameter1 < 35 || this.parameter1 > 81) {
				// We're receiving an invalid percussion instrument for some reason. Not much we can do really. Hardly worth a warning...
			} else {
				if (typeof DRUMS_MIDI[this.parameter1 - 35] == "undefined") {
					console.warn("Assign percussion instrument number " + this.parameter1 + " (" + DRUMS_MIDI[this.parameter1 - 35] + ")");
				}
			}
			this.newList.instrument.push((128 + (this.parameter1 - 35)));
		} else {
			this.newList.instrument.push(this.instrumentName);
		}
		this.newList.pitch.push(this.parameter1);
		this.newList.volume.push(Math.round(((this.parameter2 * 100) / 127)));
		this.newList.noteOn.push(true);
	}

	MidiLoader.prototype.SetInstrument = function() {
		if (typeof MIDI_INSTRUMENT[this.parameter1] == "undefined") {
			console.warn("Assign musical instrument for group " + (Math.floor(this.parameter1 / 8) + 1) + " instrument " + this.parameter1 + " (" + MIDI_INSTRUMENT[this.parameter1] + ")")
		}
		this.instrumentName = this.parameter1;
	}

	MidiLoader.prototype.ProcessMetaEvent = function() {

		if (this.command == 47) {
			// This is the end-of-track meta command so force the pointer to the end of the chunk to exit gracefully
			this.index = this.chuckSize;
		}

		if (this.command == 81) {
			this.SetTempo();
		}

		// Most meta events are ignored. These are -
		// 0: Sequence number
		// 1: Text event
		// 2: Copyright notice
		// 3: Sequence/Track name
		// 4: Instrument name
		// 5: Lyric
		// 6: Marker
		// 7: Cue point
		// 32: MIDI Channel prefix
		// 84: SMTPE offset
		// 88: Time signature
		// 89: Key signature
		// 127: Sequencer-specific meta-event

	}

	MidiLoader.prototype.SetTempo = function() {
		this.newList.tempoTick.push(this.pulseCounter);
		this.newList.tempoSetting.push((this.parameter1 / this.timeDivision));
	}

	MidiLoader.prototype.ProcessSystemExclusiveEvent = function() {
		// All system exclusive events are ignored. These are -
		// 240: F0 Sysex event
		// 247: F7 Sysex event
	}

	MidiLoader.prototype.convertToNoteBlocks = function() {

		// This block simply scans through all of the note and tempo information that we've recorded
		// calculating the actual note lengths (including if the tempo changes mid-note)
		// and inserts the start-tick, pitch, duration, volume, instrument, channel and track
		// for each note at the correct position in the lists
		
		var totalPulses = this.pulseCounter;
		this.pulseCounter = 0;
		var index = 0;
		this.tempoIndex = 0;
		this.targetIndex = 1;
		this.currentPulseInSeconds = 0;
		
		while (!(this.pulseCounter > totalPulses)) {
			// Skip to next tick of interest
			var temp = totalPulses;
			if (!(this.tempoIndex > (this.newList.tempoTick.length - 1))) {
				temp = (this.newList.tempoTick[this.tempoIndex] ?? 0);
			}
			if (!(index > (this.newList.tickOn.length - 1))) {
				if ((this.newList.tickOn[index] ?? 0) < temp) {
					temp = (this.newList.tickOn[index] ?? 0);
				}
			}
			if (temp == totalPulses) {
				return;
			}
			this.currentPulseInSeconds += (this.tempo * (temp - this.pulseCounter));
			this.pulseCounter = temp;
			while (!((!(this.newList.tempoTick[this.tempoIndex] == this.pulseCounter)) || this.tempoIndex > this.newList.tempoSetting.length - 1)) {
				this.tempo = (this.newList.tempoSetting[this.tempoIndex] ?? 0);
				this.tempoIndex += 1;
			}
			while (!((!(this.newList.tickOn[index] == this.pulseCounter)) || index > this.newList.tickOff.length - 1)) {
				this.insertNoteCurrentlyAtIndex(index);
				index += 1;
			}
		}
	}

	MidiLoader.prototype.insertNoteCurrentlyAtIndex = function(index) {

		while (!((this.targetIndex > this.finalList.pitch.length) || (this.currentPulseInSeconds < this.finalList.start[this.targetIndex - 1]))) {
			this.targetIndex += 1;
		}

		var lengthInMilliseconds = 0;
		var pulseForCalculating = this.pulseCounter;
		var pulsesRemainingForCalculating = (this.newList.tickOff[index] - this.newList.tickOn[index]);
		var tempoForCalculating = this.tempo;
		var tempoIndexForCalculating = this.tempoIndex;

		while (!(pulsesRemainingForCalculating == 0)) {

			if ((tempoIndexForCalculating > (this.newList.tempoTick.length - 1) || !((pulseForCalculating + pulsesRemainingForCalculating) > this.newList.tempoTick[tempoIndexForCalculating]))) {
				
				lengthInMilliseconds += (pulsesRemainingForCalculating * tempoForCalculating);
				pulsesRemainingForCalculating = 0;

			} else {

				lengthInMilliseconds += ((this.newList.tempoTick[tempoIndexForCalculating] - pulseForCalculating) * (tempoForCalculating / this.timeDivision));
				pulseForCalculating += (this.newList.tempoTick[tempoIndexForCalculating] - pulseForCalculating);
				pulsesRemainingForCalculating += (pulseForCalculating - this.newList.tempoTick[tempoIndexForCalculating]);
				tempoForCalculating = this.newList.tempoSetting[tempoIndexForCalculating];
				tempoIndexForCalculating += 1;

			}

		}

		insertInList(this.finalList.duration, this.targetIndex, lengthInMilliseconds);
		insertInList(this.finalList.instrument, this.targetIndex, this.newList.instrument[index]);
		insertInList(this.finalList.pitch, this.targetIndex, this.newList.pitch[index]);
		insertInList(this.finalList.start, this.targetIndex, this.currentPulseInSeconds);
		insertInList(this.finalList.channel, this.targetIndex, ((this.newList.trackNumber[index] * 16) + this.newList.channel[index]));
		insertInList(this.finalList.volume, this.targetIndex, this.newList.volume[index]);

	}

	MidiLoader.prototype.cleanProcessAllTracksDataIncludingTempoData = function(includingTempo) {

		this.newList.channel.length = 0;
		this.newList.instrument.length = 0;
		this.newList.noteOn.length = 0;
		this.newList.pitch.length = 0;
		this.newList.tickOff.length = 0;
		this.newList.tickOn.length = 0;
		this.newList.trackNumber.length = 0;
		this.newList.volume.length = 0;

		if (includingTempo) {
			this.newList.tempoSetting.length = 0;
			this.newList.tempoTick.length = 0;
		}

	}

	MidiLoader.prototype.ReadMidiEvent = function() {
		var fd = this.ReadUnsignedByte();

		if (fd == 255) {

			this.eventType = 'meta';
			this.command = this.ReadUnsignedByte();
			this.ParseMetaData();

		} else {

			if (fd > 239) {

				this.eventType = 'system';
				this.ParseSystemEvent();

			} else {

				if (fd > 127) {

					this.eventType = 'midi';
					this.midiChannel = mod(fd, 16);
					this.eventTypeValue = ((fd - this.midiChannel) / 16)
					this.ParseMidi();

				} else {

					// TODO: Ought to check the previous command was a midi one in which case this is referred to as "running status"
					this.index -= 1;
					this.ParseMidi();

				}

			}
		}
	}
	MidiLoader.prototype.ParseMidi = function() {

		this.parameter1 = this.ReadUnsignedByte();

		if (this.eventTypeValue == 12 || this.eventTypeValue == 13) {

			// "Program change" and "Channel pressure" don't take an extra parameter
			return;

		}

		this.parameter2 = this.ReadUnsignedByte();

	}

	MidiLoader.prototype.ParseSystemEvent = function() {

		var rf = this.ReadVariableLength();
		this.index += rf;
	}

	MidiLoader.prototype.ParseMetaData = function() {

		if (this.command == 47) {
			this.ReadVariableLength();
			return;
		}
		if (this.command == 81) {
			var d = this.ReadVariableLength();
			var g = this.ReadBytes(d);
			this.parameter1 = g;
			return;
		}
		var d = this.ReadVariableLength();
		var g = this.ReadBytes(d);
		this.eventType = undefined;

	}

	MidiLoader.prototype.ReadHeader = function() {

		// After reading through the definitions of the three different MIDI formats a number of times I have come up with the following
		// summations for the types -
		// Type 0: Everything happens on Track 1 - any others tracks in a type 0 MIDI should incur an error
		// Type 1: Track 1 contains all timing related events. All other tracks are independent of each other except that they share the timing from track 1
		// Type 2: All tracks are completely independent
		// From these, my idea for unifying the way they can all be handled in the code is as follows -
		// Type 2 is essentially multiple occurences of type 0. I.e. All tracks contain timing and everything else for that specific track
		// For type 1, if I inject the timing from track 1 into all the other tracks and then remove track 1 then it essentially becomes a type 2
		// For type 2, if I inject all the tracks into track 1 then it becomes a type 0
		// This means that I can ultimately handle the parsing by treating every post-edited file as a type 0 file

		if (!(this.ReadUnsignedLong() == 1297377380)) {
			throw new Error("Invalid MIDI file");
		}

		if (!(this.ReadUnsignedLong() == 6)) {
			throw new Error("Invalid MIDI file");
		}

		this.formatType = this.ReadUnsignedShort();
		this.numberTracks = this.ReadUnsignedShort();
		this.timeDivision = this.ReadUnsignedShort();
		this.pulsesPerQuarterBeat = this.timeDivision;

		if (this.timeDivision > 32767) {
			throw new Error("Timecode timing intervals not currently supported");
		}

	}

	MidiLoader.prototype.ReadUnsignedLong = function() {
		return this.ReadBytes(4);
	}

	MidiLoader.prototype.ReadUnsignedByte = function() {
		return this.ReadBytes(1);
	}

	MidiLoader.prototype.ReadUnsignedShort = function() {
		return this.ReadBytes(2);
	}

	MidiLoader.prototype.ReadVariableLength = function() {
		var value = 0;
		while (true) {
			var temp = Math.round(this.data[this.index]);
			this.index += 1;
			value = ((value * 128) + mod(temp, 128));
			if (temp < 128) {
				return value;
			}
		}
	}

	MidiLoader.prototype.ReadBytes = function(byteCount) {
		var d = 0;
		for (var i = 0; i < byteCount; i++) {
			d = ((d * 256) + Math.round(this.data[this.index]));
			this.index += 1;
		}
		return d;
	}

	var MidiSoundEngine = function() {

		this.node = audioContext.createGain();
		this.node.gain.value = 1;
	    this.node.connect(audioContext.destination);
		this.decodeNoteQueue = [];
		this.noteTracker = 0;
		this.startTime = 0;
		this.songs = null;
		this.step = this.step.bind(this);
		this.duration = 0;
		this.muteMusicr = false;

		this.frameStart = 0;
		this.DateTime = 0;

		this.speed = 1;

		this.isPaused = true;
		this.MidiTimer = 0;

		this.frameStart = Date.now();
		this.interval = setInterval(this.step, 1000 / 60);

	}

	MidiSoundEngine.prototype.loadSoundbank = function() {
		const promises = [];
	    for (const name in SOUNDBANK_FILES) {
	        if (!soundbank[name]) {
	            const promise = settled(loadSoundbankBuffer(name));
	            promises.push(promise);
	        }
	    }
	    return Promise.all(promises);
	}

	MidiSoundEngine.prototype.play = function() {
		this.isPaused = false;
		if (this.MidiTimer >= this.duration) {
			this.MidiTimer = 0;
			this.noteTracker = 0;
		}

	}

	MidiSoundEngine.prototype.stop = function() {
		this.isPaused = true;
		this.MidiTimer = 0;
		this.noteTracker = 0;
	}

	MidiSoundEngine.prototype.pause = function() {
		this.isPaused = true;
	}

	MidiSoundEngine.prototype.getTime = function() {
		return this.MidiTimer;
	}

	MidiSoundEngine.prototype.vidAudio = function(samples, n) {

		if (Array.isArray(samples)) {

			for (let i = samples.length - 1; i >= 0; i--) {
				if (n >= samples[i][0]) {
					return samples[i][1];
				}
			}

			return samples[0][1];

		}
		return samples;

	}

	MidiSoundEngine.prototype.playNotes = function(n) {

		if (n.isOn == false) return;

		if (n.type == 'note') {

			var span = INSTRUMENT[n.instrument - 1];
			const buffer = soundbank[span.name];
			const source = audioContext.createBufferSource();
			const note = audioContext.createGain();
			source.buffer = buffer;
			source.connect(note);
			source.playbackRate.value = Math.pow(2, ((n.pitch - span.releasePatch) / 12));
			const gain = note.gain;
			gain.setValueAtTime(n.volume * this.vidAudio(span.volume, n.pitch), audioContext.currentTime);
			const releaseGain = audioContext.createGain();
			note.connect(releaseGain);
			releaseGain.connect(this.node);
			let releaseDuration = span.releaseTime;
			if (typeof releaseDuration === 'undefined') {
			    releaseDuration = 0.01;
			}
			const releaseStart = audioContext.currentTime + (n.dur / this.speed);
			const releaseEnd = releaseStart + releaseDuration;
			releaseGain.gain.setValueAtTime(1, releaseStart);
			releaseGain.gain.linearRampToValueAtTime(0.0001, releaseEnd);
			var _this = this;
			source.start();
			source.stop(releaseEnd);

		} else if (n.type == 'drum') {

			var span = DRUMS[n.drum - 1];
			const buffer = soundbank[span.name];
			const source = audioContext.createBufferSource();
			const note = audioContext.createGain();
			source.buffer = buffer;
			source.connect(note);
			note.connect(this.node);
			const gain = note.gain;
			gain.value = n.volume * span.volume;
			var _this = this;
			source.start();

		}

	}
	MidiSoundEngine.prototype.step = function() {

		this.DateTime = (Date.now() - this.frameStart) / 1000;

		if (this.MidiTimer > this.duration && !this.isPaused) {
			this.MidiTimer = this.duration;
			this.isPaused = true;
		}

		if (!this.isPaused) {

			this.MidiTimer += this.DateTime * this.speed;

		}

		function GS(f, s) {

			for (var i6 = 0; i6 < f.length; i6++) {
				if (f[i6].type == 'note' && s.type == 'note') {
			
					if ((f[i6].instrument == s.instrument && f[i6].pitch == s.pitch)) {
						return false;
					}
					
				} else if (f[i6].type == 'drum' && s.type == 'drum') {

					if (f[i6].drum == s.drum) {
						return false;
					}

				}
			}

			return true;

		}

		var playNote = [];
		var fg = 0;
		if (this.decodeNoteQueue[this.noteTracker] && (this.getTime() > this.decodeNoteQueue[this.noteTracker].times)) {
			
			while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && (this.getTime() < this.decodeNoteQueue[this.noteTracker].times)))) {
				
				if (!this.muteMusicr && this.decodeNoteQueue[this.noteTracker]) {
					var n = this.decodeNoteQueue[this.noteTracker];
					fg += 1;
					if (n.type == 'note') {
						if (n.duraction > 0) {
							playNote.push({
								type: 'note',
								instrument: mod((Math.round(n.instrument) - 1), 21) + 1,
								pitch: n.pitch,
								isOn: true,
								volume: n.volume,
								dur: n.duraction,
							});
						}
						
					} else if (n.type == 'drum') {
						playNote.push({
							type: 'drum',
							drum: mod(Math.round(n.drum - 1), 18) + 1,
							volume: n.volume,
							isOn: true,
							dur: n.duraction,
						});
					}
				}

				this.noteTracker += 1;

			}

		}

		this.noteTracker -= 1;

		if (this.decodeNoteQueue[this.noteTracker] && (this.getTime() < this.decodeNoteQueue[this.noteTracker].times)) {
			
			while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && (this.getTime() > this.decodeNoteQueue[this.noteTracker].times)))) {

				this.noteTracker -= 1;

			}

		}

		this.noteTracker += 1;

		var playNoteFix = [];

		for (var i = 0; i < playNote.length; i++) {
			if (GS(playNoteFix, playNote[i])) {
				playNoteFix.push(playNote[i]);
			}
		}

		for (var i = 0; i < playNoteFix.length; i++) {
			this.playNotes(playNoteFix[i]);
		}

		if (this.muteMusicr) {
			this.muteMusicr = false;
		}

		this.frameStart = Date.now();

	}

	MidiSoundEngine.prototype.getMidi = function(txt) {
		try {
			return JSON.parse(txt);
		} catch (e) {

			var f = txt.split('\n');
			var f1 = [];
			for (var i = 0; i < f.length; i += 5) {
				f1.push([Number(f[i]) || 0, Number(f[i + 1]) || 0, Number(f[i + 2]) || 0, Number(f[i + 3]) || 0, Number(f[i + 4])]);
			}
			var d = {
				name: "MIDI TEXT",
				notes: f1
			}
			return d;	

		}
	}

	MidiSoundEngine.prototype.loadMid = function(data) {

		MSE.stop();

		var loader = new MidiLoader(data);
		loader.load();
		this.loadMidi(JSON.stringify(loader.CompressAndStore()));

	}

	MidiSoundEngine.prototype.loadMidi = function(data) {

		MSE.stop();
		var data_1 = this.getMidi(data);
		this.decodeNoteQueue = [];
		this.songs = data_1.name;
		var notes = data_1.notes;
		var fdg = notes[0][3] - 1;
		var gfd = 0;

		for (var i = 0; i < notes.length; i++) {
			if (notes[i][4] > gfd) {
				gfd = notes[i][4];
			}
		}

		var fdgdfgdfggdg = 0;
		gfd = Math.min(gfd, 100);

		for (var i = 0; i < notes.length; i++) {

			if (fdgdfgdfggdg < notes[i][3] - fdg + notes[i][2]) {
				fdgdfgdfggdg = notes[i][3] - fdg + notes[i][2];
			}

			if (notes[i][0] > 0) {
				if (typeof MIDI_INSTRUMENT[Math.round(notes[i][0]) - 1] !== "undefined") {
					this.decodeNoteQueue.push(new Note({
						duraction: notes[i][2],
						times: notes[i][3] - fdg,
						pitch: notes[i][1],
						instrument: MIDI_INSTRUMENT[Math.round(notes[i][0]) - 1] || 0,
						volume: (notes[i][4] / gfd)
					}));
				}
			} else {
				if (typeof DRUMS_MIDI[Math.round(notes[i][1]) - 1] !== "undefined") {
					this.decodeNoteQueue.push(new Drum({
						duraction: notes[i][2],
						times: notes[i][3] - fdg,
						drum: DRUMS_MIDI[Math.round(notes[i][1]) - 1] || 0,
						volume: (notes[i][4] / gfd)
					}));
				}
			}

		}

		this.duration = fdgdfgdfggdg + 1;

	}

	return {

		MidiLoader: MidiLoader,
		MidiSoundEngine: MidiSoundEngine

	}

}());
