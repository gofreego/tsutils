'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlighter } from 'shiki';
import './github-markdown.css';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { getHighlighter } from './shikiHighlighter';

interface ReadmeViewerProps {
  content: string;
  className?: string;
  isDark?: boolean;
}

const ReadmeViewer: React.FC<ReadmeViewerProps> = ({
  content,
  className = '',
  isDark = false,
}) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [copiedBlocks, setCopiedBlocks] = useState<Set<string>>(new Set());

  useEffect(() => {
    getHighlighter().then(setHighlighter);
  }, []);

  const copyToClipboard = async (text: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlocks(prev => new Set(prev).add(blockId));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  return (
    <div className={`readme-viewer markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            if (match && highlighter) {
              const codeText = String(children).replace(/\n$/, '');
              const blockId = `code-${Math.random().toString(36).substr(2, 9)}`;

              return (
                <div style={{ position: 'relative' }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlighter.codeToHtml(
                        codeText,
                        {
                          lang: match[1],
                          theme: isDark ? 'github-dark' : 'github-light',
                        }
                      ),
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(codeText, blockId)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'var(--md-sys-color-surface-container-high)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      borderRadius: '4px',
                      padding: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      width: '32px',
                      height: '32px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? 'var(--md-sys-color-surface-container-highest)'
                        : 'var(--md-sys-color-surface-container-high)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? 'var(--md-sys-color-surface-container-high)'
                        : 'var(--md-sys-color-surface-container-highest)';
                    }}
                    title={copiedBlocks.has(blockId) ? 'Copied!' : 'Copy code'}
                  >
                    {copiedBlocks.has(blockId) ? (
                      <CheckIcon style={{ fontSize: '16px' }} />
                    ) : (
                      <ContentCopyIcon style={{ fontSize: '16px' }} />
                    )}
                  </button>
                </div>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ReadmeViewer;
