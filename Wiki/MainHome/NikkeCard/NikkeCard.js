let timer;

fetch('./NikkeList.json')
    .then(res => res.json())
    .then(data => data.forEach(char => {
        //프로필 카드 생성
        const card = document.createElement("button");
        card.className = 'NikkeInfo';
        card.style.backgroundImage = `url('NikkeCard/NikkeCardImg/Company/${char.company}.webp')`
        card.name = char.dataname;
        card.dataset.tagvalue1 = (char.tagvalue1).toString(2);
        card.dataset.tagvalue2 = (char.tagvalue2).toString(2);
        card.dataset.tagvalue3 = (char.tagvalue3).toString(2);
        card.dataset.manufacturer = char.company;
        card.dataset.class = char.class;
        card.dataset.weapon = char.weapon;
        card.dataset.type = char.type;
        card.dataset.burst = char.burst;
        card.dataset.rarity = char.tier;
        card.filtering = function (comparisonValue) {
            for (let i = 0; i < comparisonValue.length; i++) {
                if (comparisonValue[i] != 0) {
                    if (isTagvalue(card.dataset, i)) {
                        let comparisonBinary = reverseString(comparisonValue[i].toString(2));
                        let tagvalueBinary = whatTagvalue(card.dataset, i);
                        ////console.log('비교값:', comparisonBinary, '니케값:', tagvalueBinary, '니케이름:', card.dataset.name);
                        for (let index = 0; index < comparisonBinary.length; index++) {
                            ////console.log('횟수:', index);
                            if (comparisonBinary[index] != 0 && tagvalueBinary[index] != 1) {
                                ////console.log('비교값:', comparisonBinary[index], '니케값:', tagvalueBinary[index]);
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
        InsertNikkeImg(card, `NikkeCard/NikkeCardImg/Nikke/${char.dataname}.webp`);
        const addeddiv = card.appendChild(Object.assign(document.createElement("div"), {
            id: 'NameAndTag'
        }));
        InsertNikkeName(addeddiv, char.name);
        InsertNikkeTags(addeddiv, char.tags);
        InsertNikkeMarks(card, char);
        //프로필 카드 삽입
        document.getElementById("NikkeList").appendChild(card);
    }))
    .then(() => fetch('./NikkeTreasure.json')
        .then(res => res.json()).then(NikkeData => {
            const TreasureNikkeName = Object.keys(NikkeData)
            const TreasureNikkeValue = Object.values(NikkeData)
            for (let index = TreasureNikkeName.length - 1; index >= 0; index--) {
                const NikkeCard = document.getElementsByName(TreasureNikkeName[index])
                //console.log('애장품:', document.getElementsByName(TreasureNikkeName[index]), index)
                InsertTreasureNikkeTags(NikkeCard, TreasureNikkeValue[index].tags)
                NikkeCard[0].dataset.tagvalue1 = (parseInt(NikkeCard[0].dataset.tagvalue1, 2) + TreasureNikkeValue[index].tagvalue1).toString(2)
                NikkeCard[0].dataset.tagvalue2 = (parseInt(NikkeCard[0].dataset.tagvalue2, 2) + TreasureNikkeValue[index].tagvalue2).toString(2)
                NikkeCard[0].dataset.tagvalue3 = (parseInt(NikkeCard[0].dataset.tagvalue3, 2) + TreasureNikkeValue[index].tagvalue3).toString(2)
            }
        }))
    .then(() => fetch('./NikkeDetail.json')
        .then(res => res.json()).then(NikkeDetail => {
            const NikkeDetailName = Object.keys(NikkeDetail)
            const NikkeDetailValue = Object.values(NikkeDetail)
            for (let index = NikkeDetailName.length - 1; index >= 0; index--) {
                const NikkeCard = document.getElementsByName(NikkeDetailName[index])[0].children[1]
                //console.log('디테일:', document.getElementsByName(NikkeDetailName[index]), index)
                const Detaildiv = Object.assign(document.createElement("span"), {
                    id: 'Detail'
                })
                Object.entries(NikkeDetailValue[index]).forEach(data => {
                    if (data[1].length != 0) {
                        const Detailkey = Object.assign(document.createElement("div"), {
                            className: 'Detailtitle',
                            innerText: `${data[0]}`,
                        })
                        const DetailList = document.createElement("div")
                        Object.values(data[1]).forEach(datavalue => {
                            DetailList.appendChild(Object.assign(document.createElement('p'), {
                                className: 'NikkeTag',
                                innerText: `${datavalue}`
                            }))
                        })
                        Detailkey.appendChild(DetailList)
                        Detaildiv.appendChild(Detailkey)
                    }
                })
                NikkeCard.appendChild(Detaildiv)
                NikkeCard.addEventListener('mouseenter', () => {
                    timer = setTimeout(() => {
                        Detaildiv.style.display = 'flex'
                    }, 400);
                })
                NikkeCard.addEventListener('mouseleave', () => {
                    clearTimeout(timer)
                    Detaildiv.style.display = 'none'
                })
            }
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
    NikkeTags.id = 'NikkeTags';
    for (let index = 0; index < data.length; index++) {
        const Tag = document.createElement("p");
        Tag.className = 'NikkeTag'
        Tag.textContent = data[index];
        NikkeTags.appendChild(Tag);
    }
    addeddiv.appendChild(NikkeTags);
}

function InsertTreasureNikkeTags(card, data) {
    //console.log(card)
    const NikkeTags = card[0].children[1].children[1]
    for (let index = 0; index < data.length; index++) {
        const Tag = document.createElement("p");
        Tag.className = 'NikkeTreasureTag'
        Tag.textContent = data[index];
        NikkeTags.appendChild(Tag);
    }
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
    WeaponMark.src = `NikkeCard/NikkeCardImg/Weapon/${data.weapon}.webp`;
    WeaponMark.classList.add("WeaponImg");
    Marksdiv1.appendChild(WeaponMark);
    //클래스 마크 삽입
    const ClassMark = document.createElement("img");
    ClassMark.src = `NikkeCard/NikkeCardImg/Class/${data.class}.webp`;
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
    TypeMark.src = `NikkeCard/NikkeCardImg/Type/${data.type}.webp`;
    TypeMark.classList.add("TypeImg");
    Marksdiv2.appendChild(TypeMark);
    //버스트 마크 삽입
    const BurstMark = document.createElement("img");
    BurstMark.src = `NikkeCard/NikkeCardImg/Burst/${data.burst}.webp`;
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