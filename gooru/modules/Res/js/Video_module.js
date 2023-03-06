'use strict';
define(function(){

	class VideoPlayer
	{
		constructor(element)
		{
			this.container = element;
			this.container.player = this;
			this.video = this.container.querySelector('video');
			if(this.video)
			{
				this.initEvents();
				this.loaded = true;
			}
		}
		
		initEvents()
		{
			const parent = this.container.parentElement;
			if(parent.tagName == 'A')
			{
				parent.addEventListener('click', e => e.preventDefault());
			}
			
			this.container.addEventListener('mouseenter', e => {
				if(!this.isActive())
				{
					this.video.muted = true;
					this.play();
				}
			});
			this.container.addEventListener('mouseleave', e => {
				if(!this.isActive())
				{
					this.pause();
					this.load();
				}
			});
			this.constructor.setOutClickEvent();
			this.container.addEventListener('click', e => {
				if(!this.isActive())
				{
					this.playFull();
				}
			});
			this.video.addEventListener('playing', e => {
				this.isPlaying = true;
			});
			this.video.addEventListener('pause', e => {
				this.isPlaying = false;
			});
			this.video.addEventListener('loadeddata', e => {
				this.loaded = true;
			});
		}

		load()
		{
			this.loaded = false;
			this.video.load();
		}
		
		playFull()
		{
			this.constructor.getPlayers().forEach(player => {
				if(player !== this)
				{
					player.stop();
				}
			});
			this.isActive(true);
			this.video.controls = true;
			this.video.muted = false;
			this.video.currentTime = 0;
			this.play();
		}
		
		async play()
		{
			if(this.video.paused && !this.isPlaying && this.loaded)
			{
				this.isPlaying = false;
				return this.video.play().then(() => this.isPlaying = true);
			}
		}
		
		pause()
		{
			if(!this.video.paused && this.isPlaying)
			{
				this.video.pause();
			}
			this.isPlaying = false;
		}

		stop()
		{
			this.pause();
			this.load();
			this.isActive(false);
			this.video.controls = false;
			this.video.mutable = true;
		}
		
		isActive(value = null)
		{
			if(value === null)
			{
				return this.container.isActive;
			}
			this.container.isActive = value;
			if(value)
			{
				this.container.classList.add('selected');
				if(this.isNoZoom())
				{
					this.container.classList.add('no-zoom');
				}
			}
			else
			{
				this.container.classList.remove('selected');
			}
		}

		isNoZoom()
		{
			return Gooru.isMobile() || !this.container.closest('.wide-carousel-container');
		}
		
		static setOutClickEvent()
		{
			if(!VideoPlayer.wasOutClick)
			{
				window.addEventListener('click', e => {
					if(!e.target.closest('.video-player') || e.target.closest('.video-player-close'))
					{
						VideoPlayer.stopAll();
					}
				});
				VideoPlayer.wasOutClick = true;
			}
		}
		
		static stopAll()
		{
			VideoPlayer.getPlayers().forEach(player => {
				player.stop();
			});
		}
		
		static getPlayers()
		{
			const players = [];
			document.querySelectorAll('.video-player').forEach(element => {
				if(element.player)
				{
					players.push(element.player);
				}
			});
			return players;
		}
	}

	return VideoPlayer;
});