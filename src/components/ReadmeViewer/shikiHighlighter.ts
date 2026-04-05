import { createHighlighter, Highlighter } from 'shiki';

let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

export const getHighlighter = async (): Promise<Highlighter> => {
    if (highlighterInstance) {
        return highlighterInstance;
    }

    if (highlighterPromise) {
        return highlighterPromise;
    }

    highlighterPromise = createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['js', 'ts', 'go', 'json', 'bash', 'yaml', 'md', 'python', 'java', 'cpp', 'c', 'html', 'css', 'sql', 'http', 'text'],
    }).then(highlighter => {
        highlighterInstance = highlighter;
        return highlighter;
    });

    return highlighterPromise;
};
