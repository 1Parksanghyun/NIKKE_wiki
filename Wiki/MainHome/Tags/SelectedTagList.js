/**태그를 선택하는 함수 */
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
/**선택한 태그가 이미 선택되었는지 검사하는 함수 */
function IsSelected(SelectedTagCode) {
    for (let index of document.getElementById('SelectedTags').children) {
        if (SelectedTagCode == index.dataset.name) return 0;
    }
    return 1;
}