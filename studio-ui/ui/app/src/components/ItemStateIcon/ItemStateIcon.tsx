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

import NewStateIcon from '@mui/icons-material/NewReleasesOutlined';
import EditedStateIcon from '@mui/icons-material/EditOutlined';
import DeletedStateIcon from '@mui/icons-material/DeleteOutlineRounded';
import LockedStateIcon from '../../icons/Lock';
import SystemProcessingStateIcon from '@mui/icons-material/HourglassEmptyRounded';
import SubmittedStateIcon from '../../icons/PaperPlane';
import ScheduledStateIcon from '@mui/icons-material/AccessTimeRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import NotInWorkflowIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useMemo } from 'react';
import { getItemStateId, getItemStateText } from '../ItemDisplay/utils';
import palette from '../../styles/palette';
import { ContentItem, ItemStates } from '../../models/Item';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { PartialSxRecord } from '../../models';
import { useIntl } from 'react-intl';
import { Theme } from '@mui/material/styles';

// Light-mode mains are 4.5:1 on white but only 2.3:1 on a dark dialog; dark mode keeps the tints (5.2:1 or more there).
const modeColor = (light: string, dark: string) => (theme: Theme) => (theme.palette.mode === 'dark' ? dark : light);

export type ItemStateIconClassKey =
	| 'root'
	| 'stateNewIcon'
	| 'stateModifiedIcon'
	| 'stateDeletedIcon'
	| 'stateLockedIcon'
	| 'stateSystemProcessingIcon'
	| 'stateSubmittedIcon'
	| 'stateSubmittedToStagingIcon'
	| 'stateSubmittedToLiveIcon'
	| 'stateScheduledIcon'
	| 'statePublishingIcon'
	| 'stateDisabledIcon'
	| 'stateNotInWorkflow';

export interface ItemStateIconProps {
	item: Pick<ContentItem, 'systemType' | 'stateMap' | 'lockOwner' | 'savedAsDraft'>;
	classes?: Partial<Record<ItemStateIconClassKey, string>>;
	sxs?: PartialSxRecord<ItemStateIconClassKey>;
	className?: string;
	displayTooltip?: boolean;
	fontSize?: SvgIconProps['fontSize'];
}

