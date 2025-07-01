SearchingTag();
let TagValues = null;
LoadTagValue();
let SelectedTagsValue = new Uint32Array(3);

function SearchingNikke() {
    for (let index = 0; index < SelectedTagsValue.length; index++) {
        SelectedTagsValue[index] = 0;
    }
    //console.log(TagValues);
    for (let index of document.getElementById('SelectedTags').children) {
        ClassifyTagValue(TagValues[index.dataset.name], Math.floor(TagValues[index.dataset.name] / 32));
    }
    //console.log('1번', SelectedTagsValue[0].toString(2), '2번', SelectedTagsValue[1].toString(2), '3번', SelectedTagsValue[2].toString(2));
    const Nikkeinfo = document.querySelectorAll('.NikkeInfo');
    Nikkeinfo.forEach((ele) => {
        ele.filtering(SelectedTagsValue);
    })
    //console.log(SelectedTagValue.toString(2));
}

function ResetList(params) {
    document.querySelectorAll('.NikkeInfo').forEach((el) => {
        el.style.display = 'flex';
    })
}

async function LoadTagValue() {
    try {
        const res = await fetch('./Tags/TagValueList.json');
        TagValues = await res.json();
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

function ClassifyTagValue(TagValue, TagType) {
    SelectedTagsValue[TagType] |= (1 << TagValue % 32);
}

function Texte() {
    const input = document.getElementById('SearchBar').value;

    const output = input
        .replace(/<br\s*\/?>/gi, '\\n') // <br>을 줄바꿈 문자 그대로인 \n 문자열로
        .replace(/<(?!br\s*\/?>)[^>]+>/gi, '') // <br> 외 태그 제거
        .replace(/&nbsp;/gi, ' ')

    console.log(output);

}