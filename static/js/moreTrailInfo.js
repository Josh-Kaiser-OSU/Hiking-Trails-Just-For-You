let expandBtn = document.getElementsByClassName('expandButton');
for (let i = 0; i < expandBtn.length; i++){
    let hiddenDiv = expandBtn[i].nextElementSibling;
    expandBtn[i].addEventListener("click", ()=>{
        if (hiddenDiv.style.visibility.localeCompare('visible') === 0){
            hiddenDiv.style.visibility = 'hidden';
        } else {
            hiddenDiv.style.visibility = 'visible';
        }
    });
}
