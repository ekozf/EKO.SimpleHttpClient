declare const hljs: any;

import CreateToast from "./CreateToast.js";
import ToastType from "./types/ToastType.js";

document.addEventListener("DOMContentLoaded", () => {
	const formatButton = document.querySelector(
		"#formatContent"
	) as HTMLButtonElement;

	formatButton.onclick = FormatTextArea;

	const methodSelect = document.querySelector(
		"#requestMethod"
	) as HTMLSelectElement;

	methodSelect.addEventListener("change", () => {
		if (methodSelect.value === "GET") {
			const editor = document.querySelector("#requestBody") as HTMLElement;
			editor.classList.add("d-none");
			editor.classList.remove("d-block");
		} else {
			const editor = document.querySelector("#requestBody") as HTMLElement;
			editor.classList.add("d-block");
			editor.classList.remove("d-none");
		}
	});
});

function FormatTextArea() {
	const editor = document.querySelector("#editor") as HTMLElement;

	try {
		const obj = JSON.parse(editor.textContent);

		const pretty = JSON.stringify(obj, undefined, 4);

		editor.textContent = pretty;

		editor.removeAttribute("data-highlighted");

		hljs.highlightAll();

		CreateToast("Successfully formatted!", ToastType.Success);
	} catch (error: any) {
		console.error(error);

		CreateToast(error.message, ToastType.Error);
	}
}
