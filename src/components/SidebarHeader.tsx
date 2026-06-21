import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export interface SidebarHeaderProps {
  /** The text to display in the header */
  title: string;
  /** Path for the home button redirection (defaults to "/") */
  homePath?: string;
  /** Whether to show the home button */
  showHome?: boolean;
}

/**
 * A standardized header component to be used with SidebarLayout.
 * It includes a title and an optional home button that redirects to a specified path.
 */
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  homePath = '/',
  showHome = true
}) => {
  return (
    <Box sx={{ padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', gap: '8px' }}>
      {showHome && (
        <IconButton component={Link} to={homePath} size="small" sx={{ color: 'text.primary', ml: -1 }}>
          <HomeIcon />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        {title}
      </Typography>
    </Box>
  );
};
