import React from 'react';
import FormFields from '../widgets/Formfields/formfields'
import './dashboard.css';
import { Editor } from 'react-draft-wysiwyg';
import { firebaseArticles, firebaseTeams } from '../../firebase';
import Uploader from '../widgets/FileUploader/fileUploader';
import { EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import firebase from '@firebase/app';
class Dashboard extends React.Component{
    state={
        editorState:EditorState.createEmpty(),
        postError:'',
        loading:false,
        formData:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'Enter your Name'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'Enter title'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            },
            image:{
                element:'image',
                value:'',
                valid:true
            },
            team:{
                element:'select',
                value:'',
                config:{
                    name:'teams_input',
                    options:[]
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',  
            }
        }
    }

    componentDidMount(){
        this.loadTeams()
    }
    loadTeams =() =>{
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let team=[];
            snapshot.forEach((childSnapshot)=>{
                team.push({
                    id:childSnapshot.val().teamId,
                    name:childSnapshot.val().city
                })
            })
            const newFormdata = {...this.state.formData};
            const newElement = {...newFormdata['team']};
            newElement.config.options = team;
            newFormdata['team']=newElement;
            this.setState({
                formData:newFormdata
            })
        })
    }
    updateForm = (element,content='') =>{
        const newFormdata={
            ...this.state.formData
        }
        const newElement={
            ...newFormdata[element.id]
        }

        if(content === ''){
        newElement.value= element.event.target.value;
        }else{
            newElement.value= content
        }
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
        if(element.validation.required){
            const valid=element.value.trim()!=='';
            const message=`${!valid ? 'This Field is required':''}`;
            error=!valid ? [valid,message]:error;
        }
        return error;
    }

    submitButton = () =>(
        this.state.loading ?
        'Loading...':
        <div>
            <button type="submit">Add Post</button>
        </div>
    )


    submitForm = (event) =>{
        event.preventDefault();
        let dataToSubmit={};
        let formIsValid=true;
        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
        }
        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid  && formIsValid;
        }
        if(formIsValid){
            this.setState({
                loading:true,
                postError:''
            })
            firebaseArticles.orderByChild("id").limitToLast(1).once("value")
            .then((snapshot)=>{
                let articleId=null;
                snapshot.forEach((childSnapshot)=>{
                    articleId = childSnapshot.val().id
                });
                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = articleId + 1;
                dataToSubmit['team'] = parseInt(dataToSubmit['team'],10);
                firebaseArticles.push(dataToSubmit)
                .then( article =>{
                    this.props.history.push(`/articles/${article.key}`)
                }).catch(e=>{
                    this.setState({
                        postError:e.message
                    })
                })
            })
        }else{
            this.setState({
                postError:'Something Went wrong'
            })
        }
    }
    showError = () =>(
        this.state.postError!=='' ? 
        <div className="error">{this.state.postError}</div>
        :''
    )

    storeFilename = (filename) =>{
        this.updateForm({id:'image'},filename)
    }

    onEditorStateChange = (editorState) =>{
        let contentState=editorState.getCurrentContent();
        let html=stateToHTML(contentState);
        this.updateForm({id:'body'},html)
        this.setState({
            editorState
        })
    }
    render(){
        return(
            <div className="postContainer">
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <Uploader
                        filename={(filename)=>this.storeFilename(filename)}
                    />
                    <FormFields
                    id={'author'}
                    formData={this.state.formData.author}
                    change={(element)=>this.updateForm(element)}/>
                    <FormFields
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(element)=>this.updateForm(element)}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <FormFields
                        id={'team'}
                        formData={this.state.formData.team}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Dashboard;