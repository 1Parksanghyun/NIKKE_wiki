fetch('./Tags/ConditionName.json')
    .then(res => res.json())
    .then(data => {
        const sector = Object.assign(document.createElement("div"), {
            className: "TagSector",
        })
        sector.appendChild(Object.assign(document.createElement("div"), {
            className: "SectorTitle",
            innerText: "발동 조건"
        }))
        document.getElementById("TagList").appendChild(sector)
        for (let ConditionName of data) {
            if (ConditionName == "조건 없이 검색") continue;
            const Tag = document.createElement('button');
            Tag.className = 'Tag';
            Tag.innerText = `${ConditionName}`;

            Tag.onclick = () => createSearchCard(ConditionName, undefined);
            Tag.filtering = function (inputstring) {
                if (inputstring == "" || Tag.innerText.includes(inputstring)) {
                    Tag.hidden = false;
                } else {
                    Tag.hidden = true;
                }
            }

            sector.appendChild(Tag);
        }
    }).then(
        fetch('./Tags/TagNameList.json')
            .then(res => res.json())
            .then(data => {
                for (let [TagSector, TagName] of Object.entries(data)) {
                    if (TagSector == "효과 없이 검색") continue;
                    const sector = Object.assign(document.createElement("div"), {
                        className: "TagSector",
                    })
                    sector.appendChild(Object.assign(document.createElement("div"), {
                        className: "SectorTitle",
                        innerText: `${TagSector}`
                    }))
                    document.getElementById("TagList").appendChild(sector)
                    TagName.forEach((effect) => {
                        const Tag = document.createElement('button');
                        Tag.className = 'Tag';
                        Tag.innerText = `${effect}`;

                        Tag.onclick = () => createSearchCard(undefined, Tag.innerText);
                        Tag.filtering = function (inputstring) {
                            if (inputstring == "" || Tag.innerText.includes(inputstring)) {
                                Tag.hidden = false;
                            } else {
                                Tag.hidden = true;
                            }
                        }

                        sector.appendChild(Tag);
                    })
                }
            }))