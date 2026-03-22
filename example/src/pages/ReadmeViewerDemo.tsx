import { Box, Typography, Paper } from '@mui/material'
import { ReadmeViewer, useTheme } from '@gofreego/tsutils'

const markdownContent = `
# Readme Viewer Example

This is a demonstration of the \`ReadmeViewer\` component!

## Syntax Highlighting

The component supports GitHub-flavored markdown and syntax highlighting through Shiki:

\`\`\`typescript
import { ReadmeViewer } from '@gofreego/tsutils';

export function Example() {
  return (
    <ReadmeViewer content="# Hello World" />
  );
}
\`\`\`

## Lists and Typography

- It handles bullet points
- It handles **bold** and *italic* text
- Blockquotes:
> This is a quote

---

You can even add tables:

| Feature | Support |
|---------|---------|
| Markdown | Yes ✔️ |
| Caching | Yes ✔️ |
`;

export default function ReadmeViewerDemo() {
  const { resolvedThemeMode } = useTheme();
  
  return (
    <Box sx={{ p: 4, height: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ReadmeViewer Component
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        A powerful markdown viewer with built-in dark/light mode switching, syntax highlighting, and text copying features.
      </Typography>

      <Paper 
        elevation={0}
        sx={{ 
          p: 0,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderBottom: '1px solid',
          borderColor: 'divider' 
        }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Live Demo
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <ReadmeViewer content={markdownContent} isDark={resolvedThemeMode === 'dark'} />
        </Box>
      </Paper>
    </Box>
  )
}
