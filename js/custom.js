(function () {

	'use strict'


	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});

	var preloader = function() {

		var loader = document.querySelector('.loader');
		var overlay = document.getElementById('overlayer');

		function fadeOut(el) {
			el.style.opacity = 1;
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};

		setTimeout(function() {
			fadeOut(loader);
			fadeOut(overlay);
		}, 200);
	};
	preloader();
	

	var tinySdlier = function() {

		var heroSlider = document.querySelectorAll('.hero-slide');
		var propertySlider = document.querySelectorAll('.property-slider');
		var imgPropertySlider = document.querySelectorAll('.img-property-slide');
		var testimonialSlider = document.querySelectorAll('.testimonial-slider');
		

		if ( heroSlider.length > 0 ) {
			var tnsHeroSlider = tns({
				container: '.hero-slide',
				mode: 'carousel',
				speed: 700,
				autoplay: true,
				controls: false,
				nav: false,
				autoplayButtonOutput: false,
				controlsContainer: '#hero-nav',
			});
		}


		if ( imgPropertySlider.length > 0 ) {
			var tnsPropertyImageSlider = tns({
				container: '.img-property-slide',
				mode: 'carousel',
				speed: 700,
				items: 1,
				gutter: 30,
				autoplay: true,
				controls: false,
				nav: true,
				autoplayButtonOutput: false
			});
		}

		if ( propertySlider.length> 0 ) {
			var tnsSlider = tns({
				container: '.property-slider',
				mode: 'carousel',
				speed: 700,
				gutter: 30,
				items: 3,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#property-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}


		if ( testimonialSlider.length> 0 ) {
			var tnsSlider = tns({
				container: '.testimonial-slider',
				mode: 'carousel',
				speed: 700,
				items: 3,
				gutter: 50,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#testimonial-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}
	}
	tinySdlier();


	var backgroundMusic = function() {
		if (!document.body) {
			return;
		}

		var playStorageKey = 'nkBackgroundMusicEnabled';
		var volumeStorageKey = 'nkBackgroundMusicVolume';
		var muteStorageKey = 'nkBackgroundMusicMuted';
		var preferredEnabled = localStorage.getItem(playStorageKey);
		var shouldPlay = preferredEnabled !== 'false';
		var defaultVolume = 0.35;
		var savedVolume = parseFloat(localStorage.getItem(volumeStorageKey));
		var initialVolume = (!isNaN(savedVolume) && savedVolume >= 0 && savedVolume <= 1) ? savedVolume : defaultVolume;
		var isMuted = localStorage.getItem(muteStorageKey) === 'true';
		var lastKnownVolume = initialVolume > 0 ? initialVolume : defaultVolume;

		var audio = document.createElement('audio');
		audio.src = 'media/website%20music.mp3';
		audio.loop = true;
		audio.preload = 'auto';
		audio.volume = initialVolume;
		audio.muted = isMuted;
		audio.style.display = 'none';
		document.body.appendChild(audio);

		var controls = document.createElement('div');
		controls.style.position = 'fixed';
		controls.style.right = '20px';
		controls.style.bottom = '20px';
		controls.style.zIndex = '9999';
		controls.style.display = 'flex';
		controls.style.gap = '8px';
		document.body.appendChild(controls);

		var playButton = document.createElement('button');
		playButton.type = 'button';
		playButton.setAttribute('aria-label', 'Toggle background music');
		playButton.style.border = 'none';
		playButton.style.borderRadius = '999px';
		playButton.style.padding = '10px 14px';
		playButton.style.fontSize = '13px';
		playButton.style.fontWeight = '600';
		playButton.style.backgroundColor = '#8b2e2e';
		playButton.style.color = '#ffffff';
		playButton.style.cursor = 'pointer';
		playButton.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.22)';
		playButton.style.transition = 'opacity 0.2s ease';
		controls.appendChild(playButton);

		var volumeButton = document.createElement('button');
		volumeButton.type = 'button';
		volumeButton.setAttribute('aria-label', 'Toggle music volume');
		volumeButton.style.border = 'none';
		volumeButton.style.borderRadius = '999px';
		volumeButton.style.padding = '10px 14px';
		volumeButton.style.fontSize = '13px';
		volumeButton.style.fontWeight = '600';
		volumeButton.style.backgroundColor = '#8b2e2e';
		volumeButton.style.color = '#ffffff';
		volumeButton.style.cursor = 'pointer';
		volumeButton.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.22)';
		volumeButton.style.transition = 'opacity 0.2s ease';
		controls.appendChild(volumeButton);

		var setPlayButtonState = function(isPlaying) {
			playButton.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
			playButton.textContent = isPlaying ? 'Music: On' : 'Music: Off';
			playButton.style.opacity = isPlaying ? '1' : '0.9';
		};

		var setVolumeButtonState = function() {
			if (audio.muted || audio.volume === 0) {
				volumeButton.setAttribute('aria-pressed', 'false');
				volumeButton.textContent = 'Vol: Off';
				volumeButton.style.opacity = '0.9';
				return;
			}

			volumeButton.setAttribute('aria-pressed', 'true');
			volumeButton.textContent = 'Vol: ' + Math.round(audio.volume * 100) + '%';
			volumeButton.style.opacity = '1';
		};

		var playAudio = function() {
			audio.play().then(function() {
				setPlayButtonState(true);
			}).catch(function() {
				setPlayButtonState(false);
			});
		};

		if (shouldPlay) {
			setPlayButtonState(false);
		} else {
			audio.pause();
			setPlayButtonState(false);
		}
		setVolumeButtonState();

		var startOnFirstInteraction = function() {
			if (!shouldPlay) {
				return;
			}
			playAudio();
			document.removeEventListener('click', startOnFirstInteraction);
			document.removeEventListener('touchstart', startOnFirstInteraction);
			document.removeEventListener('keydown', startOnFirstInteraction);
		};

		document.addEventListener('click', startOnFirstInteraction);
		document.addEventListener('touchstart', startOnFirstInteraction);
		document.addEventListener('keydown', startOnFirstInteraction);

		playButton.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			if (audio.paused) {
				shouldPlay = true;
				localStorage.setItem(playStorageKey, 'true');
				playAudio();
				return;
			}

			audio.pause();
			shouldPlay = false;
			localStorage.setItem(playStorageKey, 'false');
			setPlayButtonState(false);
		});

		volumeButton.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			if (audio.muted || audio.volume === 0) {
				audio.muted = false;
				audio.volume = lastKnownVolume;
				localStorage.setItem(volumeStorageKey, String(audio.volume));
				localStorage.setItem(muteStorageKey, 'false');
				setVolumeButtonState();
				return;
			}

			lastKnownVolume = audio.volume > 0 ? audio.volume : lastKnownVolume;
			audio.muted = true;
			localStorage.setItem(muteStorageKey, 'true');
			setVolumeButtonState();
		});
	};
	backgroundMusic();



})()