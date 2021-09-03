const radioGroups = document.querySelectorAll('.radio-group') || []
radioGroups.forEach(radioGroup => {
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  radioGroup.prepend(bullet);
  let checked = radioGroup.querySelector('input:checked + label');
  bullet.style.top = checked.offsetTop + 'px';
  let options = radioGroup.querySelectorAll('label');
  options.forEach(option =>{
    option.addEventListener('click', (e)=>{
      bullet.style.top = e.target.offsetTop + 'px';
    })
  })
})
