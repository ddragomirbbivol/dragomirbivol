document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".grid-item img");
  const gridItems = document.querySelectorAll(".grid-item");
  const hoverContainer = document.getElementById("hoverContainer");
  // const hoverNumber = document.getElementById("hoverNumber");
  const hoverTitle = document.getElementById("hoverTitle");
  const hoverDescription = document.getElementById("hoverDescription");
  const textBlock = document.querySelector(".text");
  const hoverImageBlock = document.querySelector(".hover-image-block");
  const hoverTextBlock = document.querySelector(".hover-text-block");
  const mainContent = document.querySelector(".main-content");

  const closeBtn = document.createElement("div");
  closeBtn.textContent = "[close]";
  closeBtn.classList.add("close-button");
  hoverTextBlock.insertAdjacentElement("afterend", closeBtn);

  let currentOpen = null;
  let isTransitioning = false;

  function showHoverContainer(callback) {

    setTimeout(() => {
          hoverContainer.classList.add("visible");
    hoverContainer.style.zIndex = "10";
      callback?.();
    }, 1000); // Match opacity transition time
  }

  function hideHoverContainer(callback) {
    hoverContainer.classList.remove("visible");
    setTimeout(() => {
      hoverContainer.style.zIndex = "-1";
      callback?.();
    }, 1000); // Wait for fade-out before hiding
  }

  function updateContent(img) {
    const parentItem = img.closest(".grid-item");

    // Skip if already open
    if (currentOpen === parentItem || isTransitioning) return;
    isTransitioning = true;

    // 👉 Trigger main content slide down immediately
    mainContent?.classList.add("slide-down");

    const changeContent = () => {
      gridItems.forEach((item) => item.classList.remove("scaled"));
      parentItem.classList.add("scaled");

      // Clear existing images
      hoverImageBlock.innerHTML = "";
      const imageColumn = document.createElement("div");
      imageColumn.classList.add("hover-image-column");

      const imageList = (img.dataset.images || img.src).split(",");
      imageList.forEach((src) => {
        const image = document.createElement("img");
        image.src = src.trim(); 
        image.classList.add("hover-image");
        imageColumn.appendChild(image);
      });
      hoverImageBlock.appendChild(imageColumn);

      // hoverNumber.textContent = img.dataset.number || "";
      hoverTitle.textContent = img.dataset.title || "";
      hoverDescription.textContent = img.dataset.description || "";
      currentOpen = parentItem;
      isTransitioning = false;
    };

    if (hoverContainer.classList.contains("visible")) {
      hoverContainer.classList.remove("visible");
      setTimeout(() => {
        changeContent();
        hoverContainer.classList.add("visible");
      }, 1000);
    } else {
      textBlock?.classList.add("hidden");
      showHoverContainer(changeContent);
    }
  }

  images.forEach((img) => {
    img.addEventListener("click", () => updateContent(img));
  });

  closeBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;

    hideHoverContainer(() => {
      textBlock?.classList.remove("hidden");
      gridItems.forEach((item) => item.classList.remove("scaled"));
      hoverImageBlock.innerHTML = "";
      // hoverNumber.textContent = "";
      hoverTitle.textContent = "";
      hoverDescription.textContent = "";
      currentOpen = null;
      isTransitioning = false;

      // 👉 Optional: scroll mainContent back up on close
      mainContent?.classList.remove("slide-down");
    });
  });
});
