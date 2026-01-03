const form = document.getElementById("ajax-form");
const button = document.getElementById("submit-button");
const status = document.getElementById("status");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // ページ遷移を防止
    
    button.value = "Sending..."; // 送信中のテキスト変更
    button.disabled = true;      // 二重送信防止
    
    const data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // ★成功時の演出
            button.style.display = "none"; // ボタンを完全に消す
            status.innerHTML = "メッセージを送信しました。";
            status.style.display = "block"; // メッセージを表示
            form.reset(); // 入力欄を空にする
        } else {
            // エラー時
            status.innerHTML = "Oops! 送信に失敗しました。";
            status.style.display = "block";
            button.disabled = false;
            button.value = "Send Message";
        }
    }).catch(error => {
        status.innerHTML = "接続エラーが発生しました。";
        status.style.display = "block";
    });
});