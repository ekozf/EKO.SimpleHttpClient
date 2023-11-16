document.addEventListener("DOMContentLoaded", () => {
	const sendButton = document.querySelector(
		"#sendRequest"
	) as HTMLButtonElement;

	sendButton.onclick = SendRequest;
});

async function SendRequest() {
	const method = document.querySelector("#requestMethod") as HTMLSelectElement;
	const url = document.querySelector("#requestUrl") as HTMLInputElement;
	const body = document.querySelector("#editor") as HTMLElement;

	let serverResponse;

	if (method.value === "GET") {
		serverResponse = await fetch(url.value, {
			method: method.value,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} else {
		const json = JSON.parse(body.textContent);

		serverResponse = await fetch(url.value, {
			method: method.value,
			body: JSON.stringify(json),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const response = document.querySelector("#serverResponse") as HTMLElement;

	if (serverResponse.ok) {
		const pretty = JSON.stringify(await serverResponse.json(), undefined, 4);

		response.textContent = pretty;

		response.removeAttribute("data-highlighted");

		hljs.highlightAll();
	} else {
		const toast = CreateToast(
			`Error: ${serverResponse.status} ${serverResponse.statusText}`
		);

		const toastContainer = document.querySelector(
			"#toastContainer"
		) as HTMLDivElement;

		bootstrap.Toast.getOrCreateInstance(toast).show();

		toastContainer.appendChild(toast);
	}
}

function CreateToast(message: string, success: boolean = false) {
	const toast = document.createElement("div");

	toast.classList.add("toast");
	toast.setAttribute("role", "alert");
	toast.setAttribute("aria-live", "assertive");
	toast.setAttribute("aria-atomic", "true");

	const toastHeader = document.createElement("div");

	toastHeader.classList.add("toast-header");

	const toastStrong = document.createElement("strong");

	if (success) {
		toastStrong.classList.add("me-auto", "text-success");
		toastStrong.textContent = "Success!";
	} else {
		toastStrong.classList.add("me-auto", "text-danger");
		toastStrong.textContent = "Error!";
	}

	toastHeader.appendChild(toastStrong);

	const toastSmall = document.createElement("small");

	toastSmall.classList.add("text-body-secondary");

	const toastButton = document.createElement("button");

	toastButton.setAttribute("type", "button");
	toastButton.classList.add("btn-close");
	toastButton.setAttribute("data-bs-dismiss", "toast");
	toastButton.setAttribute("aria-label", "Close");

	toastSmall.appendChild(toastButton);

	toastHeader.appendChild(toastSmall);

	toast.appendChild(toastHeader);

	const toastBody = document.createElement("div");

	toastBody.classList.add("toast-body");
	toastBody.textContent = message;

	toast.appendChild(toastBody);

	return toast;
}
