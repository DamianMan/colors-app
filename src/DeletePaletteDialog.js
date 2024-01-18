import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { blue, red } from '@mui/material/colors';




function DeletePaletteDialog(props) {
    const { open, onClose, deletePalette } = props
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle variant='title'>Delete This Palette?</DialogTitle>
            <List sx={{ pt: 0 }} >
                <ListItem>
                    <ListItemButton onClick={deletePalette}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <DoneIcon />

                            </Avatar>

                        </ListItemAvatar>
                        <ListItemText primary='Delete' />

                    </ListItemButton>


                </ListItem>

                <ListItem>
                    <ListItemButton onClick={onClose}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                <CloseIcon />

                            </Avatar>

                        </ListItemAvatar>
                        <ListItemText primary='Cancel' />

                    </ListItemButton>


                </ListItem>
            </List>

        </Dialog >
    );

}

export default DeletePaletteDialog;