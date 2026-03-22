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
		controls.style.alignItems = 'center';
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

		var volumePanel = document.createElement('div');
		volumePanel.style.position = 'fixed';
		volumePanel.style.right = '20px';
		volumePanel.style.bottom = '72px';
		volumePanel.style.zIndex = '9999';
		volumePanel.style.backgroundColor = '#ffffff';
		volumePanel.style.border = '1px solid rgba(139, 46, 46, 0.2)';
		volumePanel.style.borderRadius = '12px';
		volumePanel.style.padding = '10px 12px';
		volumePanel.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.16)';
		volumePanel.style.display = 'none';
		volumePanel.style.width = '220px';
		volumePanel.style.maxWidth = '70vw';
		document.body.appendChild(volumePanel);

		var volumePanelTop = document.createElement('div');
		volumePanelTop.style.display = 'flex';
		volumePanelTop.style.justifyContent = 'space-between';
		volumePanelTop.style.alignItems = 'center';
		volumePanelTop.style.marginBottom = '8px';
		volumePanel.appendChild(volumePanelTop);

		var volumeLabel = document.createElement('span');
		volumeLabel.textContent = 'Volume';
		volumeLabel.style.fontSize = '12px';
		volumeLabel.style.fontWeight = '700';
		volumeLabel.style.color = '#8b2e2e';
		volumePanelTop.appendChild(volumeLabel);

		var muteButton = document.createElement('button');
		muteButton.type = 'button';
		muteButton.setAttribute('aria-label', 'Mute or unmute background music');
		muteButton.style.border = 'none';
		muteButton.style.borderRadius = '999px';
		muteButton.style.padding = '5px 10px';
		muteButton.style.fontSize = '11px';
		muteButton.style.fontWeight = '600';
		muteButton.style.backgroundColor = '#8b2e2e';
		muteButton.style.color = '#ffffff';
		muteButton.style.cursor = 'pointer';
		volumePanelTop.appendChild(muteButton);

		var volumeSlider = document.createElement('input');
		volumeSlider.type = 'range';
		volumeSlider.min = '0';
		volumeSlider.max = '100';
		volumeSlider.step = '1';
		volumeSlider.value = String(Math.round(initialVolume * 100));
		volumeSlider.style.width = '100%';
		volumeSlider.style.accentColor = '#8b2e2e';
		volumePanel.appendChild(volumeSlider);

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
				muteButton.textContent = 'Unmute';
				volumeSlider.value = '0';
				return;
			}

			volumeButton.setAttribute('aria-pressed', 'true');
			volumeButton.textContent = 'Vol: ' + Math.round(audio.volume * 100) + '%';
			volumeButton.style.opacity = '1';
			muteButton.textContent = 'Mute';
			volumeSlider.value = String(Math.round(audio.volume * 100));
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

		var toggleVolumePanel = function(forceOpen) {
			var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : volumePanel.style.display === 'none';
			volumePanel.style.display = shouldOpen ? 'block' : 'none';
		};

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
			toggleVolumePanel();
		});

		muteButton.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			if (audio.muted || audio.volume === 0) {
				audio.muted = false;
				audio.volume = lastKnownVolume > 0 ? lastKnownVolume : defaultVolume;
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

		volumeSlider.addEventListener('input', function(event) {
			event.stopPropagation();
			var sliderValue = parseInt(volumeSlider.value, 10);
			var normalizedVolume = sliderValue / 100;

			audio.volume = normalizedVolume;
			localStorage.setItem(volumeStorageKey, String(normalizedVolume));

			if (normalizedVolume === 0) {
				audio.muted = true;
				localStorage.setItem(muteStorageKey, 'true');
			} else {
				audio.muted = false;
				lastKnownVolume = normalizedVolume;
				localStorage.setItem(muteStorageKey, 'false');
			}

			setVolumeButtonState();
		});

		volumePanel.addEventListener('click', function(event) {
			event.stopPropagation();
		});

		document.addEventListener('click', function() {
			toggleVolumePanel(false);
		});
	};
	var backgroundMusicPremium = function() {
		if (!document.body) {
			return;
		}

		if (document.getElementById('nk-mini-player')) {
			return;
		}

		var styleId = 'nk-mini-player-style';
		if (!document.getElementById(styleId)) {
			var styleTag = document.createElement('style');
			styleTag.id = styleId;
			styleTag.type = 'text/css';
			styleTag.textContent = [
				'.nk-mini-player{position:fixed;right:18px;bottom:18px;z-index:9999;width:320px;max-width:calc(100vw - 24px);backdrop-filter:blur(14px);background:linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,255,255,0.68));border:1px solid rgba(139,46,46,0.24);border-radius:16px;box-shadow:0 10px 30px rgba(18,18,18,0.18);padding:12px 12px 10px;color:#2a1a1a;font-family:"Be Vietnam Pro",Arial,sans-serif;}',
				'.nk-mini-player *{box-sizing:border-box;}',
				'.nk-mini-player__top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;}',
				'.nk-mini-player__title{font-size:14px;font-weight:700;letter-spacing:0.2px;}',
				'.nk-mini-player__status{font-size:12px;font-weight:600;color:#8b2e2e;}',
				'.nk-mini-player__eq{display:flex;align-items:flex-end;gap:3px;height:14px;}',
				'.nk-mini-player__eq span{display:block;width:3px;height:4px;background:#8b2e2e;border-radius:2px;opacity:0.4;animation:nkEq 1s ease-in-out infinite;}',
				'.nk-mini-player__eq span:nth-child(2){animation-delay:0.1s;}',
				'.nk-mini-player__eq span:nth-child(3){animation-delay:0.2s;}',
				'.nk-mini-player__eq span:nth-child(4){animation-delay:0.3s;}',
				'.nk-mini-player:not(.is-playing) .nk-mini-player__eq span{animation-play-state:paused;opacity:0.25;}',
				'.nk-mini-player__body{display:flex;flex-direction:column;gap:10px;max-height:200px;overflow:hidden;transition:max-height .25s ease,opacity .25s ease;}',
				'.nk-mini-player.is-collapsed .nk-mini-player__body{max-height:0;opacity:0;pointer-events:none;}',
				'.nk-mini-player__controls{display:flex;gap:8px;flex-wrap:wrap;}',
				'.nk-mini-player__btn{border:0;border-radius:999px;padding:7px 12px;background:#8b2e2e;color:#fff;font-size:12px;font-weight:700;line-height:1;cursor:pointer;transition:transform .15s ease,opacity .15s ease,background .2s ease;}',
				'.nk-mini-player__btn:hover{transform:translateY(-1px);}',
				'.nk-mini-player__btn:active{transform:translateY(0);}',
				'.nk-mini-player__btn--ghost{background:rgba(139,46,46,0.14);color:#6d2424;}',
				'.nk-mini-player__volume{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;}',
				'.nk-mini-player__slider{width:100%;accent-color:#8b2e2e;cursor:pointer;}',
				'.nk-mini-player__percent{font-size:12px;font-weight:700;min-width:40px;text-align:right;color:#6d2424;}',
				'@keyframes nkEq{0%{height:3px;}50%{height:14px;}100%{height:4px;}}',
				'@media (max-width:575px){.nk-mini-player{left:12px;right:12px;bottom:12px;width:auto;padding:11px 11px 9px;}.nk-mini-player__btn{padding:7px 10px;font-size:11px;}.nk-mini-player__title{font-size:13px;}}'
			].join('');
			document.head.appendChild(styleTag);
		}

		var storage = (function() {
			var available = true;
			try {
				var testKey = '__nk_music_test__';
				window.localStorage.setItem(testKey, '1');
				window.localStorage.removeItem(testKey);
			} catch (error) {
				available = false;
			}
			return {
				get: function(key) {
					if (!available) {
						return null;
					}
					try {
						return window.localStorage.getItem(key);
					} catch (error) {
						return null;
					}
				},
				set: function(key, value) {
					if (!available) {
						return;
					}
					try {
						window.localStorage.setItem(key, value);
					} catch (error) {
					}
				}
			};
		})();

		var playStorageKey = 'nkBackgroundMusicEnabled';
		var volumeStorageKey = 'nkBackgroundMusicVolume';
		var muteStorageKey = 'nkBackgroundMusicMuted';
		var collapsedStorageKey = 'nkBackgroundMusicCollapsed';
		var defaultVolumePercent = 35;

		var parsePercent = function(raw, fallbackPercent) {
			var parsed = parseInt(raw, 10);
			if (isNaN(parsed)) {
				return fallbackPercent;
			}
			if (parsed < 0) {
				return 0;
			}
			if (parsed > 100) {
				return 100;
			}
			return parsed;
		};

		var enabled = storage.get(playStorageKey) !== 'false';
		var volumePercent = parsePercent(storage.get(volumeStorageKey), defaultVolumePercent);
		var muted = storage.get(muteStorageKey) === 'true';
		var collapsed = storage.get(collapsedStorageKey) === 'true';
		var lastNonZero = volumePercent > 0 ? volumePercent : defaultVolumePercent;

		var audio = document.getElementById('nk-background-audio');
		if (!audio) {
			audio = document.createElement('audio');
			audio.id = 'nk-background-audio';
			audio.style.display = 'none';
			document.body.appendChild(audio);
		}
		audio.src = 'media/website%20music.mp3';
		audio.loop = true;
		audio.preload = 'auto';
		audio.muted = muted;
		audio.volume = muted ? 0 : (volumePercent / 100);

		var player = document.createElement('section');
		player.id = 'nk-mini-player';
		player.className = 'nk-mini-player';
		player.setAttribute('aria-label', 'Background music player');
		player.innerHTML = '' +
			'<div class="nk-mini-player__top">' +
				'<div>' +
					'<div class="nk-mini-player__title">Ambient Soundtrack</div>' +
					'<div class="nk-mini-player__status">Paused</div>' +
				'</div>' +
				'<div class="nk-mini-player__eq" aria-hidden="true">' +
					'<span></span><span></span><span></span><span></span>' +
				'</div>' +
			'</div>' +
			'<div class="nk-mini-player__body">' +
				'<div class="nk-mini-player__controls">' +
					'<button type="button" class="nk-mini-player__btn nk-mini-player__btn--play" aria-label="Toggle play or pause">Play</button>' +
					'<button type="button" class="nk-mini-player__btn nk-mini-player__btn--mute nk-mini-player__btn--ghost" aria-label="Toggle mute">Mute</button>' +
					'<button type="button" class="nk-mini-player__btn nk-mini-player__btn--collapse nk-mini-player__btn--ghost" aria-label="Collapse or expand player">Collapse</button>' +
				'</div>' +
				'<div class="nk-mini-player__volume">' +
					'<input class="nk-mini-player__slider" type="range" min="0" max="100" step="1" aria-label="Music volume">' +
					'<span class="nk-mini-player__percent">35%</span>' +
				'</div>' +
			'</div>';
		document.body.appendChild(player);

		var statusText = player.querySelector('.nk-mini-player__status');
		var playButton = player.querySelector('.nk-mini-player__btn--play');
		var muteButton = player.querySelector('.nk-mini-player__btn--mute');
		var collapseButton = player.querySelector('.nk-mini-player__btn--collapse');
		var volumeSlider = player.querySelector('.nk-mini-player__slider');
		var percentLabel = player.querySelector('.nk-mini-player__percent');

		volumeSlider.value = String(volumePercent);

		var fadeRaf = 0;
		var clearFade = function() {
			if (fadeRaf) {
				cancelAnimationFrame(fadeRaf);
				fadeRaf = 0;
			}
		};

		var fadeTo = function(targetVolume, duration, done) {
			clearFade();
			var startVolume = audio.volume;
			var diff = targetVolume - startVolume;
			var startTime = Date.now();

			var step = function() {
				var elapsed = Date.now() - startTime;
				var progress = duration > 0 ? (elapsed / duration) : 1;
				if (progress > 1) {
					progress = 1;
				}
				audio.volume = startVolume + (diff * progress);
				if (progress < 1) {
					fadeRaf = requestAnimationFrame(step);
					return;
				}
				fadeRaf = 0;
				if (typeof done === 'function') {
					done();
				}
			};

			step();
		};

		var refreshUI = function() {
			var isPlaying = !audio.paused;
			var status = 'Paused';
			if (muted || volumePercent === 0) {
				status = 'Muted';
			} else if (isPlaying) {
				status = 'Playing';
			}
			statusText.textContent = status;
			playButton.textContent = isPlaying ? 'Pause' : 'Play';
			muteButton.textContent = (muted || volumePercent === 0) ? 'Unmute' : 'Mute';
			collapseButton.textContent = collapsed ? 'Expand' : 'Collapse';
			percentLabel.textContent = String(volumePercent) + '%';
			volumeSlider.value = String(volumePercent);
			player.classList.toggle('is-collapsed', collapsed);
			player.classList.toggle('is-playing', isPlaying && !muted && volumePercent > 0);
		};

		var startPlayback = function() {
			enabled = true;
			storage.set(playStorageKey, 'true');
			clearFade();

			var targetVolume = muted ? 0 : (volumePercent / 100);
			audio.muted = false;
			audio.volume = 0;

			audio.play().then(function() {
				if (targetVolume > 0) {
					fadeTo(targetVolume, 500, function() {
						audio.muted = muted;
						refreshUI();
					});
				} else {
					audio.muted = true;
					refreshUI();
				}
			}).catch(function() {
				refreshUI();
			});
		};

		var pausePlayback = function() {
			clearFade();
			if (audio.paused) {
				refreshUI();
				return;
			}

			if (!audio.muted && audio.volume > 0) {
				fadeTo(0, 320, function() {
					audio.pause();
					audio.muted = muted;
					audio.volume = muted ? 0 : (volumePercent / 100);
					refreshUI();
				});
				return;
			}

			audio.pause();
			refreshUI();
		};

		var togglePlayPause = function() {
			if (audio.paused) {
				startPlayback();
			} else {
				enabled = false;
				storage.set(playStorageKey, 'false');
				pausePlayback();
			}
		};

		var toggleMute = function() {
			if (muted || volumePercent === 0) {
				muted = false;
				if (volumePercent === 0) {
					volumePercent = lastNonZero > 0 ? lastNonZero : defaultVolumePercent;
				}
			} else {
				if (volumePercent > 0) {
					lastNonZero = volumePercent;
				}
				muted = true;
			}

			storage.set(muteStorageKey, muted ? 'true' : 'false');
			storage.set(volumeStorageKey, String(volumePercent));

			audio.muted = muted;
			audio.volume = muted ? 0 : (volumePercent / 100);
			refreshUI();
		};

		var setVolumeFromSlider = function(rawValue) {
			volumePercent = parsePercent(rawValue, defaultVolumePercent);

			if (volumePercent > 0) {
				lastNonZero = volumePercent;
				if (muted) {
					muted = false;
				}
			} else {
				muted = true;
			}

			storage.set(volumeStorageKey, String(volumePercent));
			storage.set(muteStorageKey, muted ? 'true' : 'false');

			audio.muted = muted;
			audio.volume = muted ? 0 : (volumePercent / 100);
			refreshUI();
		};

		var isTypingTarget = function(target) {
			if (!target) {
				return false;
			}
			var tag = target.tagName ? target.tagName.toLowerCase() : '';
			return target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select';
		};

		playButton.addEventListener('click', function(event) {
			event.preventDefault();
			togglePlayPause();
		});

		muteButton.addEventListener('click', function(event) {
			event.preventDefault();
			toggleMute();
		});

		collapseButton.addEventListener('click', function(event) {
			event.preventDefault();
			collapsed = !collapsed;
			storage.set(collapsedStorageKey, collapsed ? 'true' : 'false');
			refreshUI();
		});

		volumeSlider.addEventListener('input', function() {
			setVolumeFromSlider(volumeSlider.value);
		});

		document.addEventListener('keydown', function(event) {
			if (isTypingTarget(event.target) || event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}
			var key = event.key ? event.key.toLowerCase() : '';
			if (key === 'm') {
				event.preventDefault();
				togglePlayPause();
			}
			if (key === 'v') {
				event.preventDefault();
				toggleMute();
			}
		});

		var firstInteractionHandled = false;
		var onFirstInteraction = function() {
			if (firstInteractionHandled) {
				return;
			}
			firstInteractionHandled = true;
			if (enabled && audio.paused) {
				startPlayback();
			}
			document.removeEventListener('pointerdown', onFirstInteraction);
			document.removeEventListener('touchstart', onFirstInteraction);
			document.removeEventListener('keydown', onFirstInteraction);
		};

		document.addEventListener('pointerdown', onFirstInteraction);
		document.addEventListener('touchstart', onFirstInteraction);
		document.addEventListener('keydown', onFirstInteraction);

		audio.addEventListener('ended', function() {
			refreshUI();
		});

		if (collapsed) {
			player.classList.add('is-collapsed');
		}
		refreshUI();
	};
	backgroundMusicPremium();



})()