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

import React, { PropsWithChildren, useMemo } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { createDefaultThemeOptions } from '../../styles/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import palette from '../../styles/palette';
import { deepmerge } from '@mui/utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import useEnableAnimations from '../../hooks/useEnableAnimations';

export type CrafterThemeProviderProps = PropsWithChildren<{ themeOptions?: ThemeOptions }>;

const muiCache = createCache({ key: 'mui', prepend: true });

const tssCache = createCache({ key: 'craftercms' });

// .compat = true to avoid console warnings regarding first-child
tssCache.compat = true;
muiCache.compat = true;

export function CrafterThemeProvider(props: CrafterThemeProviderProps) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const enableAnimations = useEnableAnimations();

	const theme = useMemo(() => {
		const mode = prefersDarkMode ? 'dark' : 'light';
		const auxTheme = createTheme({ palette: { mode } });
		const defaultThemeOptions = createDefaultThemeOptions({ mode });
		return createTheme({
			...(props.themeOptions ?? defaultThemeOptions),
			// WCAG 2.4.7 / 1.4.11. MUI 9 paints this ring only when `focusVisible` is set.
			// With animations off, `disableRipple` removes the translucent focus fill.
			// Black outline is 21:1 on white; the white inner ring is 18.73:1 on #121212.
			// `:where` keeps a more specific component outline in charge.
			focusVisible: {
				outlineStyle: 'solid',
				outlineColor: '#000000',
				outlineWidth: 2,
				outlineOffset: 2,
				boxShadow: '0 0 0 2px #FFFFFF'
			},
			// Animations: Disable MUI JavaScript/CSS transition helpers
			...(!enableAnimations && {
				transitions: {
					...defaultThemeOptions?.transitions,
					...props.themeOptions?.transitions,
					create: () => 'none'
				}
			}),
			palette: {
				mode,
				primary: {
					main: prefersDarkMode ? palette.blue.tint : palette.blue.main
				},
				warning: {
					main: prefersDarkMode ? palette.orange.tint : palette.orange.main
				},
				error: prefersDarkMode
					? { main: palette.red.tint }
					: {
							// #FF3B30 is 3.55:1 on #fff. #D12E25 is 5.09:1 on #fff, 4.87:1 on #FAFAFA, 4.58:1 on #F3F3F3.
							// light/dark match MUI tonalOffset (lighten 0.2 / darken 0.3) from that main.
							main: '#D12E25',
							light: '#DA5750',
							dark: '#922019'
						},
				success: {
					main: prefersDarkMode ? palette.green.tint : palette.green.main
				},
				info: {
					main: prefersDarkMode ? palette.teal.tint : palette.teal.main
				},
				secondary: {
					main: prefersDarkMode ? palette.indigo.tint : palette.purple.tint,
					// #7D7AFF as text is 4.94:1 on #1C1C1E. White on it is 3.44:1; #242424 is 4.51:1.
					...(prefersDarkMode && { contrastText: '#242424' })
				},
				action: {
					selected: palette.blue.highlight
				},
				background: {
					default: prefersDarkMode ? palette.gray.dark7 : palette.gray.light0
				},
				divider: prefersDarkMode ? 'rgba(59, 74, 89, 0.3)' : auxTheme.palette.divider,
				...props.themeOptions?.palette
			},
			components: deepmerge((props.themeOptions ?? defaultThemeOptions).components ?? {}, {
				MuiFormLabel: {
					styleOverrides: {
						asterisk: {
							color: '#D12E25'
						}
					}
				},
				MuiLink: {
					defaultProps: {
						underline: 'hover'
					}
				},
				MuiOutlinedInput: {
					styleOverrides: {
						root: {
							backgroundColor: auxTheme.palette.background.paper
						}
					}
				},
				MuiButtonBase: {
					// Animations: Disable interactive ripple effects globally
					...(!enableAnimations && {
						defaultProps: {
							disableRipple: true
						}
					}),
					styleOverrides: {
						root: {
							'&:where(:focus-visible, .Mui-focusVisible)': {
								outline: '2px solid #000000',
								outlineOffset: '2px',
								boxShadow: '0 0 0 2px #FFFFFF'
							}
						}
					}
				},
				MuiInputBase: {
					styleOverrides: {
						root: {
							backgroundColor: auxTheme.palette.background.paper
						}
					}
				},
				// Animations: Force-disable pure CSS transitions and animations
				MuiCssBaseline: {
					styleOverrides: {
						...(!enableAnimations && {
							'*, *::before, *::after': {
								transition: 'none !important',
								animation: 'none !important'
							}
						}),
						':where(a, summary):focus-visible': {
							outline: '2px solid #000000',
							outlineOffset: '2px',
							boxShadow: '0 0 0 2px #FFFFFF'
						}
					}
				}
			})
		});
	}, [prefersDarkMode, props.themeOptions, enableAnimations]);
	return (
		<CacheProvider value={muiCache}>
			<ThemeProvider theme={theme} children={props.children} />
		</CacheProvider>
	);
}

export default CrafterThemeProvider;
