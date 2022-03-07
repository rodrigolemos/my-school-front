import { ReactElement, RefObject } from 'react';

export interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export type AppIntroductionProps = {
  linkRef: RefObject<HTMLDivElement>;
};
