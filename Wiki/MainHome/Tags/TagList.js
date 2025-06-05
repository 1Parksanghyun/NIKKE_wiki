fetch('./Tags/TagNameList.json')
    .then(res => res.json())
    .then(data => {
        for (let [TagName, TagCode] of Object.entries(data)) {
            console.log(TagName, TagCode);

            document.getElementById('TagList').appendChild(
                Object.assign(document.createElement('button'), {
                    class: 'Tag',
                    innerText: `${TagName}`
                }))
        }
    })