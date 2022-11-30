const auth = "563492ad6f9170000100000127925cfb0dec4dbaaf34906f295dce9e";
const gallery = document.querySelector(".gallery");
const searchInputs = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

searchInputs.addEventListener("input", updateInput);

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  currentSearch = searchValue;

  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
  //   console.log(searchValue);
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}"></img>
        `;
    gallery.appendChild(galleryImage);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  console.log(query);
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInputs.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();
