/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


toggle.addEventListener("click",() => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
});

function updateButton() {
	if (video.paused) {
		toggle.textContent = "►";
	} else {
		toggle.textContent = "❚ ❚";
	}
};

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

ranges[0].addEventListener("input",() => {
	video.volume = ranges[0].value;
});

ranges[1].addEventListener("input",() => {
	video.playbackRate = ranges[1].value;
});

skipButtons.forEach(button =>{
	button.addEventListener("click", () => {
		video.currentTime += Number(button.dataset.skip);
	});
});

function updateProgress() {
	if (Number.isFinite(video.duration) && video.duration>0) {
		const percent = (video.currentTime/video.duration)*100;
		progressBar.style.width = `${percent}%`;
	}
};

let animationId;
function animate() {
	updateProgress();
	animationId = requestAnimationFrame(animate);
};
video.addEventListener("play", animate);

function stopAnimate() {
	cancelAnimationFrame(animationId);
};
video.addEventListener("pause", stopAnimate);

progress.addEventListener("click",(event) => {
	const dimension = progress.getBoundingClientRect();
	console.log(dimension);
	console.log(event.offsetX);

	const clickPosition = (event.offsetX/dimension.width);
	video.currentTime = video.duration * clickPosition;
});

video.addEventListener("error" , () => {
	const errorMsg = document.createElement("div");
	errorMsg.classList.add("player__error");
	errorMsg.textContent = "Sorry! Video could not be loaded.";
	player.appendChild(errorMsg);
});



