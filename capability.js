async function hashText(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    //const hashHex = hashArray.map(b => b.toString(10).padStart(2, '0')).join('');
    const numbers = [];
            for (let i = 0; i < 4; i++) {
                // 將每8個字節組成一個數字，並取餘100
                const chunk = hashArray.slice(i * 8, (i + 1) * 8);
                const number = chunk.reduce((acc, val) => acc * 256 + val, 0) % 101;
                numbers.push(number);
            }
    return numbers;
}

async function updateSkills() {
    const text = document.getElementById('name').value;
    if (text===""){
        alert("你需要填寫名字");
        return ;
    }
    const skill=['li.sk-IQ','li.sk-EQ','li.sk-health','li.sk-luck'];
    const key=await hashText(text);
    for (let j =0;j<4;j++){
        document.querySelector(skill[j]).style.setProperty('--per', key[j]);
    }
}