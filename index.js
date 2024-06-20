const init = () => {
  eventHandlers();

  setInterval(() => {
    cardHandler();
  }, 1);

  setTimeout(() => {
    autoFill();
  }, 1000);

  const save = document.querySelector(".saveImage");
  save.addEventListener("click", () => {
    generate();
  });
};

const eventHandlers = () => {
  const cleanQuote = document.querySelector(".cleanQuote");
  const cleanAuthor = document.querySelector(".cleanAuthor");

  const content = document.querySelector(".quote-content");
  const author = document.querySelector(".quote-author span");

  cleanQuote.addEventListener("click", () => {
    content.innerHTML = "";
  });
  cleanAuthor.addEventListener("click", () => {
    author.innerHTML = "Touch ID";
  });
}

const cardHandler = () => {
  const content = document.querySelector(".quote-content");
  const author = document.querySelector(".quote-author span");
  const countContainer = document.querySelector(".words-count");
  const count = content.textContent.length,
    countAuthor = author.textContent.length;
  const maxCount = 180,
    maxCountAuthor = 30;

  const cleanQuote = document.querySelector(".cleanQuote");
  const cleanAuthor = document.querySelector(".cleanAuthor");

  if (count >= maxCount) {
    content.setAttribute('contenteditable', "false");
    cleanQuote.classList.remove("hidden");
  } else {
    content.setAttribute('contenteditable', "true");
    cleanQuote.classList.add("hidden");
  }

  if (countAuthor >= maxCountAuthor) {
    author.setAttribute('contenteditable', "false");
    cleanAuthor.classList.remove("hidden");
  } else {
    author.setAttribute('contenteditable', "true");
    cleanAuthor.classList.add("hidden");
  }

  count === 0
    ? content.classList.add("empty")
    : content.classList.remove("empty");

  countContainer.innerHTML = `${count}/${maxCount}`;
};

const generate = () => {
  const card = document.querySelector(".card");
  const save = document.querySelector(".saveImage");
  const wordsCountContainer = document.querySelector(".words-count");
  const author = document.querySelector(".quote-author span").textContent;

  let div = document.querySelector(".wrapper");
  card.classList.toggle("animate");

  const cleanQuote = document.querySelector(".cleanQuote");
  const cleanAuthor = document.querySelector(".cleanAuthor");

  save.style.visibility = "hidden";
  wordsCountContainer.style.visibility = "hidden";
  cleanQuote.classList.add("hidden");
  cleanAuthor.classList.add("hidden");

  html2canvas(div, {
    logging: true,
    useCORS: true,
    allowTaint: true,
    width: 600,
    height: 350,
    scrollX: 0,
    scrollY: 0,
    x: 820,
    y: 250,
    removeContainer: true,
    backgroundColor: "transparent",
  })
    .then((canvas) => {
      var t = canvas.toDataURL().replace("data:image/png;base64,", "");

      downloadBase64File(
        "image/png",
        t,
        `quote${new Date().getTime()}${author}`
      );
    })
    .catch((err) => console.error(err));

  save.style.visibility = "visible";
  wordsCountContainer.style.visibility = "visible";
  card.classList.toggle("animate");
};

const downloadBase64File = (contentType, base64Data, fileName) => {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};


const autoFill = () => {
  const text = `<p>I am the Best.</p>
<p>Don't ask me why I am the Best.</p>
<p>I am the Best because I need to Be.</p>`;

const len =  text.length;
let i = 0;

let interval = setInterval(()=> {
  (i == len) ? clearInterval(interval) : null;
  const content = document.querySelector(".quote-content");
  content.innerHTML = text.substring(0, i);
  ++i;
}, 100);
}