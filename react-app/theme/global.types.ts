export type ColorConfig = {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  borderBottomColor?: string;
};

export type ColorScheme = {
  navBar?: ColorConfig;
  body?: ColorConfig;
  bodyTitle?: {color?: string};
  section?: ColorConfig;
  sectionTitle?: {color?: string};
  sectionBody?: ColorConfig;
  sectionBodyTitle?: {color?: string};
  sectionHeader?: ColorConfig;
  sectionHeaderMachal?: ColorConfig;
  sectionHeaderWounded?: ColorConfig;
  buttonApprove?: ColorConfig;
  buttonApproveText?: {color?: string};
  buttonCancel?: ColorConfig;
  buttonCancelText?: {color?: string};
};
