import hljs from 'highlight.js';
import java from 'highlight.js/lib/languages/java';

export default function useHighlight(content: string): string {
    hljs.registerLanguage('java', java);

    // Get the <pre> tags
    const preTags = content.match(/<pre.*?>.*?<\/pre>/gs);
    preTags?.forEach(preTag => {
        const classNames = preTag.match(/class=".*?"/)?.at(0);
        const lang = classNames
            ?.replace('class="', '')
            .replace('language-', '')
            .replace('"', '');

        const codeTags = preTag.match(/<code.*?>.*?<\/code>/gs);
        codeTags?.forEach(codeTag => {
            const code = codeTag
                .replace(/<code.*?>/, '')
                .replace(/<\/code>/, '');

            const highlighted = hljs.highlightAuto(code);
            content = content.replace(codeTag, `<code class="hljs ${highlighted.language}">${highlighted.value}</code>`);
        });
    });

    return content;
}