import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

export default function ConfirmationEmail() {
    return (
        <>
            <Header content='Hi Andrew' />
            <p>To complete email verification, please press the button below.</p>
            <Button content='Verify your Email' as={Link}  />
        </>
    )
}
