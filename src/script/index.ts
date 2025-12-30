import "../style/main.scss"; // Styles are loaded via js
import { addHeading } from "./addHeading";
import { skillElaborations } from "./constants";

let accordions: HTMLCollectionOf<Element> | null;
let cards: HTMLCollectionOf<Element> | null;

// Modal elements
let modal: HTMLElement | null;
let modalContentHeader: HTMLElement | null;
let modalContentBody: HTMLElement | null;
let modalContentLink: HTMLAnchorElement | null;

// Theme switcher elements
let themeSwitcherMenu: HTMLElement | null;
let themeSwitcherMenuButton: HTMLElement | null;
let themeSwitcher: HTMLElement | null;

const handleJobClick = (event: MouseEvent): any => {
  const element = event.currentTarget as HTMLElement;
  if (element) {
    const isOpening = !element.classList.contains("open");
    element.classList.toggle("open");

    // Rotate arrow when accordion opens/closes
    const arrow = element.querySelector(
      ".accordionList-accordion-arrow"
    ) as HTMLElement;
    if (arrow) {
      if (isOpening) {
        arrow.classList.add("open");
      } else {
        arrow.classList.remove("open");
      }
    }
  }
};

const handleModalOpen = (event: MouseEvent): any => {
  event.stopPropagation(); // Prevent event from bubbling to document click handler
  const cardElement = event.currentTarget as HTMLElement;
  const cardId = cardElement.id;

  // Transfer color class from card to modal header
  if (modalContentHeader) {
    modalContentHeader.classList.remove("green", "yellow", "blue");
    const titleColor = cardElement.getAttribute("data-titleColor");
    if (
      titleColor === "green" ||
      titleColor === "yellow" ||
      titleColor === "blue"
    ) {
      modalContentHeader.classList.add(titleColor);
    }
  }

  if (cardId && skillElaborations[cardId as keyof typeof skillElaborations]) {
    const skillData =
      skillElaborations[cardId as keyof typeof skillElaborations];
    const friendlyName = skillData.friendlyName;
    const elaboration = skillData.elaboration;
    const link = skillData.link;

    // Set friendlyName in modal header h3
    if (modalContentHeader) {
      const heading = modalContentHeader.querySelector("h3");
      if (heading) {
        heading.textContent = friendlyName;
      }
    }

    // Set elaboration in modal body
    if (modalContentBody) {
      const childElement = modalContentBody.firstElementChild as HTMLElement;
      if (childElement) {
        childElement.textContent = elaboration;
      }
    }

    if (modalContentLink) {
      if (link) {
        if (modalContentLink.hasChildNodes()) {
          modalContentLink.removeChild(modalContentLink.firstChild as Node);
        }
        const newLink = document.createElement("a");
        newLink.href = link;
        newLink.textContent = link;
        newLink.target = "_blank";
        newLink.rel = "noopener noreferrer";
        modalContentLink.appendChild(newLink);
      } else {
        modalContentLink.innerHTML = "";
      }
    }
  }

  if (modal) {
    const isOpening = !modal.classList.contains("open");
    modal.classList.toggle("open");

    // Prevent body scrolling when modal opens
    if (isOpening) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
};

const handleModalClose = (event: MouseEvent): any => {
  if (modal && modal.classList.contains("open")) {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
};

const handleThemeSwitcherClick = (event: MouseEvent): any => {
  event.stopPropagation(); // Prevent event from bubbling to document click handler
  const buttonElement = event.currentTarget as HTMLElement;
  const arrow = buttonElement.querySelector(".arrow") as HTMLElement;

  if (themeSwitcherMenu) {
    const isOpening = !themeSwitcherMenu.classList.contains("open");
    themeSwitcherMenu.classList.toggle("open");

    // Rotate arrow when menu opens/closes
    if (arrow) {
      if (isOpening) {
        arrow.classList.add("open");
      } else {
        arrow.classList.remove("open");
      }
    }
  }
};

const handleThemeButtonClick = (event: MouseEvent): any => {
  event.stopPropagation(); // Prevent event from bubbling to document click handler
  const buttonElement = event.currentTarget as HTMLElement;
  const buttonId = buttonElement.id;

  // Clear all classes on body
  document.body.className = "";

  // Apply appropriate theme class based on button ID
  if (buttonId === "lightMode") {
    document.body.classList.add("themes-lightMode");
  } else if (buttonId === "darkMode") {
    document.body.classList.add("themes-darkMode");
  } else if (buttonId === "purpleMode") {
    document.body.classList.add("themes-purpleMode");
  }

  // Close the menu and reset arrow rotation
  if (themeSwitcherMenu) {
    themeSwitcherMenu.classList.remove("open");
  }
  if (themeSwitcherMenuButton) {
    const arrow = themeSwitcherMenuButton.querySelector(
      ".arrow"
    ) as HTMLElement;
    if (arrow) {
      arrow.classList.remove("open");
    }
  }
};

const handleThemeMenuClose = (event: MouseEvent): any => {
  if (themeSwitcherMenu && themeSwitcherMenu.classList.contains("open")) {
    const target = event.target as HTMLElement;
    // Only close if clicking outside the theme switcher area
    if (target && themeSwitcher && !themeSwitcher.contains(target)) {
      themeSwitcherMenu.classList.remove("open");
      if (themeSwitcherMenuButton) {
        const arrow = themeSwitcherMenuButton.querySelector(
          ".arrow"
        ) as HTMLElement;
        if (arrow) {
          arrow.classList.remove("open");
        }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  // Select modal elements once
  modal = document.querySelector(".modal") as HTMLElement;
  modalContentHeader = document.querySelector(
    ".modal-content-header"
  ) as HTMLElement;
  modalContentBody = document.querySelector(
    ".modal-content-body"
  ) as HTMLElement;
  modalContentLink = document.querySelector(
    ".modal-content-link"
  ) as HTMLAnchorElement;

  // Select theme switcher elements once
  themeSwitcherMenu = document.querySelector(
    ".header-themeSwitcher-menu"
  ) as HTMLElement;
  themeSwitcherMenuButton = document.querySelector(
    ".header-themeSwitcher-menuButton"
  ) as HTMLElement;
  themeSwitcher = document.querySelector(
    ".header-themeSwitcher"
  ) as HTMLElement;

  accordions = document.getElementsByClassName("accordionList-accordion");
  if (accordions) {
    Array.from(accordions).forEach((el) => {
      el.addEventListener("click", (e: Event) => {
        handleJobClick(e as MouseEvent);
      });
    });
  }

  cards = document.getElementsByClassName("cardList-cardRow-card");
  if (cards) {
    Array.from(cards).forEach((el) => {
      el.addEventListener("click", (e: Event) => {
        handleModalOpen(e as MouseEvent);
      });
    });
  }

  // Close modal when clicking anywhere on the page
  document.addEventListener("click", (e: Event) => {
    handleModalClose(e as MouseEvent);
    handleThemeMenuClose(e as MouseEvent);
  });

  // Theme switcher menu button handler
  if (themeSwitcherMenuButton) {
    themeSwitcherMenuButton.addEventListener("click", (e: Event) => {
      handleThemeSwitcherClick(e as MouseEvent);
    });
  }

  // Theme switcher menu button handlers (light/dark mode)
  const themeButtons = document.getElementsByClassName(
    "header-themeSwitcher-menu-button"
  );
  if (themeButtons) {
    Array.from(themeButtons).forEach((el) => {
      el.addEventListener("click", (e: Event) => {
        handleThemeButtonClick(e as MouseEvent);
      });
    });
  }
});
