export const styles = {
  base: 'relative inline-flex items-center justify-center rounded-full text-center uppercase transition-all duration-300 hover:scale-105',
  variants: {
    primary: 'bg-secondary text-white hover:bg-secondary/90',
    transparent: 'bg-transparent text-primary hover:bg-primary/10',
  },
  sizes: {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl',
  },
  disabled: 'opacity-50 cursor-not-allowed',
  touchTarget: 'absolute inset-0 z-[-1] hidden sm:block',
};
