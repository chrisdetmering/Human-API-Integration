import { Button, Image, Modal } from 'semantic-ui-react'

function ConnectWarningModal({ open, setOpen }) {

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>WARNING</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src='data:image/png;base64,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' wrapped />
                <Modal.Description>
                    <p>
                        You have to connect one Clinical or Wellness resource using Human API before you can query your data in the clinical/wellness/report pages
                    </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>

                <Button
                    content="Will Do!"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default ConnectWarningModal;