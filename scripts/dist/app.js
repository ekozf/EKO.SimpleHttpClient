"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formatButton = document.querySelector("#formatContent");
    formatButton.onclick = FormatTextArea;
});
function FormatTextArea() {
    const editor = document.querySelector("#editor");
    const toastContainer = document.querySelector("#toastContainer");
    try {
        const obj = JSON.parse(editor.textContent);
        const pretty = JSON.stringify(obj, undefined, 4);
        editor.textContent = pretty;
        editor.removeAttribute("data-highlighted");
        hljs.highlightAll();
        const toast = CreateToast("Successfully formatted!", true);
        bootstrap.Toast.getOrCreateInstance(toast).show();
        toastContainer.appendChild(toast);
    }
    catch (error) {
        console.error(error);
        const toast = CreateToast(error.message);
        bootstrap.Toast.getOrCreateInstance(toast).show();
        toastContainer.appendChild(toast);
    }
}
function CreateToast(message, success = false) {
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
    }
    else {
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
//# sourceMappingURL=app.js.map