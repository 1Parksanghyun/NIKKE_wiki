fetch('./Tags/TagNameList.json')
    .then(res => res.json())
    .then(data => {
        for (let [TagName, TagCode] of Object.entries(data)) {

            const Tag = document.createElement('button');
            Tag.className = 'Tag';
            Tag.innerText = `${TagName}`;
            Tag.dataset.name = `${TagCode}`;
            Tag.onclick = () => SelectTag(TagName, TagCode);

            document.getElementById('TagList').appendChild(Tag);
        }
    })