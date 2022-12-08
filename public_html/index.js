const ulLists = document.getElementById("lists").children;

for (let i = 0; i < ulLists.length; i++){
    ulLists[i].addEventListener("mouseenter", function(){
        ulLists[i].getElementsByTagName("span")[0].classList.add("arrow");
    })

    ulLists[i].addEventListener("mouseleave" , function(){
        ulLists[i].getElementsByTagName("span")[0].classList.remove("arrow");
    })
}
