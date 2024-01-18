import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useRef, useEffect, useState } from 'react';
import Picker from "emoji-picker-react";



const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: '#ffff',
    border: '1px solid #000',
    boxShadow: 3,
    p: 4,
    borderRadius: '5px'
};

function ModalForm(props) {
    const Ref = useRef('form');
    const [chosenEmoji, setChosenEmoji] = useState({ isSaveClicked: false });
    const onEmojiClick = (event) => {

        handleModalSubmit(event.emoji)
        setChosenEmoji(st => ({ ...st, isSaveClicked: false }))

    };
    const { palettes, openModal, setModal, setColor, handleCloseModal, handleModalSubmit, newPaletteName, handleChangeForm } = props;

    const handleSubmit = () => {
        setChosenEmoji(st => ({ ...st, isSaveClicked: true }))


    }

    const handleCLoseEmojiModal = () => {
        setModal(false)
        setColor(st => ({ ...st, newPaletteName: '' }))
        setChosenEmoji(st => ({ ...st, isSaveClicked: false }))
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isUniquePaletteName', (value) => {
            let name = palettes.find(col => col.id === value.replace(/ /g, '-').toLocaleLowerCase())
            if (name !== undefined) {
                return false
            }
            return true
        });
    })
    return (
        <div>

            {chosenEmoji.isSaveClicked ?
                <Modal
                    open={openModal}
                    onClose={handleCLoseEmojiModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" textAlign={'center'}>
                            Choose A Palette Emoji
                        </Typography>
                        <Picker onEmojiClick={onEmojiClick} />
                    </Box></Modal>
                :

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Choose A Palette Name
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please enter a name for your new beautiful palette. It needs to be unique!
                        </Typography>
                        <ValidatorForm
                            ref={Ref}
                            onSubmit={handleSubmit}

                        >
                            <TextValidator
                                label='Palette Name'
                                fullWidth
                                sx={{ marginTop: '20px', marginBottom: '40px' }}
                                variant='filled'
                                name='newPaletteName'
                                validators={['required', 'isUniquePaletteName']}
                                errorMessages={['This field is required!', 'Palette Name already exist!']}
                                value={newPaletteName}
                                onChange={handleChangeForm}
                            />
                            <div className='d-flex justify-content-end'>
                                <Button className='m-1' variant='contained' color='secondary' onClick={handleCloseModal}>Back</Button>

                                <Button className='m-1' variant='contained' type='submit' color='primary'>Save</Button>

                            </div>

                        </ValidatorForm>


                    </Box>

                </Modal>}


        </div>



    );

}

export default ModalForm;