fetch('./Tags/TagNameList.json')
    .then(res => res.json())
    .then(data => {
        for (let [TagName, TagCode] of Object.entries(data)) {

            const Tag = document.createElement('button');
            Tag.className = 'Tag';
            Tag.innerText = `${TagName}`;
            Tag.dataset.name = `${TagCode}`;
            Tag.onclick = () => SelectTag(TagName, TagCode);
            Tag.filtering = function (inputstring) {
                if (inputstring == "" || Tag.innerText.includes(inputstring)) {
                    Tag.hidden = false;
                } else {
                    Tag.hidden = true;
                }
            }

            document.getElementById('TagList').appendChild(Tag);
        }
    })