export function ItemStateIcon(props: ItemStateIconProps) {
	const { item, classes, sxs, className, displayTooltip = true, fontSize } = props;
	const { Icon, stateSpecificClass, stateSpecificSx } = useMemo(() => {
		if (item.systemType === 'folder') {
			return {
				Icon: NotInWorkflowIcon,
				stateSpecificSx: { color: palette.gray.medium4, ...sxs?.stateNotInWorkflow }
			};
		}
		let map: { [key in ItemStates]: any };
		map = {
			new: {
				Icon: NewStateIcon,
				stateSpecificClass: classes?.stateNewIcon,
				stateSpecificSx: { color: modeColor(palette.teal.main, palette.teal.tint), ...sxs?.stateNewIcon }
			},
			modified: {
				Icon: EditedStateIcon,
				stateSpecificClass: classes?.stateModifiedIcon,
				stateSpecificSx: { color: palette.yellow.main, ...sxs?.stateModifiedIcon }
			},
			deleted: {
				Icon: DeletedStateIcon,
				stateSpecificClass: classes?.stateDeletedIcon,
				stateSpecificSx: { color: palette.red.main, ...sxs?.stateDeletedIcon }
			},
			locked: {
				Icon: LockedStateIcon,
				stateSpecificClass: classes?.stateLockedIcon,
				stateSpecificSx: { color: modeColor(palette.orange.main, palette.orange.tint), ...sxs?.stateLockedIcon }
			},
			systemProcessing: {
				Icon: SystemProcessingStateIcon,
				stateSpecificClass: classes?.stateSystemProcessingIcon,
				stateSpecificSx: {
					// #5856D6 is 2.04:1 on #393939. The tint is 3.35:1 there, 4.94:1 on #1C1C1E, 5.44:1 on #121212.
					color: modeColor(palette.indigo.main, palette.indigo.tint),
					...sxs?.stateSystemProcessingIcon
				}
			},
			submitted: {
				Icon: SubmittedStateIcon,
				stateSpecificClass: classes?.stateSubmittedIcon,
				stateSpecificSx: {
					// purple.tint (#8C5CA4) is 2.30:1 on #393939, darker than purple.main (2.80:1).
					// #B35AE0 is the least lighter mix of #AF52DE that reaches 3:1 there (3.00:1), 4.87:1 on #121212 and 4.42:1 on #1C1C1E.
					color: modeColor(palette.purple.main, '#B35AE0'),
					...sxs?.stateSubmittedIcon
				}
			},
			scheduled: {
				Icon: ScheduledStateIcon,
				stateSpecificClass: classes?.stateScheduledIcon,
				stateSpecificSx: { color: modeColor(palette.green.main, palette.green.tint), ...sxs?.stateScheduledIcon }
			},
			publishing: {
				Icon: CloudUploadOutlinedIcon,
				stateSpecificClass: classes?.statePublishingIcon,
				stateSpecificSx: {
					color: modeColor(palette.indigo.main, palette.indigo.tint),
					...sxs?.statePublishingIcon
				}
			},
			submittedToStaging: {
				Icon: item.stateMap.submitted ? SubmittedStateIcon : ScheduledStateIcon,
				stateSpecificClass: classes?.stateSubmittedToStagingIcon,
				stateSpecificSx: {
					color: modeColor(palette.blue.main, palette.blue.tint),
					...sxs?.stateSubmittedToStagingIcon
				}
			},
			submittedToLive: {
				Icon: item.stateMap.submitted ? SubmittedStateIcon : ScheduledStateIcon,
				stateSpecificClass: classes?.stateSubmittedToLiveIcon,
				stateSpecificSx: {
					color: modeColor(palette.green.main, palette.green.tint),
					...sxs?.stateSubmittedToLiveIcon
				}
			},
			staged: null,
			live: null,
			disabled: {
				Icon: BlockRoundedIcon,
				stateSpecificClass: classes?.stateDisabledIcon,
				stateSpecificSx: { color: palette.pink.main, ...sxs?.stateDisabledIcon }
			},
			translationUpToDate: null,
			translationPending: null,
			translationInProgress: null
		};
		return (
			map[getItemStateId(item.stateMap)] ?? {
				Icon: NotInWorkflowIcon,
				stateSpecificClass: classes?.stateNotInWorkflow,
				stateSpecificSx: { color: palette.gray.medium4, ...sxs?.stateNotInWorkflow }
			}
		);
	}, [sxs, classes, item]);
	const { formatMessage } = useIntl();
	return Icon === null ? null : item.systemType === 'folder' ? (
		<Icon
			sx={{
				...sxs?.root,
				...stateSpecificSx
			}}
			aria-label={getItemStateText(item.stateMap, formatMessage, { user: item.lockOwner?.username })}
			aria-hidden={false}
			className={[className, stateSpecificClass].filter(Boolean).join(' ')}
			fontSize={fontSize}
		/>
	) : (
		<Tooltip
			title={
				displayTooltip
					? getItemStateText(item.stateMap, formatMessage, { user: item.lockOwner?.username, draft: item.savedAsDraft })
					: ''
			}
			open={displayTooltip ? void 0 : false}
		>
			<Icon
				sx={{
					...sxs?.root,
					...stateSpecificSx
				}}
				aria-label={getItemStateText(item.stateMap, formatMessage, {
					user: item.lockOwner?.username,
					draft: item.savedAsDraft
				})}
				aria-hidden={false}
				className={[className, stateSpecificClass].filter(Boolean).join(' ')}
				fontSize={fontSize}
			/>
		</Tooltip>
	);
}

export default ItemStateIcon;
