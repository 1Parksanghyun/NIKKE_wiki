fetch('./NikkeList.json')
    .then(res => res.json())
    .then(data => data.forEach(char => {
        //프로필 카드 생성
        const card = document.createElement("button");
        card.className = 'NikkeInfo';
        card.dataset.name = char.dataname;
        //클릭시 함수 실행(NikkeInfo.js)
        card.onclick = () => AllocateDataname(card);
        InsertNikkeImg(card, `NikkeCard/NikkeCardImg/Nikke/${char.dataname}.png`);
        InsertNikkeName(card, char.name);
        InsertNikkeTags(card, char.tags);
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

function InsertNikkeName(card, data) {
    const NikkeName = document.createElement("p");
    NikkeName.className = 'NikkeName';
    NikkeName.textContent = data;
    card.appendChild(NikkeName);
}
function InsertNikkeTags(card, data) {
    const NikkeTags = document.createElement("div");
    NikkeTags.className = 'NikkeTags';
    for (let index = 0; index < data.length; index++) {
        const Tag = document.createElement("p");
        Tag.className = 'Tag'
        Tag.textContent = data[index];
        NikkeTags.appendChild(Tag);
    }
    card.appendChild(NikkeTags);
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
    WeaponMark.src = `${data.weaponimg}`;
    WeaponMark.classList.add("WeaponImg");
    Marksdiv1.appendChild(WeaponMark);
    //클래스 마크 삽입
    const ClassMark = document.createElement("img");
    ClassMark.src = `${data.classimg}`;
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
    TypeMark.src = `${data.typeimg}`;
    TypeMark.classList.add("TypeImg");
    Marksdiv2.appendChild(TypeMark);
    //버스트 마크 삽입
    const BurstMark = document.createElement("img");
    BurstMark.src = `${data.burstimg}`;
    BurstMark.classList.add("BurstImg");
    Marksdiv2.appendChild(BurstMark);
    //마크 구역2 삽입
    NikkeMarks.appendChild(Marksdiv2);

}