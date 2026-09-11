// Menu responsivo: estado explícito para leitores de tela e navegação por teclado.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  navLinks.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  navLinks.classList.toggle("is-open", open);
});
navLinks
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav")) closeMenu();
});
matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

// Os downloads são demonstrativos. Nenhum arquivo, API ou serviço é acessado.
const toast = document.querySelector("#toast");
let toastTimer;
function hideToast() {
  clearTimeout(toastTimer);
  toast.hidden = true;
}
document.querySelectorAll("[data-demo-download]").forEach((button) => {
  button.addEventListener("click", () => {
    clearTimeout(toastTimer);
    toast.querySelector("p").textContent =
      `Download para ${button.dataset.demoDownload}: apenas uma demonstração. Este site é um projeto de estudo; nenhum arquivo será baixado.`;
    toast.hidden = false;
    toastTimer = setTimeout(hideToast, 7000);
  });
});
toast.querySelector("button").addEventListener("click", hideToast);

// Painel ilustrativo, com dados fictícios. As ações acontecem somente nesta página.
const deck = document.querySelector("#demo-deck");
const feedback = document.querySelector("#demo-feedback");
let playing = false;
let volume = 50;
let track = 0;
const tracks = ["Foco da manhã", "Pausa para um café", "Mais uma ideia"];
const workspaces = {
  apps: {
    title: "Seus aplicativos.",
    count: "01 — 03",
    buttons: [
      { label: "Navegador", icon: "browser", color: "#e6b27e" },
      { label: "VS Code", icon: "code", color: "#9bbfec" },
      { label: "Spotify", icon: "music", color: "#94d3a0" },
      { label: "Terminal", icon: "terminal", color: "#c1b0ed" },
      { label: "Estudos", icon: "grid", color: "#e0bd8e" },
      { label: "Arquivos", icon: "grid", color: "#a7c5d5" },
    ],
  },
  music: {
    title: "No seu ritmo.",
    count: "02 — 03",
    buttons: [
      { label: "Spotify", icon: "music", color: "#94d3a0" },
      { label: "Play / Pause", icon: "play", action: "play", color: "#c1b0ed" },
      { label: "Próxima", icon: "next", action: "next", color: "#e0bd8e" },
      { label: "Volume −", icon: "volume", action: "down", color: "#9bbfec" },
      { label: "Volume +", icon: "volume", action: "up", color: "#9bbfec" },
      { label: "Silenciar", icon: "volume", action: "mute", color: "#e0a3b5" },
    ],
  },
  monitor: { title: "Tudo sob controle.", count: "03 — 03" },
};
function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#i-${name}`);
  svg.setAttribute("aria-hidden", "true");
  svg.append(use);
  return svg;
}
let workspaceTimer;
function showWorkspace(name, animate = true) {
  const workspace = workspaces[name];
  const title = document.querySelector("#workspace-title");
  const count = document.querySelector("#workspace-count");
  const targets = [title, count, deck, feedback];
  document
    .querySelectorAll("[data-workspace]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.workspace === name),
      ),
    );
  clearTimeout(workspaceTimer);
  const render = () => {
    title.textContent = workspace.title;
    count.textContent = workspace.count;
    deck.replaceChildren();
    feedback.textContent =
      name === "monitor"
        ? "Valores ilustrativos. Seu PC não está sendo monitorado."
        : "Toque em um botão para experimentar.";
    if (name === "monitor") {
      for (const [label, value, detail] of [
        ["CPU", 24, "Processador"],
        ["RAM", 48, "Memória"],
        ["GPU", 12, "Gráficos"],
      ]) {
        const row = document.createElement("div");
        row.className = "monitor-item";
        const itemTitle = document.createElement("span");
        itemTitle.textContent = label;
        const note = document.createElement("small");
        note.textContent = detail;
        const meter = document.createElement("meter");
        meter.min = 0;
        meter.max = 100;
        meter.value = value;
        meter.setAttribute("aria-label", `${label}: valor ilustrativo`);
        const number = document.createElement("strong");
        number.textContent = `${value}%`;
        row.append(itemTitle, note, meter, number);
        deck.append(row);
      }
    } else {
      workspace.buttons.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "deck-button";
        button.style.setProperty("--tone", item.color);
        button.style.setProperty("--item-index", index);
        const artwork = icon(
          item.action === "play" && playing ? "pause" : item.icon,
        );
        const label = document.createElement("span");
        label.textContent = item.label;
        button.append(artwork, label);
        if (item.action === "play")
          button.setAttribute("aria-pressed", String(playing));
        button.addEventListener("click", () => {
          button.classList.add("pressed");
          setTimeout(() => button.classList.remove("pressed"), 260);
          switch (item.action) {
            case "play":
              playing = !playing;
              artwork
                .querySelector("use")
                .setAttribute("href", playing ? "#i-pause" : "#i-play");
              button.setAttribute("aria-pressed", String(playing));
              feedback.textContent = playing
                ? `Prévia: tocando “${tracks[track]}”.`
                : "Prévia: música pausada.";
              break;
            case "next":
              track = (track + 1) % tracks.length;
              feedback.textContent = `Prévia: “${tracks[track]}”.`;
              break;
            case "up":
              volume = Math.min(100, volume + 10);
              feedback.textContent = `Volume demonstrativo: ${volume}%.`;
              break;
            case "down":
              volume = Math.max(0, volume - 10);
              feedback.textContent = `Volume demonstrativo: ${volume}%.`;
              break;
            case "mute":
              volume = 0;
              feedback.textContent = "Prévia: áudio silenciado.";
              break;
            default:
              feedback.textContent = `Prévia: ${item.label} abriria no seu Linux.`;
          }
        });
        deck.append(button);
      });
    }
    targets.forEach((target) => {
      target.classList.remove("workspace-transition-out");
      void target.offsetWidth;
      target.classList.add("workspace-transition-in");
    });
    [...deck.children].forEach((item, index) =>
      item.style.setProperty("--item-index", index),
    );
    workspaceTimer = setTimeout(
      () =>
        targets.forEach((target) =>
          target.classList.remove("workspace-transition-in"),
        ),
      900,
    );
  };
  if (!animate || !document.body.classList.contains("page-ready")) {
    render();
    return;
  }
  targets.forEach((target) => target.classList.add("workspace-transition-out"));
  workspaceTimer = setTimeout(render, 260);
}

document
  .querySelectorAll("[data-workspace]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      showWorkspace(button.dataset.workspace),
    ),
  );
showWorkspace("apps", false);
document.body.classList.add("page-ready");

// Revela as seções quando entram no viewport, com fallback para navegadores antigos.
const revealItems = document.querySelectorAll(
  ".showcase, .features, .how-section, .faq, .closing",
);
revealItems.forEach((item) => item.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
