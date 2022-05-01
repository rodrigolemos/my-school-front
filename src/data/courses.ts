import { IconType } from 'react-icons';
import {
  BiCameraMovie,
  BiCookie,
  BiMovie,
  BiHomeSmile,
  BiMusic,
  BiCool,
  BiGame,
  BiSmile,
  BiBasketball,
  BiFemale,
  BiCodeAlt
} from 'react-icons/bi';

export const defaultCategories = [
  { value: 'technology', label: 'Tecnologia', icon: BiCodeAlt },
  { value: 'music', label: 'Música', icon: BiMusic },
  { value: 'series', label: 'Série', icon: BiMovie },
  { value: 'movie', label: 'Filme', icon: BiCameraMovie },
  { value: 'game', label: 'Game', icon: BiGame },
  { value: 'life', label: 'Vida', icon: BiSmile },
  { value: 'moda', label: 'Moda', icon: BiCool },
  { value: 'cook', label: 'Cozinha', icon: BiCookie },
  { value: 'hobby', label: 'Hobby', icon: BiCool },
  { value: 'house', label: 'Casa', icon: BiHomeSmile },
  { value: 'sport', label: 'Esporte', icon: BiBasketball },
  { value: 'family', label: 'Família', icon: BiFemale }
];

export const getIcon = (category: string): IconType =>
  defaultCategories.find((pcategory) => pcategory.value === category)['icon'];

export const defaultResources = [
  { value: 'history', label: 'História' },
  { value: 'math', label: 'Matemática' },
  { value: 'geography', label: 'Geografia' },
  { value: 'arts', label: 'Arte' },
  { value: 'language', label: 'Idioma' }
];
