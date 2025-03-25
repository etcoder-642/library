const overlay = document.querySelector('.overlay');
const displaybox = document.querySelector('.displaybox');

document.querySelector('.btn').addEventListener('click', ()=>{
    overlay.style.display = 'block';
    displaybox.style.display = 'flex';
})