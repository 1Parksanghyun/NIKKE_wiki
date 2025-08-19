/* "태그 검색의 원리"
1. 스킬태그는 각각의 고유의 값 'n(>=0)'을 가짐.
2. n은 32bit 메모리에서 n번째 자리를 의미한다.
3. n은 /32 (소수점 버림) 연산을 시행하여 태그가 동일 메모리의 자리를 점유하지 않도록 방지
4. 선택된 태그가 있을 경우 1, 없을 경우 0 으로 바이너리 값을 생성.
5. NikkeList.json 에 저장된 각 니케의 tagvalue 값과 비교.
6. 생성된 바이너리 값이 포함될 경우 목록에 표시, 아닐 경우 숨김 처리된다.
*/


SearchingTag();
let TagValues = null;
LoadTagValue();
let SelectedTagsValue = new Uint32Array(3);
let SelectedAttributes = {
    "manufacturer": new Set(),
    "class": new Set(),
    "weapon": new Set(),
    "type": new Set(),
    "burst": new Set(),
    "rarity": new Set(),
};
let NikkeList;

/**검색창에 입력된 태그에 따라 니케 목록을 필터링 하는 함수 */
function SearchingNikke() {
    //이전에 입력된 선택된 태그값 초기화
    for (let index = 0; index < SelectedTagsValue.length; index++) {
        SelectedTagsValue[index] = 0;
    }
    //
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

function Search() {
    if (!NikkeList) {
        NikkeList = document.getElementById('NikkeList').childNodes
    }
    ResetList()
    SearchingNikke()
    AttributeSearch()
}

/**필터링 된 니케 목록을 초기화 하는 함수.*/
function ResetList() {
    document.querySelectorAll('.NikkeInfo').forEach((el) => {
        el.style.display = 'flex';
    })
}

/**TagValueList.json 파일로 부터 "효과코드": "효과 값"을 불러오는 함수.*/
async function LoadTagValue() {
    try {
        const res = await fetch('./Tags/TagValueList.json');
        TagValues = await res.json();
    } catch (error) {
        console.log('ERROR:', error);
    }
}

/**사용자가 입력한 태그 이름에 따라 태그 목록이 필터링 되는 함수 */
function SearchingTag() {
    document.getElementById('SearchBar').addEventListener('input', (event) => {
        const Tag = document.querySelectorAll('.Tag');
        Tag.forEach((el) => {
            el.filtering(event.target.value);
        });
    })
}

/**태그가 서로 동일한 메모리 자리를 점유하지 않도록 방지하는 함수 */
function ClassifyTagValue(TagValue, TagType) {
    SelectedTagsValue[TagType] |= (1 << TagValue % 32);
}

function AttributeChanged(attribute, Ischecked, attributetype) {
    if (!NikkeList) {
        NikkeList = document.getElementById('NikkeList').childNodes
    }
    if (Ischecked)
        SelectedAttributes[attributetype].add(attribute)
    else
        SelectedAttributes[attributetype].delete(attribute)
    ResetList()
    AttributeSearch()
    SearchingNikke()
}

function AttributeSearch() {
    for (let index = 0; index < NikkeList.length; index++) {
        for (let key in SelectedAttributes) {
            if (SelectedAttributes[key].size == 0)
                continue;
            let pass = 1
            for (let value of SelectedAttributes[key]) {
                if (NikkeList[index].style.display != 'none' && NikkeList[index].dataset[key] == value) {
                    pass = 0
                }
            }
            if (pass)
                NikkeList[index].style.display = 'none'
        }
    }
}

/**(임시) 스킬텍스트 가공*/
function Texte() {
    let CodeArr = [];
    let TagValue = new Uint32Array(3);
    const input = document.getElementById('SearchBar').value;
    const output = input
        .replace(/ {13}/g, '')
        .replace(/"/g, '') // <br> 외 태그 제거

    const arrOutput = output.split(",")
    console.log(arrOutput)

    fetch('./Tags/TagNameList.json')
        .then(res => res.json())
        .then(data => {
            for (let index = 0; index < arrOutput.length; index++) {
                CodeArr.push(data[arrOutput[index]])

            }
            console.log(CodeArr)
            fetch('./Tags/TagValueList.json')
                .then(res => res.json())
                .then(data1 => {
                    for (let index = 0; index < CodeArr.length; index++) {
                        console.log(data1[CodeArr[index]])
                        if (data1[CodeArr[index]] < 32) {
                            TagValue[0] |= (1 << data1[CodeArr[index]])
                        } else if (data1[CodeArr[index]] < 64) {
                            TagValue[1] |= (1 << data1[CodeArr[index]])
                        } else
                            TagValue[2] |= (1 << data1[CodeArr[index]])
                    }
                    console.log(TagValue[0], TagValue[1], TagValue[2])
                })
        })

}

function Texte2() {
    const input = document.getElementById('SearchBar').value;
    const output = input
        .replace(/<br[^>]*>/gi, '\\n') // <br>을 줄바꿈 문자 그대로인 \n 문자열로
        .replace(/<(?!br\s*\/?>)[^>]+>/gi, '') // <br> 외 태그 제거
        .replace(/&nbsp;/gi, ' ')

    console.log(output)
}