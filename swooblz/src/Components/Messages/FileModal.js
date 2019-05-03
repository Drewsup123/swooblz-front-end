import React from 'react';
import mime from 'mime-types'
import {Modal, Input, Button, Icon} from 'semantic-ui-react';

export default function FileModal(props){
    const [file, setFile] = React.useState('');
    const supportedTypes = ['image/jpeg', 'image/png']

    const addFile = e => {
        const file = e.target.files[0];
        setFile(file)
    }

    const sendFile = e => {
        if(file !== null){
            if(checkFileType(file.name)){
                // send
                const metadata = {contentType: mime.lookup(file.name)};
                props.uploadFile(file, metadata);
                props.onClose();
                setFile('');
            }
        }
    }

    const checkFileType = fileName => {
        if(supportedTypes.includes(mime.lookup(fileName))){
            return true;
        }else{return false}
    }

    return(
        <Modal basic open={props.open} onClose={props.onClose}>

            <Modal.Header>Select an Image File</Modal.Header>

            <Modal.Content>
                <Input onChange={addFile} fluid label="File Types: JPEG, GIF, PNG" name="file" type="file"/>
                <Modal.Header>Currently Not Working</Modal.Header>
            </Modal.Content>

            <Modal.Actions>
                <Button onClick={sendFile} color="green" inverted><Icon name="checkmark"/>Send</Button>
                <Button onClick={props.onClose} color="red" inverted><Icon name="remove"/>Cancel</Button>
            </Modal.Actions>

        </Modal>
    );
}