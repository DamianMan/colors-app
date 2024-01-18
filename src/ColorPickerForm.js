import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { Button } from '@mui/material';
import { useRef, useEffect } from 'react';
import './ColorPickerForm.css'



function ColorPickerForm(props) {
    const Ref = useRef('form');

    const { colors, onChangeComplete, handleSubmit, value, handleChange, currentColor, isFull } = props;

    useEffect(() => {
        ValidatorForm.addValidationRule('isUniqueName', (value) => {
            let val = ''
            if (value !== undefined) {
                val = value.toLowerCase()

            }
            let name = colors.find(color => color.name === val)
            if (name !== undefined) {
                return false
            }
            return true
        });
        ValidatorForm.addValidationRule('isUniqueColor', () => {
            let colorCheck = colors.find(col => col.color === currentColor)
            if (colorCheck !== undefined) {
                return false
            }
            return true
        });


    })
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '80%' }}>
            <ChromePicker
                className='chromePicker'
                color={currentColor}
                onChangeComplete={onChangeComplete}
            />

            <ValidatorForm
                ref={Ref}
                onSubmit={handleSubmit}
                instantValidate={false}

            >

                <TextValidator
                    label='Color Name'
                    variant='filled'
                    style={{ width: '100%', marginRight: '100px', marginTop: '10px' }}
                    name='colorToAdd'
                    validators={['required', 'isUniqueName', 'isUniqueColor']}
                    errorMessages={['This field is required!', 'Name already exist!', 'Color already exist!']}
                    value={value}
                    onChange={handleChange}
                />
                <Button
                    variant='contained'
                    type='submit'
                    style={{
                        backgroundColor: `${isFull ? '#797878' : `${currentColor}`}`,
                        width: '100%',
                        marginTop: '20px',
                        padding: '10px',
                        fontSize: '1.5em'
                    }} disabled={isFull}>{isFull ? 'Palette Full' : 'Add Color'}</Button>



            </ValidatorForm>
        </div>
    );

}

export default ColorPickerForm;