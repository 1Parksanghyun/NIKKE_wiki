SearchingTag();
let TagValues = null;
LoadTagValue();
let SelectedTagValue = 0;

function SearchingNikke() {
    SelectedTagValue = 0;
    //console.log(TagValues);
    for (let index of document.getElementById('SelectedTags').children) {
        SelectedTagValue |= (1 << TagValues[index.dataset.name] % 32);
    }
    console.log(SelectedTagValue.toString(2));
}

async function LoadTagValue() {
    try {
        const res = await fetch('./Tags/TagValueList.json');
        TagValues = await res.json();
        console.log('성공');
    } catch (error) {
        console.log('ERROR:', error);
    }
}

function SearchingTag() {
    document.getElementById('SearchBar').addEventListener('input', (event) => {
        const Tag = document.querySelectorAll('.Tag');
        Tag.forEach((el) => {
            el.filtering(event.target.value);
        });
    })
}