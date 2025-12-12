const form = document.getElementById("plannerForm");
const fields = {
  date: document.getElementById("date"),
  presiding: document.getElementById("presiding"),
  conductor: document.getElementById("conductor"),
  openingHymn: document.getElementById("openingHymn"),
  intermediateHymn: document.getElementById("intermediateHymn"),
  closingHymn: document.getElementById("closingHymn"),
  invocation: document.getElementById("invocation"),
  benediction: document.getElementById("benediction"),
};

const previewFields = {
  date: document.getElementById("previewDate"),
  presiding: document.getElementById("previewPresiding"),
  conductor: document.getElementById("previewConductor"),
  openingHymn: document.getElementById("previewOpeningHymn"),
  intermediateHymn: document.getElementById("previewIntermediateHymn"),
  closingHymn: document.getElementById("previewClosingHymn"),
  invocation: document.getElementById("previewInvocation"),
  benediction: document.getElementById("previewBenediction"),
};

const announcementList = document.getElementById("announcements");
const speakerList = document.getElementById("speakers");
const previewAnnouncements = document.getElementById("previewAnnouncements");
const previewSpeakers = document.getElementById("previewSpeakers");

const announcements = [];
const speakers = [];

function formatDate(dateValue) {
  if (!dateValue) return "Date TBD";
  const parsed = new Date(dateValue);
  return parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderList(listEl, items, previewEl) {
  listEl.innerHTML = "";
  previewEl.innerHTML = "";

  if (!items.length) {
    previewEl.classList.add("empty");
    previewEl.textContent = `No ${previewEl.id.includes("Announcement") ? "announcements" : "speakers"} added.`;
    return;
  }

  previewEl.classList.remove("empty");

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${item}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      items.splice(index, 1);
      renderList(listEl, items, previewEl);
    });

    li.appendChild(remove);
    listEl.appendChild(li);

    const previewItem = document.createElement("li");
    previewItem.textContent = item;
    previewEl.appendChild(previewItem);
  });
}

function updateField(name, formatter) {
  const value = fields[name].value.trim();
  previewFields[name].textContent = formatter ? formatter(value) : value || "Not set";
}

function syncPreview() {
  updateField("date", formatDate);
  updateField("presiding");
  updateField("conductor");
  updateField("openingHymn");
  updateField("intermediateHymn", (value) => value || "Optional");
  updateField("closingHymn");
  updateField("invocation");
  updateField("benediction");
}

form.addEventListener("input", syncPreview);

function attachAddHandler(buttonId, inputId, items, listEl, previewEl) {
  const input = document.getElementById(inputId);
  document.getElementById(buttonId).addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) return;
    items.push(value);
    input.value = "";
    renderList(listEl, items, previewEl);
  });
}

attachAddHandler("addAnnouncement", "announcementInput", announcements, announcementList, previewAnnouncements);
attachAddHandler("addSpeaker", "speakerInput", speakers, speakerList, previewSpeakers);

syncPreview();

// PDF export uses the browser print dialog with print-specific styles
const printButton = document.getElementById("printAgenda");
printButton.addEventListener("click", () => {
  window.print();
});
