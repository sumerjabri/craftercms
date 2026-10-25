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
// blue.main is 2.30:1 on #393939 and 3.39:1 on #1C1C1E. The tint is 4.08:1 and 6.01:1.
export const STAGING_COLOUR = (theme: Theme) => (theme.palette.mode === 'dark' ? palette.blue.tint : palette.blue.main);
