
import React, { useState } from 'react'
import { Card, Form, FormGroup,Button, Alert } from 'react-bootstrap'
import { useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { checkEmployeeExist, registerEmployee } from '../Firestore'
import { AuthErrorCodes } from 'firebase/auth'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const emplNum = useRef('');
    const {signUp , currentUser} = useAuth();
    const [error , setError] = useState('');
    const [loading,setLoading] = useState(false);

    
    async function handleSubmit(e){
        e.preventDefault()
        
        const result = await checkEmployeeExist(emplNum.current.value)

        
        if(!result){
            setLoading(false)
            return setError('there is no employee with that number')   
        }
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            setLoading(false)
            return setError("passwords dose not match")
        }
        
        try{

            setError('')
            setLoading(true)
            await signUp(emailRef.current.value,passwordRef.current.value)
            await registerEmployee(emplNum.current.value,"name","1999")
            
        }  catch(err){
            if(err.code === AuthErrorCodes.EMAIL_EXISTS){
                setError('Email already exists')
            }else if(err.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER){
                setError('to many attempts try again later')
            }else if(err.code === AuthErrorCodes.TIMEOUT){
                setError('sorry timeout try again later')
            }else{
                setError('failed to create account ' + err.code)
            }
            
        }

        

        

        setLoading(false)
        
    }

    

  return (
    <>
      <Card>
        <Card.Body>
            <img alt='logo' className='w-100'  src='https://le-de.cdn-website.com/082a2250cc0a4845895e341426006047/dms3rep/multi/opt/logo-next-too-13-1920w.png'/>
            <h2 className='text-center mb-4'>Sign Up</h2>
            
            {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <FormGroup id='emplNum'>
                <Form.Label>Employee Number</Form.Label>
                <Form.Control type='text' ref={emplNum} required />

            </FormGroup>

            <FormGroup id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />

            </FormGroup>

            <FormGroup id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />

            </FormGroup>

            <FormGroup id='password-confirm'>
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} required />

            </FormGroup>
            <Button disabled={loading} className="w-100 mt-3"  type="submit"> Sign Up</Button>
        </Form> 
        </Card.Body>
      </Card>
       <div className='w-100 text-center mt-2'>
        Already have an account? Log In 
      </div>
    </>
  )
}

export default SignUp
