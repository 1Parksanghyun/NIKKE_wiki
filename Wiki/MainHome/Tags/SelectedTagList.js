function SelectTag(SelectedTagName, SelectedTagCode) {
    fetch('./Tags/TagValueList.json')
        .then(res => res.json())
        .then(data => {
            console.log(SelectedTagName, SelectedTagCode);

            const SelectedTag = document.createElement('button');
            SelectedTag.className = 'SelectedTag';
            SelectedTag.innerText = SelectedTagName;
            SelectedTag.dataset.name = SelectedTagCode;
            SelectedTag.onclick = () => {
                document.getElementById('SelectedTagList').removeChild(SelectedTag);
            }

            document.getElementById('SelectedTagList').appendChild(SelectedTag);
        })

}