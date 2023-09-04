'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Nav bar
const nav = document.querySelector('.nav');
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//MATH part

const calculate = document.querySelector('.calculate');
const resultSec = document.querySelector('.section--result');

//initiating a zero array of a specific size
const sizeX = 3,
  sizeY = 3;
var matrixA = math.zeros(sizeX, sizeY);
var totalMatrix = math.zeros(sizeX, 1);

//assigning values from form into the array
document.querySelector('.submit').addEventListener('click', function (e) {
  for (let i = 0; i < sizeX * sizeY; i++) {
    let tempVal = Number(document.getElementById(`val${i + 1}`).value);
    matrixA.subset(math.index(Math.trunc(i / 3), i % 3), tempVal);
  }
  for (let i = 0; i < sizeY; i++) {
    let tempVal = Number(document.getElementById(`total${i + 1}`).value);
    totalMatrix.subset(math.index(i, 0), tempVal);
  }
  calculate.classList.remove('hidden');

  resultSec.innerHTML = '<h1></h1>';
});

//finding the matrixB,the result matrix
document.querySelector('.calculate').addEventListener('click', function (e) {
  console.log(matrixA);
  console.log(totalMatrix);

  let matrixAInv = math.inv(matrixA);
  const matrixB = math.multiply(matrixAInv, totalMatrix);
  console.log(matrixB);

  resultSec.innerHTML = `<h1> The Toners in the bundle costs ${Math.trunc(
    math.subset(matrixB, math.index(0, 0))
  )} mmk for each. </h1>
  <h1> The Serums in the bundle costs ${Math.trunc(
    math.subset(matrixB, math.index(1, 0))
  )} mmk for each. </h1>
  <h1> The Masks in the bundle costs ${Math.trunc(
    math.subset(matrixB, math.index(2, 0))
  )} mmk for each. </h1>`;

  resultSec.scrollIntoView({ behavior: 'smooth' });
});
