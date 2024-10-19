import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";

export default function useHighlight(content: string): string {
  hljs.registerLanguage("java", java);

  // Get the <pre> tags
  const preTags = content.match(/<pre.*?>.*?<\/pre>/gs);
  preTags?.forEach((preTag) => {
    const classNames = preTag.match(/class=".*?"/)?.at(0);
    const lang = classNames
      ?.replace('class="', "")
      .replace("language-", "")
      .replace('"', "");

    const codeTags = preTag.match(/<code.*?>.*?<\/code>/gs);
    codeTags?.forEach((codeTag) => {
      const code = codeTag.replace(/<code.*?>/, "").replace(/<\/code>/, "");

      const highlighted = hljs.highlightAuto(code, ["java"]);

      // replace &amp;lt with < and &amp;gt with >
      let value = highlighted.value
        .replace(/&amp;lt;/g, "<")
        .replace(/&amp;gt;/g, ">");
      content = content.replace(
        codeTag,
        `<code class="hljs ${highlighted.language}">${value}</code>`,
      );
    });
  });

  // replace pre tags with p tags but add style to make it look like pre
  // content = content.replace(/<pre.*?>/g, '<p style="white-space: pre-wrap;">');

  return content;
}
