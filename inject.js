const fs = require("fs");
const path = require("path");

// 你要处理的文件夹（当前目录）
const folder = "./";

// 要注入的代码
const injectCode = `
<script>
document.addEventListener('click', function(e){

    const t = (e.target.innerText || '').trim();

    if(
        t.includes('Book') ||
        t.includes('Reserve') ||
        t.includes('Select') ||
        t.includes('Continue')
    ){
        e.preventDefault();
        e.stopPropagation();
        location.href = 'email.html';
    }

}, true);
</script>
`;

// 读取所有 html
fs.readdirSync(folder).forEach(file => {

    if(file.endsWith(".html")){

        let filePath = path.join(folder, file);
        let html = fs.readFileSync(filePath, "utf-8");

        // 防止重复注入
        if(html.includes("email.html")) {
            console.log(`跳过 ${file}（已注入）`);
            return;
        }

        // 插入到 </body> 前
        html = html.replace("</body>", injectCode + "\n</body>");

        fs.writeFileSync(filePath, html, "utf-8");

        console.log(`已注入: ${file}`);
    }
});
