import { Fragment } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Autocomplete, {
  createFilterOptions,
  AutocompleteProps
} from '@mui/material/Autocomplete'
import Loader from '~/components/loader/Loader'

export interface OptionType {
  value: string
  title: string
}

interface AppAutoCompleteProps
  extends Omit<
    AutocompleteProps<OptionType, false, false, false>,
    'renderInput' | 'options'
  > {
  options: OptionType[]
  label?: string
  loading?: boolean
  hideClearIcon?: boolean
  textFieldProps?: TextFieldProps
}

const defaultFilterOptions = createFilterOptions<OptionType>({
  matchFrom: 'start'
})

const AppAutoComplete = ({
  options,
  label,
  filterOptions = defaultFilterOptions,
  ListboxProps = { style: { maxHeight: 150 } },
  hideClearIcon = false,
  textFieldProps = {},
  loading = false,
  ...props
}: AppAutoCompleteProps) => {
  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
            endAdornment: (
              <Fragment>
                {loading && <Loader size={20} sx={{ color: 'primary.600' }} />}
                {!hideClearIcon && params.InputProps.endAdornment}
              </Fragment>
            )
          }}
          label={label}
        />
      )}
    />
  )
}

export default AppAutoComplete
