export const stylesFromTag = {
//@ts-ignore
control: (prevStyle, { isFocused }) => ({
    ...prevStyle,
    borderColor: isFocused ? 'var(--base-color-dark)' : '#dbdade',
    ':hover': {
      borderColor: 'var(--base-color-dark)',
    },
    fontSize: '12px',
    paddingLeft: '5px',
    borderRadius: '12px',
    color: 'var(--base-color-dark)',
    transition: 'all 0.3s ease-in-out',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
//@ts-ignore
placeholder: (prevStyle) => ({
    ...prevStyle,
    color: 'var(--base-color-dark)',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
//@ts-ignore
multiValue: (prevStyle) => ({
    ...prevStyle,
    backgroundColor: 'white',
    
  }),
  multiValueLabel: () => ({
    backgroundColor: 'var(--primary-color)',
    padding: '5px',
    color: 'white',
    borderRadius: '12px',
    
  }),
  multiValueRemove: () => ({
    backgroundColor: 'white',
    
    
  }),
}
