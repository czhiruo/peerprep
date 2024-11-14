export async function translateCodeService(code, sourceLang, targetLang) {
  try {
    const res = await fetch("http://localhost:5001/code/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        source_lang: sourceLang,
        target_lang: targetLang,
      }),
    });
    const data = await res.json();
    return data.translated_code;
  } catch (error) {
    console.error("Error translating code:", error);
  }
}