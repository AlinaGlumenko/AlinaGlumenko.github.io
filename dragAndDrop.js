const handleDrop = (item) => {
    item.target.classList.remove('drag-sort-active');
    updateTasksArr();
}

const handleDrag = (item) => {
    const selectedItem = item.target,
        list = selectedItem.parentNode,
        x = event.clientX,
        y = event.clientY;

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

const enableDragItem = (item) => {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

const enableDragList = (list) => {
    Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
}
  
const enableDragSort = (listClass) => {
    const sortableLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
}
