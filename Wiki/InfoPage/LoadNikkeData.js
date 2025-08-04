//URL에 있는 캐릭터 이름 가져오기
const NikkeName = window.location.pathname.split('/')[1];
const NikkeProfileBox = document.getElementById("NikkeProfileBox");

fetch('../MainHome/NikkeList.json')
    .then(res => res.json())
    .then(data => {
        for (let index of data) {
            if (index.dataname != NikkeName) {
                console.log(`Not ${NikkeName}`);
                continue;
            }
            else {
                const NikkeName = document.createElement("div");
                NikkeName.innerText = index.name;
                if (index.tier == "SSR") {
                    NikkeName.id = "NikkeNameSSR";
                } else if (index.tier == "SR") {
                    NikkeName.id = "NikkeNameSR";
                } else
                    NikkeName.id = "NikkeNameR";
                //스탠딩 이미지 삽입
                document.getElementById("NikkeStand").prepend(NikkeName);
                const StandImg = document.getElementById("NikkeStandImg");
                StandImg.src = `/InfoPage/InfoPageImage/${index.dataname}Stand.png`;
                console.log(StandImg.height);
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