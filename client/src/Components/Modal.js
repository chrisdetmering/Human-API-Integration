import { Button, Icon, Modal } from 'semantic-ui-react'

const ConnectModal = ({ open, setOpen, summary }) => {

    const isSummary = () => {
        return Object.keys(summary).length > 0
    }

    const displayCurrentConnections = () => {
        if (isSummary()) {
            if (summary.currentConnections.length === 0) {
                return <li>NONE</li>
            } else {
                return summary.currentConnections.map(connection => (
                    <li>{connection.name}</li>
                ))
            }
        }
    }

    const displayRequestedProviders = () => {
        if (isSummary()) {
            if (summary.requestedProviders.length === 0) {
                return <li>NONE</li>
            } else {
                return summary.requestedProviders.map(connection => (
                    <li key={connection.name}>{connection.name}</li>
                ))
            }
        }
    }

    const displaySessionResults = () => {
        if (isSummary()) {
            return (<>
                <h4>Connected Resources</h4>
                {displayConnectedResources()}
                <h4>Disconnected Resources</h4>
                {displayDisconnectedResources()}
            </>)
        }
    }


    const displayConnectedResources = () => {
        if (summary.sessionResults.connectedSources.length === 0) {
            return <li>NONE</li>
        } else {
            return (<>{
                summary.sessionResults.connectedSources.map(connection => (
                    <li key={connection.name}>{connection.name}</li>
                ))
            }</>)
        }
    }

    const displayDisconnectedResources = () => {
        if (summary.sessionResults.disconnectedSources.length === 0) {
            return <li>NONE</li>
        } else {
            return (<>{summary.sessionResults.disconnectedSources.map(connection => (
                <li key={connection.name}>{connection.name}</li>
            ))}</>)
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>Connection Summary</Modal.Header>
            <Modal.Content image scrolling>

                <Modal.Description>
                    <h3>Current Connections</h3>
                    {displayCurrentConnections()}

                    <h3>Requested Providers</h3>
                    {displayRequestedProviders()}

                    <h3>Session Results</h3>
                    {displaySessionResults()}

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConnectModal;