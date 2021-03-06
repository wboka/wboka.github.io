if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js");
	});

	let deferredPrompt;

	window.addEventListener("beforeinstallprompt", e => {
		e.preventDefault();
		deferredPrompt = e;

		const btnAdd = document.getElementById("add-to-home-screen");

		btnAdd.style.display = "block";

		btnAdd.addEventListener("click", e => {
			btnAdd.style.display = "none";
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then(choiceResult => {
				deferredPrompt = null;
			});
		});
	});
}
