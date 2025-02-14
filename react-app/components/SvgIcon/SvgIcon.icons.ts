import BodyParts from '../../assets/icons/bodyParts.svg';
import Check from '../../assets/icons/Check.svg';
import Complete from '../../assets/icons/complete.svg';
import Corpse from '../../assets/icons/corpse.svg';
import Finger from '../../assets/icons/finger.svg';
import FingerPart from '../../assets/icons/fingerPart.svg';
import NotFullCorpse from '../../assets/icons/notFullCorpse.svg';
import Other from '../../assets/icons/other.svg';
import Palm from '../../assets/icons/palm.svg';
import Unknown from '../../assets/icons/unknown.svg';
import Wounded from '../../assets/icons/wounded.svg';

import Left1Done from '../../assets/icons/fingers/left_1_done.svg';
import Left1Error from '../../assets/icons/fingers/left_1_error.svg';
import Left1Select from '../../assets/icons/fingers/left_1_select.svg';
import Left2Done from '../../assets/icons/fingers/left_2_done.svg';
import Left2Error from '../../assets/icons/fingers/left_2_error.svg';
import Left2Select from '../../assets/icons/fingers/left_2_select.svg';
import Left3Done from '../../assets/icons/fingers/left_3_done.svg';
import Left3Error from '../../assets/icons/fingers/left_3_error.svg';
import Left3Select from '../../assets/icons/fingers/left_3_select.svg';
import Left4Done from '../../assets/icons/fingers/left_4_done.svg';
import Left4Error from '../../assets/icons/fingers/left_4_error.svg';
import Left4Select from '../../assets/icons/fingers/left_4_select.svg';
import Left5Done from '../../assets/icons/fingers/left_5_done.svg';
import Left5Error from '../../assets/icons/fingers/left_5_error.svg';
import Left5Select from '../../assets/icons/fingers/left_5_select.svg';

import Right1Done from '../../assets/icons/fingers/right_1_done.svg';
import Right1Error from '../../assets/icons/fingers/right_1_error.svg';
import Right1Select from '../../assets/icons/fingers/right_1_select.svg';
import Right2Done from '../../assets/icons/fingers/right_2_done.svg';
import Right2Error from '../../assets/icons/fingers/right_2_error.svg';
import Right2Select from '../../assets/icons/fingers/right_2_select.svg';
import Right3Done from '../../assets/icons/fingers/right_3_done.svg';
import Right3Error from '../../assets/icons/fingers/right_3_error.svg';
import Right3Select from '../../assets/icons/fingers/right_3_select.svg';
import Right4Done from '../../assets/icons/fingers/right_4_done.svg';
import Right4Error from '../../assets/icons/fingers/right_4_error.svg';
import Right4Select from '../../assets/icons/fingers/right_4_select.svg';
import Right5Done from '../../assets/icons/fingers/right_5_done.svg';
import Right5Error from '../../assets/icons/fingers/right_5_error.svg';
import Right5Select from '../../assets/icons/fingers/right_5_select.svg';

export const iconMap: Record<string, React.FC<any>> = {
  bodyParts: BodyParts,
  Check: Check,
  complete: Complete,
  corpse: Corpse,
  finger: Finger,
  fingerPart: FingerPart,
  notFullCorpse: NotFullCorpse,
  other: Other,
  palm: Palm,
  unknown: Unknown,
  wounded: Wounded,

  left_1_done: Left1Done,
  left_1_error: Left1Error,
  left_1_select: Left1Select,
  left_2_done: Left2Done,
  left_2_error: Left2Error,
  left_2_select: Left2Select,
  left_3_done: Left3Done,
  left_3_error: Left3Error,
  left_3_select: Left3Select,
  left_4_done: Left4Done,
  left_4_error: Left4Error,
  left_4_select: Left4Select,
  left_5_done: Left5Done,
  left_5_error: Left5Error,
  left_5_select: Left5Select,

  right_1_done: Right1Done,
  right_1_error: Right1Error,
  right_1_select: Right1Select,
  right_2_done: Right2Done,
  right_2_error: Right2Error,
  right_2_select: Right2Select,
  right_3_done: Right3Done,
  right_3_error: Right3Error,
  right_3_select: Right3Select,
  right_4_done: Right4Done,
  right_4_error: Right4Error,
  right_4_select: Right4Select,
  right_5_done: Right5Done,
  right_5_error: Right5Error,
  right_5_select: Right5Select,
} as const;
