fetch('./NikkeList.json')
    .then(res => res.json())
    .then(data => data.forEach(char => {
        //프로필 카드 생성
        const card = document.createElement("button");
        card.className = 'NikkeInfo';
        card.style.backgroundImage = `url('NikkeCard/NikkeCardImg/Company/${char.company}.png')`
        card.dataset.name = char.dataname;
        card.dataset.tagvalue1 = (char.tagvalue1).toString(2);
        card.dataset.tagvalue2 = (char.tagvalue2).toString(2);
        card.dataset.tagvalue3 = (char.tagvalue3).toString(2);
        card.filtering = function (comparisonValue) {
            for (let i = 0; i < comparisonValue.length; i++) {
                if (comparisonValue[i] != 0) {
                    card.style.display = 'flex';
                    if (isTagvalue(card.dataset, i)) {
                        let comparisonBinary = reverseString(comparisonValue[i].toString(2));
                        let tagvalueBinary = whatTagvalue(card.dataset, i);
                        //console.log('비교값:', comparisonBinary, '니케값:', tagvalueBinary, '니케이름:', card.dataset.name);
                        for (let index = 0; index < comparisonBinary.length; index++) {
                            //console.log('횟수:', index);
                            if (comparisonBinary[index] != 0 && tagvalueBinary[index] != 1) {
                                //console.log('비교값:', comparisonBinary[index], '니케값:', tagvalueBinary[index]);
                                card.style.display = 'none';
                                return;
                            }
                        }
                    } else {
                        card.style.display = 'none';
                    }
                }
            }
        }
        //클릭시 함수 실행(NikkeInfo.js)
        card.onclick = () => AllocateDataname(card);
        InsertNikkeImg(card, `NikkeCard/NikkeCardImg/Nikke/${char.dataname}.png`);
        const addeddiv = card.appendChild(Object.assign(document.createElement("div"), {
            id: 'NameAndTag'
        }));
        InsertNikkeName(addeddiv, char.name);
        InsertNikkeTags(addeddiv, char.tags);
        InsertNikkeMarks(card, char);
        //프로필 카드 삽입
        document.getElementById("NikkeList").appendChild(card);
    }))

function InsertNikkeImg(card, data) {
    const NikkeImg = document.createElement("img");
    NikkeImg.src = data;
    NikkeImg.classList.add("ProfileImg");
    card.appendChild(NikkeImg);
}

function InsertNikkeName(addeddiv, data) {
    const NikkeName = document.createElement("p");
    NikkeName.className = 'NikkeName';
    NikkeName.textContent = data;
    addeddiv.appendChild(NikkeName);
}
function InsertNikkeTags(addeddiv, data) {
    const NikkeTags = document.createElement("div");
    NikkeTags.className = 'NikkeTags';
    for (let index = 0; index < data.length; index++) {
        const Tag = document.createElement("p");
        Tag.className = 'NikkeTag'
        Tag.textContent = data[index];
        NikkeTags.appendChild(Tag);
    }
    addeddiv.appendChild(NikkeTags);
}
function InsertNikkeMarks(card, data) {
    const NikkeMarks = document.createElement("div");
    NikkeMarks.className = 'NikkeMarks';
    InsertMarkdiv1(NikkeMarks, data)
    InsertMarkdiv2(NikkeMarks, data)
    card.appendChild(NikkeMarks);
}
function InsertMarkdiv1(NikkeMarks, data) {
    //마크 구역1(무기,클래스) 생성
    const Marksdiv1 = document.createElement("div");
    Marksdiv1.className = 'Marksdiv1';
    //무기 마크 삽입
    const WeaponMark = document.createElement("img");
    WeaponMark.src = `NikkeCard/NikkeCardImg/Weapon/${data.weapon}.png`;
    WeaponMark.classList.add("WeaponImg");
    Marksdiv1.appendChild(WeaponMark);
    //클래스 마크 삽입
    const ClassMark = document.createElement("img");
    ClassMark.src = `NikkeCard/NikkeCardImg/Class/${data.class}.png`;
    ClassMark.classList.add("ClassImg");
    Marksdiv1.appendChild(ClassMark);
    //마크 구역1 삽입
    NikkeMarks.appendChild(Marksdiv1);
}
function InsertMarkdiv2(NikkeMarks, data) {
    //마크 구역2 생성
    const Marksdiv2 = document.createElement("div");
    Marksdiv2.className = 'Marksdiv2';
    //속성 마크 삽입
    const TypeMark = document.createElement("img");
    TypeMark.src = `NikkeCard/NikkeCardImg/Type/${data.type}.png`;
    TypeMark.classList.add("TypeImg");
    Marksdiv2.appendChild(TypeMark);
    //버스트 마크 삽입
    const BurstMark = document.createElement("img");
    BurstMark.src = `NikkeCard/NikkeCardImg/Burst/${data.burst}.png`;
    BurstMark.classList.add("BurstImg");
    Marksdiv2.appendChild(BurstMark);
    //마크 구역2 삽입
    NikkeMarks.appendChild(Marksdiv2);

}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function isTagvalue(card, valueType) {
    if (valueType == 0)
        return card.tagvalue1 != 0;
    else if (valueType == 1)
        return card.tagvalue2 != 0;
    else
        return card.tagvalue3 != 0;
}

function whatTagvalue(card, valueType) {
    if (valueType == 0)
        return reverseString(card.tagvalue1.toString(2));
    else if (valueType == 1)
        return reverseString(card.tagvalue2.toString(2));
    else
        return reverseString(card.tagvalue3.toString(2));
}