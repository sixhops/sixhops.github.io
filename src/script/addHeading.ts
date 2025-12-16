export const addHeading = () => {
  let heading = document.createElement("h1");
  heading.classList.add("main-heading");
  heading.innerText = "This is the homie page!";
  document.body.insertAdjacentElement("afterbegin", heading);
};
