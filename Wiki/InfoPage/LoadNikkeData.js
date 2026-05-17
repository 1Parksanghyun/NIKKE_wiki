//URL에 있는 캐릭터 이름 가져오기
const NikkeName = window.location.pathname.split('/')[1];
const NikkeProfileBox = document.getElementById("NikkeProfileBox");

fetch('../MainHome/NikkeList.json')
    .then(res => res.json())
    .then(data => {
        for (let index of data) {
            if (index.dataname != NikkeName) {
                continue;
            }
            else {
                SetName(index.name, index.tier, "20")
                NikkeName.innerText = index.name;
                if (index.tier == "SSR") {
                    NikkeName.id = "NikkeNameSSR";
                } else if (index.tier == "SR") {
                    NikkeName.id = "NikkeNameSR";
                } else
                    NikkeName.id = "NikkeNameR";
                //스탠딩 이미지 삽입

                const StandImg = document.getElementById("NikkeStandImg");
                StandImg.src = `./InfoPage/InfoPageImage/${index.dataname}Stand.webp?${index.version}`;
                InsertIcon('Weapon', index.weapon)
                InsertIcon('Class', index.class)
                InsertIcon('Burst', index.burst)
                InsertIcon('Type', index.type)
                InsertSkillInfo();
                break;
            }
        }
    }
    )

function InsertSkillInfo() {
    fetch('/InfoPage/SkillData.json')
        .then(res => res.json())
        .then(data => {
            let index = 0;
            for (let currentskill of Object.entries(data[`${NikkeName}`])) {
                document.getElementsByClassName('SkillName')[index].innerText = currentskill[0];
                document.getElementsByClassName('SkillEffect')[index++].innerText = currentskill[1];
            }
        }
        )
}

function InsertIcon(attribute, filename) {
    const Standbackground = document.getElementById("NikkeAttribute");
    Standbackground.appendChild(Object.assign(document.createElement('img'), {
        id: `${attribute}`,
        src: `../MainHome/NikkeCard/NikkeCardImg/${attribute}/${filename}.webp`
    }))
}

function SetName(nikkename, nikketier, nikkeburstTime) {
    const Div_nikke_name = document.getElementById("NikkeName")
    const Div_nikke_tier = document.getElementById("NikkeTier")
    const Div_nikke_burst_time = document.getElementById("NikkeBurstTime")
    Div_nikke_name.innerText = nikkename;
    Div_nikke_tier.innerText = nikketier;
    Div_nikke_burst_time.innerText = nikkeburstTime

    const Div_nikke_info = document.getElementById("NikkeInfo")
    switch (nikketier) {
        case "R":
            Div_nikke_info.style.color = "#31a9fc"
            break;
        case "SR":
            Div_nikke_info.style.color = "#b96fe4"
            break;
        case "SSR":
            Div_nikke_info.style.color = "#e8ca5b"
            break;

        default:
            Div_nikke_info.style.color = '#FFFFFF'
            break;
    }
}