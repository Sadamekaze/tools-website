function proses() {
    const textbox = document.getElementById("input");
    const selectedRadio = document.querySelector('input[name="mode"]:checked');
    const hasilBox = document.getElementById("hasilBox");
    const hasil = document.getElementById("hasil");

    const text = textbox.value;

    if (selectedRadio) {
        let hasilReplace;
        let newElement;

        if (selectedRadio.value === 'text-to-li') {
            const lines = text.split('\n'); 
            let dataHasil = lines.map(line => `<li>${line.replace(/</g, "&lt;")}</li>`).join('\n');

            newElement = '<deckgo-highlight-code language="html" theme="one-light" line-numbers="true">\n\t<code slot="code">HarusDiReplace</code>\n</deckgo-highlight-code>';
            hasil.innerHTML = newElement.replace("HarusDiReplace", dataHasil);
            hasilBox.textContent = dataHasil;

        } else if (selectedRadio.value === "replace-<") {
            hasilReplace = text.replace(/</g, "&lt;").replace(/&lt;!/g, "<!");

            newElement = '<deckgo-highlight-code language="html" theme="one-light" line-numbers="true">\n\t<code slot="code">HarusDiReplace</code>\n</deckgo-highlight-code>';
            hasil.innerHTML = newElement.replace("HarusDiReplace", hasilReplace);
            hasilBox.textContent = hasilReplace;

        } else if (selectedRadio.value === "tab-replace") {
            hasilReplace = text.replace(/\t| {4}/g, "&numsp;&numsp;&numsp;&numsp;").replace(/</g, "&lt;").replace(/&lt;!/g, "<!");

            newElement = '<deckgo-highlight-code language="html" theme="one-light" line-numbers="true">\n\t<code slot="code">HarusDiReplace</code>\n</deckgo-highlight-code>';
            hasil.innerHTML = newElement.replace("HarusDiReplace", hasilReplace);
            hasilBox.textContent = hasilReplace;

        } else if (selectedRadio.value === "auto-to-file") {
            const textTemplateDeckgo = `<deckgo-highlight-code language="html" theme="one-light" line-numbers="true">\n    <code slot="code">YangMauDireplace</code>\n</deckgo-highlight-code>`;
            const textTemplateIframe = `<iframe srcdoc='YangMauDireplace' frameborder="0"></iframe>`;

            let hasilReplaceDeckgo = text.replace(/\t| {4}/g, "&numsp;&numsp;&numsp;&numsp;").replace(/</g, "&lt;").replace(/&lt;!/g, "<!");
            let hasilReplaceDeckgo2 = textTemplateDeckgo.replace("YangMauDireplace", hasilReplaceDeckgo);
            let hasilReplaceIframe = textTemplateIframe.replace("YangMauDireplace", text);

            newElement = '<deckgo-highlight-code language="html" theme="one-light" line-numbers="true">\n\t<code slot="code">HarusDiReplace</code>\n</deckgo-highlight-code>';
            hasil.innerHTML = newElement.replace("HarusDiReplace", `${hasilReplaceDeckgo2}\n\n${hasilReplaceIframe}`);
            hasilBox.textContent = `${hasilReplaceDeckgo2}\n\n${hasilReplaceIframe}`;
        }
    } else {
        alert("Please select a mode");
    }
}

function copyToClipboard() {
    const hasilBox = document.getElementById("hasilBox");

    if (hasilBox.value) { // Pastikan ada teks yang bisa disalin
        navigator.clipboard.writeText(hasilBox.value)
            .catch(err => {
                alert("Gagal menyalin ke clipboard: " + err);
            });
    } else {
        alert("Tidak ada teks untuk disalin.");
    }
}
