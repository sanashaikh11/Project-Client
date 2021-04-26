import React from 'react'
import { RegHeader } from "./RegHeader"
import { RegistrationForm } from "./RegistrationForm"

export const NewHome = () => {
    return (
        <>
          <RegHeader />
          <div className="container d-flex align-items-center flex-column">
             <RegistrationForm />
          </div>
      </>
    )
}

export default NewHome