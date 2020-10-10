class Infobox{
    constructor(items, parentNode){
        this.last = items.length-1;
        
        const container = document.createElement("div");
        container.className = "infobox-container";

        const slider = document.createElement("div");
        slider.className = "infobox-slider";

        this.elements = items.map(item => {
            const el = document.createElement("div");
            el.className = "infobox-item";
            el.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="infobox-item-text">
                <h2>${item.title}</h2>
                <p class="collapsible collapsed" onclick="this.classList.toggle('collapsed')">${item.description}</p>
                <button class="toggle" onclick="toggleCollapsible(this.previousElementSibling);">Toggle</button>
            </div>`
            return slider.appendChild(el);
        })
        this.elements[0].style.opacity = 1;
        this.elements[0].style["z-index"] = 1;


        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "infobox-buttons";

        const buttonFirst = document.createElement("button");
        buttonFirst.innerText = "<<<";
        buttonFirst.onclick = this.showFirstItem.bind(this);
        const buttonPrevious = document.createElement("button");
        buttonPrevious.innerText = "<";
        buttonPrevious.onclick = this.showPreviousItem.bind(this);
        const buttonNext = document.createElement("button");
        buttonNext.innerText = ">";
        buttonNext.onclick = this.showNextItem.bind(this);
        const buttonLast = document.createElement("button");
        buttonLast.innerText = ">>>";
        buttonLast.onclick = this.showLastItem.bind(this);

        buttonsContainer.append(buttonFirst, buttonPrevious, buttonNext, buttonLast);
        container.append(slider, buttonsContainer);

        parentNode.append(container);
    }

    current = 0;

    showFirstItem(){
        this.showItem(0);
    }
    showPreviousItem(){
        this.showItem(this.current > 0 ? this.current - 1 : this.last);
    }
    showNextItem(){
        this.showItem(this.current < this.last ? this.current + 1 : 0);
    }
    showLastItem(){
        this.showItem(this.last);
    }

    showItem(newItem){
        this.elements[this.current].style.opacity = 0;
        this.elements[this.current].style["z-index"] = 0;
        this.elements[newItem].style.opacity = 1;
        this.elements[newItem].style["z-index"] = 1;
        this.current = newItem;
    }

}

function toggleCollapsible(el){
    if (el.classList.contains("collapsed")){
        if(!el.style["min-height"]){
            el.style.height = el.style["min-height"] = el.scrollHeight + "px";
        }
        el.classList.remove("collapsed");
        el.style["white-space"] = "normal";
        el.style.height = el.scrollHeight + "px";
    }else{
        el.style.height = el.style["min-height"];
        setTimeout(collapse, 2000);
    }
    function collapse(){
        el.style["white-space"] = "nowrap";
        el.classList.add("collapsed");
    }
}