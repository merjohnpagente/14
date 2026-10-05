const MAX_IMAGES = 5;
const MAX_YES_SCALE = 2.2;

const messages = [
  "No",
  "Are you sure?",
  "Pookie please",
  "Don't do this to me :(",
  "You're breaking my heart",
  "I'm gonna cry...",
];

const subtitles = [
  "",
  "Think about it again...",
  "Look at this face!",
  "The Yes button is getting bigger for a reason",
  "Pretty please with a cherry on top?",
  "Okay, you really have no choice now",
];

const card = document.querySelector(".card");
const catImg = document.querySelector(".cat-img");
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const buttons = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const heartsLayer = document.querySelector(".hearts");

const HEART_COLORS = ["#faa2c1", "#f783ac", "#f06595", "#e64980", "#ffc9c9", "#d0bfff"];
const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const randomItem = (list) => list[Math.floor(Math.random() * list.length)];
const random = (min, max) => Math.random() * (max - min) + min;

function createHeart(className) {
  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute("viewBox", "0 0 24 24");
  heart.setAttribute("class", className);
  heart.innerHTML = `<path fill="currentColor" d="${HEART_PATH}"/>`;
  heart.style.setProperty("--color", randomItem(HEART_COLORS));
  return heart;
}

let noCount = 0;

for (let i = 1; i <= MAX_IMAGES; i++) {
  new Image().src = `cat-${i}.jpg`;
}
new Image().src = "cat-yes.jpg";

function spawnBackgroundHearts(count = 18) {
  for (let i = 0; i < count; i++) {
    const heart = createHeart("heart");
    heart.style.left = `${random(0, 100)}%`;
    heart.style.setProperty("--size", `${random(1.6, 3.6)}rem`);
    heart.style.setProperty("--duration", `${random(9, 18)}s`);
    heart.style.setProperty("--delay", `${random(-18, 0)}s`);
    heart.style.setProperty("--rotate", `${random(-60, 60)}deg`);
    heartsLayer.append(heart);
  }
}

function burstHearts(originEl, count = 30) {
  const { left, top, width, height } = originEl.getBoundingClientRect();
  const cx = left + width / 2;
  const cy = top + height / 2;

  for (let i = 0; i < count; i++) {
    const heart = createHeart("burst");
    const angle = random(0, Math.PI * 2);
    const distance = random(120, 360);
    heart.style.left = `${cx}px`;
    heart.style.top = `${cy}px`;
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--size", `${random(1.8, 3.6)}rem`);
    heart.style.setProperty("--rotate", `${random(-90, 90)}deg`);
    heart.addEventListener("animationend", () => heart.remove());
    document.body.append(heart);
  }
}

function changeImage(src) {
  catImg.src = src;
  catImg.classList.remove("wiggle");
  void catImg.offsetWidth;
  catImg.classList.add("wiggle");
}

function handleNoClick() {
  noCount++;
  const index = Math.min(noCount, MAX_IMAGES);

  noButton.textContent = messages[Math.min(noCount, messages.length - 1)];
  subtitle.textContent = subtitles[Math.min(noCount, subtitles.length - 1)];

  const scale = Math.min(1 + noCount * 0.25, MAX_YES_SCALE);
  yesButton.style.setProperty("--scale", scale);

  changeImage(`cat-${index}.jpg`);

  if (noCount >= MAX_IMAGES) {
    noButton.classList.add("hidden");
  }
}

function handleYesClick() {
  title.textContent = "Yayyy!!";
  subtitle.textContent = "I knew you'd say yes! See you on the 14th";
  catImg.alt = "A happy cat surrounded by hearts";
  changeImage("cat-yes.jpg");
  buttons.classList.add("hidden");
  card.classList.add("celebrate");
  burstHearts(catImg);
}

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  spawnBackgroundHearts();
}
