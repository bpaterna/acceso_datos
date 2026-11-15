if (navigator.clipboard && navigator.clipboard.writeText) {
    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    navigator.clipboard.writeText = function (text) {
        const cleaned = text.replace(
            /^(\$|#|PS>|mysql>|admin>|florabotanica>|mongosh>)\s+/gm,
            ""
        );
        return originalWriteText(cleaned);
    };
}