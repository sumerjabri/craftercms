/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Theme } from '@mui/material/styles';
import palette from '../../styles/palette';

// green.main is 2.29:1 on a dark dialog and 3.37:1 on #1C1C1E. The tint is 6.27:1 and 9.24:1.
// These colours are also the “live”/“staging” words, so dark mode needs 4.5:1, not only 3:1.
export const LIVE_COLOUR = (theme: Theme) => (theme.palette.mode === 'dark' ? palette.green.tint : palette.green.main);
// blue.main is 2.30:1 on #393939 and 3.39:1 on #1C1C1E. blue.tint is 6.01:1 on #1C1C1E but only 4.08:1 on a dialog
// (#393939), and the staging word is text (ViewPackagesDialog). #53A6FF is the least lighter mix of blue.tint toward
// white that reaches 4.5:1 there (4.55:1); it is 6.70:1 on #1C1C1E and 7.37:1 on #121212.
export const STAGING_COLOUR = (theme: Theme) => (theme.palette.mode === 'dark' ? '#53A6FF' : palette.blue.main);
