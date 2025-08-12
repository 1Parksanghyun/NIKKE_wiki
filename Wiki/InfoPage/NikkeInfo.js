function AllocateDataname(card) {
    //클릭된 프로필의 니케 이름를 url 경로 이용
    const DataName = card.name;
    window.location.href = `/${DataName}`;
}

