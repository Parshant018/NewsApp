import React from 'react';
import './signin.css';
import FormFields from '../widgets/Formfields/formfields';
import { firebase } from '../../firebase';
class SignIn extends React.Component{
    state={
        registerError:'',
        loading:false,
        formData:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your Email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
            },
            password:{
            element:'input',
            value:'',
            config:{
                name:'password_input',
                type:'password',
                placeholder:'Enter your password'
            },
            validation:{
                required:true,
                password:true
            },
            valid:false,
            touched:false,
            validationMessage:''
            }
        }
    }
    updateForm = (element) =>{
        const newFormdata={
            ...this.state.formData
        }
        const newElement={
            ...newFormdata[element.id]
        }
        newElement.value= element.event.target.value;
        if(element.blur){
            let validData=this.validate(newElement);
            newElement.valid=validData[0];
            newElement.validationMessage=validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        this.setState({
            formData:newFormdata
        })
    }

    validate = (element)=>{
        let error=[true,''];
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message=`${!valid ? 'Must be  valid email':''}`;
            error=!valid ? [valid,message]:error;
        }
        if(element.validation.password){
            const valid=element.value.length>=5;
            const message=`${!valid ? 'Must be greater than 5':''}`;
            error=!valid ? [valid,message]:error;
        }
        if(element.validation.required){
            const valid=element.value.trim()!=='';
            const message=`${!valid ? 'This Field is required':''}`;
            error=!valid ? [valid,message]:error;
        }
        return error;
    }
    submitForm = (event,Type) =>{
        event.preventDefault();
        if(Type!==null){
            let dataToSubmit={};
            let formIsValid=true;
            for(let key in this.state.formData){
                dataToSubmit[key] = this.state.formData[key].value;
            }
            for(let key in this.state.formData){
                formIsValid = this.state.formData[key].valid  && formIsValid;
            }
            if(formIsValid){
                console.log(dataToSubmit);
                this.setState({
                    loading:true,
                    registerError:''
                })
            }
            if(Type){
                firebase.auth().signInWithEmailAndPassword(dataToSubmit.email,dataToSubmit.password)
                .then(()=>{
                    this.props.history.push('/')
                }).catch(error =>{
                    this.setState({
                        loading:false,
                        registerError:error.message
                    })
                })
            }else{
                firebase.auth()
                .createUserWithEmailAndPassword(dataToSubmit.email,dataToSubmit.password)
                .then(()=>{
                    this.props.history.push('/')
                }).catch(error=>{
                    this.setState({
                        loading:false,
                        registerError:error.message
                    })
                })
            }
        }
    }
    submitButton = () =>(
        this.state.loading ?
        'Loading...':
        <div>
            <button onClick={(event)=>this.submitForm(event,false)}>Register now</button>
            <button onClick={(event)=>this.submitForm(event,true)}>Login</button>
        </div>
    )

    showError = () =>(
        this.state.registerError!=='' ? 
        <div className="errro">{this.state.registerError}</div>
        :''
    )
    render(){
        return(
            <div className="postContainer">
            <h2>Register / Log In</h2>
                <form onSubmit={(event)=>this.submitForm(event,null)}>
                    <FormFields
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormFields
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default SignIn;