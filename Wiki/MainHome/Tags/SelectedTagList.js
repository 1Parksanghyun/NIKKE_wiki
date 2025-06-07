function SelectTag(SelectedTagName, SelectedTagCode) {

    if (IsSelected(SelectedTagCode)) {
        const SelectedTag = document.createElement('button');
        SelectedTag.className = 'SelectedTag';
        SelectedTag.innerText = SelectedTagName;
        SelectedTag.dataset.name = SelectedTagCode;
        SelectedTag.onclick = () => {
            document.getElementById('SelectedTags').removeChild(SelectedTag);
        }
        document.getElementById('SelectedTags').appendChild(SelectedTag);
    }

}

function IsSelected(SelectedTagCode) {
    for (let index of document.getElementById('SelectedTags').children) {
        if (SelectedTagCode == index.dataset.name) return 0;
    }
    return 1;
}