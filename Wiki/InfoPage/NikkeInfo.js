function AllocateDataname(card) {
    const DataName = card.dataset.name;
    window.location.href = `/${DataName}`;
}

