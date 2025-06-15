let TagValues = null;
LoadTagValue();
let SelectedTagValue = 0;

function SearchingTag() {
    //console.log(TagValues);
    for (let index of document.getElementById('SelectedTags').children) {
        SelectedTagValue |= (1 << TagValues[index.dataset.name]);
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