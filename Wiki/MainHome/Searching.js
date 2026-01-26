/* "태그 검색의 원리"
1. 스킬태그는 각각의 고유의 값 'n(>=0)'을 가짐.
2. n은 32bit 메모리에서 n번째 자리를 의미한다.
3. n은 /32 (소수점 버림) 연산을 시행하여 태그가 동일 메모리의 자리를 점유하지 않도록 방지
4. 선택된 태그가 있을 경우 1, 없을 경우 0 으로 바이너리 값을 생성.
5. NikkeList.json 에 저장된 각 니케의 tagvalue 값과 비교.
6. 생성된 바이너리 값이 포함될 경우 목록에 표시, 아닐 경우 숨김 처리된다.
*/

let SelectedTagsValue = new Uint32Array(3);
let TagValues = null;
let ConditionList = null;
let EffectList = null;
let SelectedAttributes = {
    "manufacturer": new Set(),
    "class": new Set(),
    "weapon": new Set(),
    "type": new Set(),
    "burst": new Set(),
    "rarity": new Set(),
};
const NikkeList = document.getElementById('NikkeList').childNodes;
NameSearch();
SearchingTag();
LoadCondition();
LoadEffect();

/**검색창에 입력된 태그에 따라 니케 목록을 필터링 하는 함수 */
function SearchingNikke() {
    const SelectedCards = document.getElementById("SelectedTags").childNodes;
    var replica = Array.from(NikkeList);
    SelectedCards.forEach((card) => {
        const toRemove = new Set();
        replica.forEach((nikke) => {
            nikke.style.display = "none";
            if (card.childNodes[0].childNodes[1].value == "조건 없이 검색") {
                var isRemoved = 1
                for (const effectname of Object.values(nikke.tags)) {
                    if (card.childNodes[1].childNodes[1].value in effectname) {
                        nikke.style.display = "flex";
                        isRemoved = 0
                        break;
                    }
                }
                if (isRemoved) { toRemove.add(nikke) }
            } else if (card.childNodes[1].childNodes[1].value == "효과 없이 검색") {
                var isRemoved = 1
                for (const effectname of Object.keys(nikke.tags)) {
                    if (effectname == card.childNodes[0].childNodes[1].value) {
                        nikke.style.display = "flex";
                        isRemoved = 0
                        break;
                    }
                    if (isRemoved) { toRemove.add(nikke) }
                }
            } else if (nikke.tags?.[card.childNodes[0].childNodes[1].value]?.[card.childNodes[1].childNodes[1].value]) {
                nikke.style.display = "flex";
            } else {
                toRemove.add(nikke)
            }
        })
        replica = replica.filter(nikke => !toRemove.has(nikke));
    })
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
                if (NikkeList[index].name == 'RedHood' && key == 'burst') {
                    if (NikkeList[index].style.display != 'none' && SelectedAttributes[key].size != 0)
                        pass = 0
                } else if (NikkeList[index].style.display != 'none' && NikkeList[index].dataset[key] == value) {
                    pass = 0
                }
            }
            if (pass)
                NikkeList[index].style.display = 'none'
        }
    }
}

function NameSearch() {
    const input = document.getElementById("NikkeSearch");
    input.addEventListener("keydown", function (k) {
        if (k.key == "Enter") {
            filteringByName(input.value)
        }
    })
}

async function filteringByName(InputName) {
    if (InputName == "") {
        NikkeList.forEach((card) => {
            card.style.display = 'flex';
        })
    }
    await fetch('./SearchName.json').then((res) => {
        res.json().then((NameList) => {
            const JsonName = NameList[InputName];
            NikkeList.forEach((card) => {
                if (JsonName.includes(card.name)) {
                    card.style.display = 'flex'
                    return;
                }
                card.style.display = 'none'
            })
        })
    })
}

function conditionSearching() {

}

function createSearchCard(condition = "조건 없이 검색", effect = "효과 없이 검색") {
    const card = document.createElement("div");
    card.className = "Tagcard"
    card.appendChild(ConditionList.cloneNode(true))
    card.appendChild(EffectList.cloneNode(true))
    card.appendChild(Object.assign(document.createElement("button"), {
        onclick: () => { card.remove() }
    }))
    card.querySelector("#selectCondition").value = condition;
    card.querySelector("#selectEffect").value = effect;
    document.getElementById("SelectedTags").appendChild(card);
}

function addCondition() {
    const condition = document.createElement("div");
    condition.id = "condition"
    condition.innerText = "조건"
    condition.appendChild(Object.assign(document.createElement("select"), {
        id: 'selectCondition'
    }))
    return condition
}

function addEffect() {
    const effect = document.createElement("div");
    effect.id = "effect"
    effect.innerText = "효과"
    effect.appendChild(Object.assign(document.createElement("select"), {
        id: 'selectEffect'
    }))

    return effect
}
async function LoadCondition() {
    await fetch('./Tags/ConditionName.json').then((res) => {
        res.json().then((conditioname) => {
            const select = addCondition();
            const list = select.querySelector('#selectCondition');
            conditioname.forEach(name => {
                list.appendChild(Object.assign(document.createElement('option'), {
                    value: `${name}`,
                    innerText: `${name}`
                }))
            })
            ConditionList = select;
        })
    })
}

async function LoadEffect() {
    await fetch('./Tags/TagNameList.json').then((res) => {
        res.json().then((effectname) => {
            const select = addEffect();
            const list = select.querySelector('#selectEffect');
            Object.values(effectname).forEach(namelist => {
                namelist.forEach(name => {
                    list.appendChild(Object.assign(document.createElement('option'), {
                        value: `${name}`,
                        innerText: `${name}`
                    }))
                })
            })
            EffectList = select;
        })
    })
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