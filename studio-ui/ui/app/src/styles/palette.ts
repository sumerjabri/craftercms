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

const palette = {
	white: '#fff',
	black: '#000',
	blue: {
		tint: '#409CFF',
		// 5.02:1 on #fff, 4.81:1 on #FAFAFA, 4.53:1 on #F3F3F3. Was #007AFF (4.02:1 on #fff).
		main: '#006BE0',
		shade: '#0040DD',
		highlight: 'rgba(0, 122, 255, .1)',
		highlightHex: '#E6F2FF'
	},
	// green.main 5.05:1 on #fff (was #34C759, 2.22:1). shade 5.05:1 on #fff / 4.55:1 on #F3F3F3 (was #248A3D, 4.40:1 on #fff).
	green: { tint: '#30DB5B', main: '#217F39', shade: '#217F38', highlight: '#EBFAEF' },
	indigo: { tint: '#7D7AFF', main: '#5856D6', shade: '#3634A3' },
	// 5.01:1 on #fff. Was #FF9500 (2.20:1).
	orange: { tint: '#FFB340', main: '#A35F00', shade: '#C93400' },
	pink: { tint: '#FF6482', main: '#FF2D55', shade: '#D30F45' },
	// tint is light-mode secondary. 5.02:1 on #fff. Was #DA8FFF (2.25:1).
	purple: { tint: '#8C5CA4', main: '#AF52DE', shade: '#8944AB' },
	red: { tint: '#FF6961', main: '#FF3B30', shade: '#D70015', highlight: '#FFEBEA' },
	// 5.04:1 on #fff. Was #5AC8FA (1.90:1).
	teal: { tint: '#70D7FF', main: '#357694', shade: '#0071A4' },
	yellow: { tint: '#FFD426', main: '#FFCC00', shade: '#A05A00', highlight: '#FFFAE6' },
	gray: {
		light0: '#FAFAFA',
		light1: '#F3F3F3',
		light2: '#F2F2F7',
		light3: '#EBEBF0',
		light4: '#E5E5EA',
		light5: '#D8D8DC',
		light6: '#D1D1D6',
		light7: '#C7C7CC',
		medium1: '#BCBCC0',
		medium2: '#AEAEB2',
		medium3: '#8E8E93',
		medium4: '#7C7C80',
		medium5: '#6C6C70',
		medium6: '#636366',
		medium7: '#545456',
		dark1: '#48484A',
		dark2: '#444446',
		dark3: '#3A3A3C',
		dark4: '#363638',
		dark5: '#2C2C2E',
		dark6: '#242426',
		dark7: '#1C1C1E'
	}
};

export default palette;
