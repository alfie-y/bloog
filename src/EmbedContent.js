import React from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput } from '@sanity/ui'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id'

const EmbedContent = React.forwardRef((props, ref) => {
    const { 
        type,         // Schema information
        value,        // Current field value
        readOnly,     // Boolean if field is not editable
        placeholder,  // Placeholder text from the schema
        markers,      // Markers including validation rules
        presence,     // Presence information for collaborative avatars
        onFocus,      // Method to handle focus state
        onBlur,       // Method to handle blur state  
        onChange
    } = props

    const inputId = useId();

    const handleChange = React.useCallback(
        (event) => {
            const inputValue = event.currentTarget.value;
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange]
    );

    return (
        <FormField
            description={type.description}  // Creates description from schema
            title={type.title}              // Creates label from schema title
            markers={markers}               // Handles all markers including validation
            presence={presence}             // Handles presence avatars
            inputId={inputId}
       >
            <TextInput
                id={inputId}
                value={value || ''}                 // Current field value
                readOnly={readOnly}           // If "readOnly" is defined make this field read only
                placeholder={placeholder}     // If placeholder is defined, display placeholder text
                onFocus={onFocus}             // Handles focus events
                onBlur={onBlur} 
                onChange={handleChange}              // Handles blur events
                ref={ref}
            />
        </FormField>
    )
  }
)

// Create the default export to import into our schema
export default EmbedContent